import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[36px] border border-transparent bg-white/75 p-8 backdrop-blur-2xl">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_420px_1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
              About Willi Med
            </p>
            <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
              We bring trusted healthcare
            </h1>
            <p className="mt-4 max-w-xl text-slate-600">
              Willi Med is a Polish–Egyptian pharmaceutical company serving
              multiple therapeutic areas. We combine scientific rigor with local
              expertise to deliver products that improve patient outcomes and
              support healthcare professionals.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Card className="h-full border-transparent shadow-sm overflow-hidden">
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src="/images/mission.png"
                    alt="Mission"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-slate-900">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <svg
                        className="h-4 w-4 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M12 2v20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M5 12h14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span>Mission</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Our mission at Willi Med, as an emerging pharmaceutical
                  company, is dedicated to manufacturing high quality generic
                  medications and importing crucial products to our region. We
                  are committed to excellence in every step of our roadmap,
                  starting with providing our patients with high-quality
                  medications through scientific collaboration with healthcare
                  professionals to ensure patient satisfaction and effectively
                  manage their diseases. By utilizing our team of highly
                  educated and dedicated individuals, we strive for excellence
                  and aim to improve the quality of life for our patients.
                </CardContent>
              </Card>

              <Card className="h-full border-transparent shadow-sm overflow-hidden">
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  <img
                    src="/images/vision.png"
                    alt="Vision"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-slate-900">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                      <svg
                        className="h-4 w-4 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M3 12h18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M12 3v18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <span>Vision</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  Our Vision is to be the most trusted regional pharmaceutical
                  company which supplies healthcare providers with effective
                  high quality products to control disease and achieve patients
                  and customers satisfaction.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative flex h-[420px] w-[420px] items-center justify-center rounded-full bg-slate-100/80 p-6 shadow-[0_32px_80px_rgba(15,23,42,0.08)]">
              <div className="absolute inset-0 rounded-full bg-[conic-gradient(at_top,_rgba(167,243,208,0.65)_0deg,_rgba(167,243,208,0.15)_120deg,_rgba(191,219,254,0.65)_120deg,_rgba(191,219,254,0.15)_240deg,_rgba(250,229,195,0.65)_240deg,_rgba(250,229,195,0.15)_360deg)]" />
              <div className="absolute inset-14 rounded-full bg-white shadow-inner" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs uppercase tracking-[0.24em] text-slate-400"></span>
                <span className="mt-2 text-2xl font-semibold text-slate-900">
                  Willi Med
                </span>
                <span className="text-sm text-slate-500">
                  Y o u r e x c e ll e n c e c o d e
                </span>
              </div>

              <button className="group absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow transition hover:bg-emerald-100">
                Mission
              </button>
              <button className="group absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow transition hover:bg-sky-100">
                Vision
              </button>
              <button className="group absolute left-4 bottom-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow transition hover:bg-amber-100">
                Values
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-2xl bg-gradient-to-tr from-emerald-50/60 via-emerald-100/40 to-transparent blur-3xl" />
            <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-white/60 to-white/30 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900">
                Core values
              </h3>
              <p className="mt-3 text-sm text-slate-600">
                We prioritize safety, transparency, and collaboration in
                everything we do.
              </p>

              <ul className="mt-4 space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 flex-none rounded-full bg-emerald-400/80" />
                  <span>Patient-first care</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 flex-none rounded-full bg-emerald-400/80" />
                  <span>Scientific rigor</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-3 w-3 flex-none rounded-full bg-emerald-400/80" />
                  <span>Local partnership</span>
                </li>
              </ul>

              <div className="mt-6">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </section>
  );
}
