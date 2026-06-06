import { mkdir, readFile, writeFile } from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ApplyPayload = {
  full_name?: string;
  email?: string;
  phone?: string;
  residence?: string;
  role?: string;
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
  subject: string;
  message: string;
  has_a_car: boolean;
  cv_attachment_name?: string;
  cv_attachment_type?: string;
  cv_attachment_base64?: string;
};

const roleToAppliedJob: Record<string, string> = {
  "Full Time Medical Representative": "full",
  "Part Time Medical Representative": "part",
  "District Manager": "dm",
  "National Sales Manager": "nsm",
  "Product Manager": "pm",
  "Associate Product Manager": "apm",
  "Business Unit Manager": "bum",
  Accountant: "accountant",
  "HR Specialist": "hr",
  IT: "it",
  "HR Manager": "hrm",
  "Sales Representative": "sr",
  "Supply Chain Specialist": "sc",
  "Supply Chain Manager": "scm",
  "Office Administrator": "oa",
  "Franchise Manager": "fm",
  "Regulatory Affairs Specialist": "ra",
  "Regulatory Affairs Manager": "ram",
  "Office Boy": "ob",
  Other: "other",
};

const storagePath = join(process.cwd(), ".data", "apply-submissions.json");

function getTodayInCairo() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Cairo",
  }).format(new Date());
}

function env(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

function recruitmentUrl() {
  return env(
    "RECRUITMENT_SERVICE_URL",
    "https://willimed.wm360.info/jsonrpc",
  ).replace(/\/$/, "");
}

function recruitmentDb() {
  return env("RECRUITMENT_DB", "");
}

function recruitmentUser() {
  return env("RECRUITMENT_USER", "");
}

function recruitmentPassword() {
  return env("RECRUITMENT_PASSWORD", "");
}

function backendUrl() {
  return env("RECRUITMENT_BACKEND_URL", "https://demo.wm360.info").replace(
    /\/$/,
    "",
  );
}

async function saveLocally(payload: NormalizedApplyPayload) {
  await mkdir(join(process.cwd(), ".data"), { recursive: true });

  let existing: Array<
    NormalizedApplyPayload & { id: number; createdAt: string }
  > = [];

  try {
    const raw = await readFile(storagePath, "utf8");
    existing = JSON.parse(raw) as Array<
      NormalizedApplyPayload & { id: number; createdAt: string }
    >;
  } catch {
    existing = [];
  }

  const record = {
    id: existing.length + 1,
    createdAt: new Date().toISOString(),
    ...payload,
  };

  await writeFile(
    storagePath,
    JSON.stringify([...existing, record], null, 2),
    "utf8",
  );
  return record;
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
    subject: String(payload.subject ?? "").trim(),
    message: String(payload.message ?? "").trim(),
    has_a_car: Boolean(payload.has_a_car),
    cv_attachment_name: cvAttachmentName || undefined,
    cv_attachment_type: cvAttachmentType || undefined,
    cv_attachment_base64: cvAttachmentBase64 || undefined,
  };
}

function buildRpcPayload(service: string, method: string, args: unknown[]) {
  return JSON.stringify({
    jsonrpc: "2.0",
    method: "call",
    params: {
      service,
      method,
      args,
    },
  });
}

async function remoteJsonRpc(url: string, body: string) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
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

  return { ok: response.ok, status: response.status, data };
}

async function authenticate() {
  const body = buildRpcPayload("common", "authenticate", [
    recruitmentDb(),
    recruitmentUser(),
    recruitmentPassword(),
    {},
  ]);
  return remoteJsonRpc(recruitmentUrl(), body);
}

async function createApplicant(values: Record<string, unknown>) {
  const body = buildRpcPayload("object", "execute_kw", [
    recruitmentDb(),
    values.uid,
    recruitmentPassword(),
    "recruitment",
    "create",
    [values.data],
  ]);
  return remoteJsonRpc(recruitmentUrl(), body);
}

async function forwardToBackend(payload: NormalizedApplyPayload) {
  const response = await fetch(`${backendUrl()}/api/apply/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
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

  return { ok: response.ok, status: response.status, data };
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

  if (!recruitmentDb() || !recruitmentUser() || !recruitmentPassword()) {
    const backendResponse = await forwardToBackend(normalizedPayload);
    return NextResponse.json(backendResponse.data, {
      status: backendResponse.status,
    });
  }

  const authResponse = await authenticate();
  if (
    !authResponse.ok ||
    authResponse.data.error ||
    authResponse.data.result == null
  ) {
    return NextResponse.json(
      {
        error: "Recruitment authentication failed.",
        detail: authResponse.data,
      },
      { status: 502 },
    );
  }

  const uid = authResponse.data.result;
  const appliedJob = roleToAppliedJob[normalizedPayload.role] ?? "other";
  const applicantData: Record<string, unknown> = {
    name: normalizedPayload.full_name,
    stage_id: 1,
    email: normalizedPayload.email,
    date: getTodayInCairo(),
    cover_message: normalizedPayload.message,
    applied_jobs: appliedJob,
    source: "wb",
    has_a_car: normalizedPayload.has_a_car,
    residence: normalizedPayload.residence,
  };

  if (normalizedPayload.phone) {
    applicantData.phone_no = normalizedPayload.phone;
  }

  if (normalizedPayload.cv_attachment_base64) {
    applicantData.cv_attachment = normalizedPayload.cv_attachment_base64;
  }

  const createResponse = await createApplicant({ uid, data: applicantData });
  if (!createResponse.ok || createResponse.data.error) {
    return NextResponse.json(
      { error: "Recruitment create failed.", detail: createResponse.data },
      { status: 502 },
    );
  }

  await saveLocally(normalizedPayload);

  return NextResponse.json(
    {
      message: "Application submitted successfully.",
      result: createResponse.data.result,
    },
    { status: 201 },
  );
}
