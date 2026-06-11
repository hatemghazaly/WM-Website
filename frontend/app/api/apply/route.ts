import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import {
  getRoleCodeMap,
  normalizeCareersConfig,
} from "@/lib/careers-data";

export const runtime = "nodejs";

const applyDebugLogPath = path.join(
  process.cwd(),
  ".data",
  "apply-debug-log.json",
);

type ApplyPayload = {
  full_name?: string;
  email?: string;
  phone?: string;
  residence?: string;
  role?: string;
  applied_job?: string;
  subject?: string;
  message?: string;
  has_a_car?: boolean;
  cv_attachment_name?: string;
  cv_attachment_type?: string;
  cv_attachment_base64?: string;
};

type NormalizedApplyPayload = {
  full_name: string;
  email: string;
  phone: string;
  residence: string;
  role: string;
  applied_job?: string;
  applied_jobs?: string;
  subject: string;
  message: string;
  has_a_car: boolean;
  cv_attachment_name?: string;
  cv_attachment_type?: string;
  cv_attachment_base64?: string;
};

type CareersResolveResult = {
  appliedJob?: string;
  configLoaded: boolean;
  matchedRoleCode?: string;
  roleCodes: Record<string, string>;
  error?: string;
};

type ForwardResult = {
  ok: boolean;
  status: number;
  data: Record<string, unknown>;
  targetBaseUrl: string;
  forwardedPayload: Record<string, unknown>;
  transport: "odoo-jsonrpc" | "demo-backend";
  fallback?: ForwardResult;
};

function env(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

function backendUrl() {
  return env("RECRUITMENT_BACKEND_URL", "https://demo.wm360.info").replace(
    /\/$/,
    "",
  );
}

function recruitmentJsonRpcUrl() {
  const baseUrl = env("RECRUITMENT_SERVICE_URL", "").replace(/\/$/, "");
  if (!baseUrl) {
    return "";
  }

  return baseUrl.endsWith("/jsonrpc") ? baseUrl : `${baseUrl}/jsonrpc`;
}

function recruitmentCredentials() {
  return {
    url: recruitmentJsonRpcUrl(),
    db: env("RECRUITMENT_DB", ""),
    user: env("RECRUITMENT_USER", ""),
    password: env("RECRUITMENT_PASSWORD", ""),
  };
}

function directRecruitmentConfigured() {
  const credentials = recruitmentCredentials();
  return Boolean(
    credentials.url &&
      credentials.db &&
      credentials.user &&
      credentials.password,
  );
}

function sameOriginUrl(request: Request, pathname: string) {
  return new URL(pathname, request.url);
}

function todayInCairo() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "Africa/Cairo",
    year: "numeric",
  }).formatToParts(new Date());
  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value ?? "";

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

function normalizePayload(payload: ApplyPayload): NormalizedApplyPayload {
  const cvAttachmentName = String(payload.cv_attachment_name ?? "").trim();
  const cvAttachmentType = String(payload.cv_attachment_type ?? "").trim();
  const cvAttachmentBase64 = String(payload.cv_attachment_base64 ?? "").trim();

  return {
    full_name: String(payload.full_name ?? "").trim(),
    email: String(payload.email ?? "").trim(),
    phone: String(payload.phone ?? "").trim(),
    residence: String(payload.residence ?? "").trim(),
    role: String(payload.role ?? "").trim(),
    applied_job: String(payload.applied_job ?? "").trim() || undefined,
    subject: String(payload.subject ?? "").trim(),
    message: String(payload.message ?? "").trim(),
    has_a_car: Boolean(payload.has_a_car),
    cv_attachment_name: cvAttachmentName || undefined,
    cv_attachment_type: cvAttachmentType || undefined,
    cv_attachment_base64: cvAttachmentBase64 || undefined,
  };
}

async function resolveAppliedJobFromAvailableRoles(
  request: Request,
  payload: NormalizedApplyPayload,
): Promise<CareersResolveResult> {
  try {
    const response = await fetch(sameOriginUrl(request, "/api/admin/careers"), {
      cache: "no-store",
    });
    if (!response.ok) {
      return {
        appliedJob: payload.applied_job,
        configLoaded: false,
        roleCodes: {},
        error: `Careers config returned ${response.status}.`,
      };
    }

    const config = normalizeCareersConfig(await response.json());
    const roleCodeMap = getRoleCodeMap(config);
    const configCode = roleCodeMap[payload.role] ?? "";

    return {
      appliedJob: configCode || payload.applied_job,
      configLoaded: true,
      matchedRoleCode: configCode || undefined,
      roleCodes: roleCodeMap,
    };
  } catch (error) {
    return {
      appliedJob: payload.applied_job,
      configLoaded: false,
      roleCodes: {},
      error:
        error instanceof Error
          ? error.message
          : "Unable to load careers config.",
    };
  }
}

async function forwardToBackend(
  payload: NormalizedApplyPayload,
): Promise<ForwardResult> {
  const targetBaseUrl = backendUrl();
  const backendPayload = {
    ...payload,
    // Some deployed backend versions use the Odoo field name directly.
    applied_jobs: payload.applied_job,
  };
  const response = await fetch(`${targetBaseUrl}/api/apply/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(backendPayload),
  });

  const text = await response.text();
  let data: Record<string, unknown> = {};

  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      data = { message: text };
    }
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    targetBaseUrl,
    forwardedPayload: backendPayload,
    transport: "demo-backend",
  } satisfies ForwardResult;
}

async function jsonRpc(
  url: string,
  service: string,
  method: string,
  args: unknown[],
  kwargs?: Record<string, unknown>,
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: {
        service,
        method,
        args,
        ...(kwargs ? { kwargs } : {}),
      },
    }),
  });

  const text = await response.text();
  let data: Record<string, unknown> = {};

  if (text) {
    try {
      data = JSON.parse(text) as Record<string, unknown>;
    } catch {
      data = { message: text };
    }
  }

  return {
    ok: response.ok && !data.error,
    status: response.status,
    data,
  };
}

async function forwardDirectlyToRecruitment(
  payload: NormalizedApplyPayload,
): Promise<ForwardResult> {
  const credentials = recruitmentCredentials();
  const applicantValues: Record<string, unknown> = {
    name: payload.full_name,
    stage_id: 1,
    email: payload.email,
    phone_no: payload.phone,
    date: todayInCairo(),
    cover_message: payload.message,
    source: "wb",
    applied_jobs: payload.applied_job,
  };

  if (payload.has_a_car !== undefined) {
    applicantValues.has_a_car = payload.has_a_car;
  }
  if (payload.residence) {
    applicantValues.residence = payload.residence;
  }
  if (payload.cv_attachment_base64) {
    applicantValues.cv_attachment = payload.cv_attachment_base64;
  }

  const authResponse = await jsonRpc(
    credentials.url,
    "common",
    "authenticate",
    [credentials.db, credentials.user, credentials.password, {}],
  );
  const uid = authResponse.data.result;
  if (!authResponse.ok || uid === null || uid === undefined || uid === false) {
    return {
      ok: false,
      status: 502,
      data: {
        error: "Recruitment authentication failed.",
        recruitment_response: authResponse.data,
      },
      targetBaseUrl: credentials.url,
      forwardedPayload: applicantValues,
      transport: "odoo-jsonrpc",
    };
  }

  const createResponse = await jsonRpc(
    credentials.url,
    "object",
    "execute_kw",
    [
      credentials.db,
      uid,
      credentials.password,
      "recruitment",
      "create",
      [applicantValues],
    ],
  );

  return {
    ok: createResponse.ok,
    status: createResponse.ok ? 201 : 502,
    data: createResponse.ok
      ? {
          id: createResponse.data.result,
          email_sent: false,
          recruitment_sent: true,
          applied_job: payload.applied_job,
          recruitment_applied_job: payload.applied_job,
          message: "Your application was received successfully.",
          recruitment_response: createResponse.data,
        }
      : {
          error: "Recruitment forwarding failed.",
          recruitment_sent: false,
          recruitment_response: createResponse.data,
        },
    targetBaseUrl: credentials.url,
    forwardedPayload: applicantValues,
    transport: "odoo-jsonrpc",
  };
}

async function forwardApplication(
  payload: NormalizedApplyPayload,
): Promise<ForwardResult> {
  if (!directRecruitmentConfigured()) {
    return forwardToBackend(payload);
  }

  const directResponse = await forwardDirectlyToRecruitment(payload);
  if (directResponse.ok) {
    return directResponse;
  }

  return directResponse;
}

function redactCvPayload(payload: Record<string, unknown>) {
  const cvAttachmentBase64 = payload.cv_attachment_base64;

  return {
    ...payload,
    cv_attachment_base64:
      typeof cvAttachmentBase64 === "string"
        ? `[base64 omitted: ${cvAttachmentBase64.length} chars]`
        : undefined,
  };
}

async function readDebugLog() {
  try {
    const fileContents = await readFile(applyDebugLogPath, "utf8");
    const parsed = JSON.parse(fileContents);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeDebugEntry(entry: Record<string, unknown>) {
  const currentLog = await readDebugLog();
  await mkdir(path.dirname(applyDebugLogPath), { recursive: true });
  await writeFile(
    applyDebugLogPath,
    `${JSON.stringify([entry, ...currentLog].slice(0, 100), null, 2)}\n`,
    "utf8",
  );
}

export async function POST(request: Request) {
  let payload: ApplyPayload;

  try {
    payload = (await request.json()) as ApplyPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const normalizedPayload = normalizePayload(payload);
  const normalizedAppliedJobBeforeResolve = normalizedPayload.applied_job ?? "";
  const missingFields = [
    "full_name",
    "email",
    "residence",
    "role",
    "subject",
    "message",
  ].filter(
    (field) => !normalizedPayload[field as keyof NormalizedApplyPayload],
  );

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields.", missing_fields: missingFields },
      { status: 400 },
    );
  }

  const careersResolve = await resolveAppliedJobFromAvailableRoles(
    request,
    normalizedPayload,
  );
  normalizedPayload.applied_job = careersResolve.appliedJob;

  if (!normalizedPayload.applied_job) {
    return NextResponse.json(
      {
        error: "Missing applied job code.",
        missing_fields: ["applied_job"],
      },
      { status: 400 },
    );
  }

  const backendResponse = await forwardApplication(normalizedPayload);
  let debugLogSaved = false;

  try {
    await writeDebugEntry({
      timestamp: new Date().toISOString(),
      role: normalizedPayload.role,
      incoming_applied_job: String(payload.applied_job ?? ""),
      normalized_applied_job_before_resolve: normalizedAppliedJobBeforeResolve,
      resolved_applied_job: normalizedPayload.applied_job,
      careers_config_loaded: careersResolve.configLoaded,
      careers_config_error: careersResolve.error,
      matched_available_role_code: careersResolve.matchedRoleCode ?? "",
      available_role_codes: careersResolve.roleCodes,
      forwarded_payload: redactCvPayload(backendResponse.forwardedPayload),
      recruitment_backend_url: backendResponse.targetBaseUrl,
      recruitment_transport: backendResponse.transport,
      backend_status: backendResponse.status,
      backend_response: backendResponse.data,
      fallback_response: backendResponse.fallback,
    });
    debugLogSaved = true;
  } catch {
    debugLogSaved = false;
  }

  return NextResponse.json(
    {
      ...backendResponse.data,
      submitted_role: normalizedPayload.role,
      submitted_applied_job: normalizedPayload.applied_job,
      apply_debug_log_saved: debugLogSaved,
    },
    {
      status: backendResponse.status,
    },
  );
}
