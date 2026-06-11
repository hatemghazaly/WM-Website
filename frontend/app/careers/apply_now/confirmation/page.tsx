"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, BriefcaseBusiness } from "lucide-react";

export default function ApplicationConfirmationPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name")?.trim();
  const role = searchParams.get("role")?.trim();

  const reveal = {
    hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative mb-14 overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />
          <motion.div
            className="relative mx-auto max-w-4xl"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.05,
                },
              },
            }}
          >
            <div className="relative px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
              <motion.div
                className="mx-auto max-w-3xl text-center"
                variants={reveal}
              >
                <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Application received
                </div>

                <h1 className="mt-6 text-4xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-5xl lg:text-6xl">
                  {name ? `Dear ${name},` : "Dear applicant,"}
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-[1rem] leading-8 text-slate-600 sm:text-lg">
                  Thanks for your application. Our recruitment team has your
                  details and will contact you soon. We appreciate your
                  interest in joining Willi Med.
                </p>

                {role ? (
                  <div className="mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/85 px-5 py-4 text-sm text-slate-700 shadow-sm">
                    <BriefcaseBusiness className="h-4 w-4 text-slate-500" />
                    <span>
                      Submitted for{" "}
                      <span className="font-semibold text-slate-950">
                        {role}
                      </span>
                    </span>
                  </div>
                ) : null}

                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/careers/open_vacancies"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.6)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    View Open Vacancies
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Go to Home
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
