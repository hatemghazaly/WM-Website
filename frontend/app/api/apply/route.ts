import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  subject: string;
  message: string;
  has_a_car: boolean;
  cv_attachment_name?: string;
  cv_attachment_type?: string;
  cv_attachment_base64?: string;
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

  if (!normalizedPayload.applied_job) {
    return NextResponse.json(
      {
        error: "Missing applied job code.",
        missing_fields: ["applied_job"],
      },
      { status: 400 },
    );
  }

  const backendResponse = await forwardToBackend(normalizedPayload);
  return NextResponse.json({
    ...backendResponse.data,
    submitted_role: normalizedPayload.role,
    submitted_applied_job: normalizedPayload.applied_job,
  }, {
    status: backendResponse.status,
  });
}
