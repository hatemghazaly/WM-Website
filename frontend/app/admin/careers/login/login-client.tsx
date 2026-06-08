"use client";

import { useMemo, useState, type FormEvent } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

async function readJsonResponse(response: Response) {
  const raw = await response.text();
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return { error: raw };
  }
}

function responseError(payload: unknown, fallback: string) {
  return typeof payload === "object" && payload && "error" in payload
    ? String((payload as { error?: unknown }).error ?? fallback)
    : fallback;
}

export default function CareersAdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => searchParams.get("next") || "/admin/careers",
    [searchParams],
  );
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/careers/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const payload = await readJsonResponse(response);
      if (!response.ok) {
        throw new Error(
          responseError(payload, "We could not sign you in."),
        );
      }

      router.replace(nextPath);
      router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "We could not sign you in.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-md">
        <div className="rounded-[36px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900">
            <LockKeyhole className="h-6 w-6" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
              Careers Admin
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              Enter Password
            </h1>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the admin password to edit vacancies and roles.
            </p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-2">
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                placeholder="Enter password"
                autoComplete="current-password"
              />
            </label>

            {message ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                {message}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading || !password.trim()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-950 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
