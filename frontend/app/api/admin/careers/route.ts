import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import {
  EMPTY_CAREERS_CONFIG,
  cloneCareersConfig,
  normalizeCareersConfig,
  type CareersConfig,
} from "@/lib/careers-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const configPath = path.join(process.cwd(), "data", "careers-config.json");

function env(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

function backendUrl() {
  return (
    process.env.CAREERS_BACKEND_URL ??
    process.env.RECRUITMENT_BACKEND_URL ??
    "https://demo.wm360.info"
  ).replace(/\/$/, "");
}

function backendCareersUrl() {
  try {
    return new URL("/api/admin/careers", backendUrl()).toString();
  } catch {
    return "";
  }
}

async function readLocalConfig(): Promise<CareersConfig> {
  try {
    const fileContents = await readFile(configPath, "utf8");
    return normalizeCareersConfig(JSON.parse(fileContents));
  } catch {
    return cloneCareersConfig(EMPTY_CAREERS_CONFIG);
  }
}

async function writeLocalConfig(config: CareersConfig) {
  await mkdir(path.dirname(configPath), { recursive: true });
  await writeFile(
    configPath,
    `${JSON.stringify(cloneCareersConfig(config), null, 2)}\n`,
    "utf8",
  );
}

async function fetchBackendConfig(method: "GET" | "POST", body?: string) {
  const url = backendCareersUrl();
  if (!url) {
    return {
      ok: false,
      status: 500,
      data: {
        error:
          "CAREERS_BACKEND_URL must be a full URL, for example https://demo.wm360.info.",
      },
    };
  }

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });

    const raw = await response.text();
    let data: unknown = {};

    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {
        data = { message: raw };
      }
    }

    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    return {
      ok: false,
      status: 503,
      data: {
        error:
          error instanceof Error
            ? error.message
            : "Unable to reach the careers backend.",
      },
    };
  }
}

export async function GET() {
  const backend = await fetchBackendConfig("GET");
  if (backend.ok && backend.data) {
    return NextResponse.json(backend.data, { status: 200 });
  }

  const localConfig = await readLocalConfig();
  return NextResponse.json(localConfig, { status: 200 });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const normalizedConfig = normalizeCareersConfig(payload);

  if (
    normalizedConfig.vacancies.some(
      (vacancy) => !vacancy.title || !vacancy.emailSubject,
    )
  ) {
    return NextResponse.json(
      {
        error:
          "Every vacancy needs at least a title and an email subject before saving.",
      },
      { status: 400 },
    );
  }

  const backend = await fetchBackendConfig(
    "POST",
    JSON.stringify(normalizedConfig),
  );

  if (backend.ok && backend.data) {
    return NextResponse.json(backend.data, { status: 200 });
  }

  if (process.env.VERCEL) {
    const backendError =
      typeof backend.data === "object" && backend.data && "error" in backend.data
        ? String((backend.data as { error?: unknown }).error ?? "")
        : "The live careers backend could not save the config.";

    return NextResponse.json(
      {
        error: backendError,
        backend_status: backend.status,
        backend_url: backendCareersUrl(),
      },
      { status: 502 },
    );
  }

  await writeLocalConfig(normalizedConfig);
  return NextResponse.json(normalizedConfig, { status: 200 });
}
