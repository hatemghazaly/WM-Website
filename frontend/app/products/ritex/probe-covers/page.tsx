import Image from "next/image";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const details = [
  "Probe covers from the Ritex range",
  "Focused on hygiene, clinical use, and product clarity",
  "Built for a clean product presentation page",
];

const bulletPoints = [
  "Medical accessory from the Ritex family",
  "Designed for clear browsing and future expansion",
  "Suitable for product-specific information updates",
];

export default function RitexProbeCoversPage() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <div className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Ritex GMBH
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Ritex Probe Covers
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              A dedicated page for Ritex Probe Covers, created as part of the
              Ritex GMBH product family.
            </p>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
          <div className="relative h-[280px] w-full overflow-hidden bg-slate-100 sm:h-[360px] lg:h-[440px]">
            <Image
              src="/images/Products/ritex_xxl.jpg"
              alt="Ritex Probe Covers"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06),rgba(15,23,42,0.18))]" />
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.95fr] lg:p-10">
            <div className="space-y-5">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                Product overview
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl">
                Ritex Probe Covers at a glance
              </h2>
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                This product page can be expanded later with usage guidance,
                downloadable materials, or detailed market information.
              </p>

              <div className="grid gap-3">
                {details.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <Link
                href="/products/ritex"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Ritex GMBH
              </Link>
            </div>

            <div className="rounded-[28px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] p-6 sm:p-7">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                Key points
              </p>
              <ul className="mt-5 space-y-4">
                {bulletPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-7 text-slate-600">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
