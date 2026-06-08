import { NextResponse } from "next/server";

import {
  getCareersAdminCookieName,
  getCareersAdminPassword,
  getCareersAdminToken,
  isValidCareersAdminPassword,
} from "@/lib/careers-admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const password = String(
    typeof payload === "object" && payload && "password" in payload
      ? (payload as { password?: unknown }).password ?? ""
      : "",
  ).trim();

  if (!getCareersAdminPassword()) {
    return NextResponse.json(
      { error: "CAREERS_ADMIN_PASSWORD is not configured." },
      { status: 500 },
    );
  }

  if (!isValidCareersAdminPassword(password)) {
    return NextResponse.json(
      { error: "Invalid admin password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(
    getCareersAdminCookieName(),
    await getCareersAdminToken(password),
    authCookieOptions(),
  );

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true }, { status: 200 });
  response.cookies.set(getCareersAdminCookieName(), "", {
    ...authCookieOptions(),
    maxAge: 0,
  });
  return response;
}
