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
  return env("CAREERS_BACKEND_URL", "https://willimed.wm360.info").replace(
    /\/$/,
    "",
  );
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
  try {
    const response = await fetch(`${backendUrl()}/api/admin/careers`, {
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

  await writeLocalConfig(normalizedConfig);
  return NextResponse.json(normalizedConfig, { status: 200 });
}
