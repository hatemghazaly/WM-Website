"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";

import {
  cloneCareersConfig,
  DEFAULT_CAREERS_CONFIG,
  normalizeCareersConfig,
  type Vacancy,
} from "@/lib/careers-data";

type Benefit = {
  icon: typeof BadgeDollarSign;
  label: string;
  description: string;
};

const highlights: Benefit[] = [
  {
    icon: BadgeDollarSign,
    label: "Competitive salary",
    description: "Competitive salary package.",
  },
  {
    icon: Trophy,
    label: "Performance rewards",
    description: "Performance-based incentives.",
  },
  {
    icon: GraduationCap,
    label: "Training",
    description: "Comprehensive training.",
  },
  {
    icon: ShieldCheck,
    label: "Social insurance",
    description: "Social Insurance.",
  },
];

export default function OpenVacanciesPage() {
  const [openVacancy, setOpenVacancy] = useState<string | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>(
    () => cloneCareersConfig(DEFAULT_CAREERS_CONFIG).vacancies,
  );
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  const reveal = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  } as const;

  useEffect(() => {
    let cancelled = false;

    async function loadVacancies() {
      try {
        const response = await fetch("/api/admin/careers", {
          cache: "no-store",
        });
        const payload = (await response.json()) as unknown;

        if (!response.ok) {
          throw new Error("We could not load the latest vacancies.");
        }

        const config = normalizeCareersConfig(payload);

        if (!cancelled) {
          setVacancies(config.vacancies);
        }
      } catch {
        if (!cancelled) {
          setVacancies(cloneCareersConfig(DEFAULT_CAREERS_CONFIG).vacancies);
        }
      }
    }

    loadVacancies();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          ref={heroRef}
          className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0.10)_32%,transparent_72%)] blur-3xl animate-glow-slow" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Join Our Team
            </motion.div>

            <motion.h1
              className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
              variants={reveal}
            >
              Open Vacancies
            </motion.h1>

            <motion.div
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              variants={reveal}
            />

            <motion.p
              className="mx-auto mt-10 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
              variants={reveal}
            >
              Explore the current openings at Willi Med and discover roles where
              you can contribute, grow, and build meaningful impact with our
              team.
            </motion.p>
          </div>
          <div className="relative my-12">
            <div className="absolute -left-16 top-6 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl" />
            <div className="absolute -right-12 bottom-6 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
            <motion.div
              className="group mx-auto max-w-2xl overflow-hidden rounded-[34px]"
              variants={reveal}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
            >
              <motion.div style={{ y: imageY, scale: imageScale }}>
                <Image
                  src="/images/open_vacancies.png"
                  alt="Willi Med team member portrait"
                  width={2481}
                  height={3508}
                  className="object-cover scale-[1.1]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.1,
                },
              },
            }}
          >
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.label}
                  className="rounded-[28px] border border-slate-200/70 bg-white/85 p-5 shadow-[0_16px_40px_-30px_rgba(15,23,42,0.3)]"
                  variants={reveal}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                        {item.label}
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <div className="mt-10 grid items-start gap-5">
          {vacancies.map((vacancy) => (
            <motion.article
              key={vacancy.title}
              className="self-start overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-36px_rgba(15,23,42,0.4)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
              <button
                type="button"
                onClick={() =>
                  setOpenVacancy((current) =>
                    current === vacancy.title ? null : vacancy.title,
                  )
                }
                className="flex w-full cursor-pointer items-start justify-between gap-4 px-6 py-6 text-left sm:px-7"
                aria-expanded={openVacancy === vacancy.title}
              >
                <div>
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                    {vacancy.department}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2rem]">
                    {vacancy.title}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      {vacancy.location}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                      <BriefcaseBusiness className="h-4 w-4 text-slate-400" />
                      {vacancy.type}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2">
                      <GraduationCap className="h-4 w-4 text-slate-400" />
                      {vacancy.experience}
                    </span>
                  </div>
                </div>

                <div className="mt-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-emerald-700">
                  <span>
                    {openVacancy === vacancy.title ? "Collapse" : "Expand"}
                  </span>
                </div>
              </button>

              {openVacancy === vacancy.title && (
                <div className="border-t border-slate-200 px-6 py-6 sm:px-7">
                  <p className="text-sm leading-7 text-slate-600 sm:text-base">
                    {vacancy.summary}
                  </p>

                  <div className="mt-6">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                      Key responsibilities
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                      {vacancy.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                      Qualifications
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                      {vacancy.qualifications.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 rounded-full bg-sky-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
                    <div className="text-sm text-slate-500">
                      Press &quot;Apply Now&quot; or Submit your CV to{" "}
                      <a
                        href={`mailto:careers@wmwebsite.com?subject=${encodeURIComponent(vacancy.emailSubject)}`}
                        className="font-medium text-slate-900 underline-offset-4 hover:underline"
                      >
                        shahd.awad@willimed.com
                      </a>
                    </div>

                    <Link
                      href={`/careers/apply_now?role=${encodeURIComponent(vacancy.title)}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
                    >
                      Apply Now
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
