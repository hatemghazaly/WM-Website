"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
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

type Vacancy = {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  emailSubject: string;
};

const vacancies: Vacancy[] = [
  {
    title: "Full Time Medical Representative",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Full-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Full Time Medical Representative",
  },
  {
    title: "Part Time Medical Representative",
    department: "Sales & Field Operations",
    location: "All Governrate, Egypt",
    type: "Part-time",
    experience: "0-3 years",
    summary:
      "Promote our pharmaceutical portfolio, support healthcare professionals, and grow long-term territory relationships.",
    responsibilities: [
      "Promote and detail the company's pharmaceutical products to healthcare professionals, including doctors, pharmacists, and hospitals within the assigned territory.",
      "Build strong relationships with healthcare professionals, identify their needs, and provide appropriate product information and support.",
      "Achieve sales targets and objectives by effectively implementing sales and marketing strategies.",
      "Conduct product presentations, organize seminars, and participate in medical conferences and events.",
      "Monitor market trends, competitors, and customer feedback to develop strategies for increased market share.",
      "Provide regular reports on sales activities, customer feedback, and market intelligence to the sales management team.",
      "Collaborate with the marketing team to develop promotional materials and campaigns. ",
    ],
    qualifications: [
      "Bachelor's degree in Pharmacy, Medicine, Science, or a related field.",
      "0 to 3 years of experience in pharmaceutical sales or medical representation.",
      "Strong communication, presentation, and relationship-building skills.",
      "Self-motivated, organized, and able to work toward sales targets.",
    ],
    emailSubject: "Application for Part Time Medical Representative",
  },
];

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

  const reveal = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  } as const;

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
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
              custom={0}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Open Vacancies
            </motion.div>

            <motion.h1
              className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
              variants={reveal}
              custom={0.1}
            >
              Open Vacancies
            </motion.h1>

            <motion.div
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              variants={reveal}
              custom={0.18}
            />

            <motion.p
              className="mx-auto mt-10 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
              variants={reveal}
              custom={0.26}
            >
              Explore the current openings at Willi Med and discover roles where
              you can contribute, grow, and build meaningful impact with our
              team.
            </motion.p>
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
                  custom={0}
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
          {vacancies.map((vacancy, index) => (
            <motion.article
              key={vacancy.title}
              className="self-start overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-36px_rgba(15,23,42,0.4)]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
              custom={index * 0.08}
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

      <style jsx>{`
        @keyframes glowSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate3d(0, 14px, 0) scale(1.08);
            opacity: 0.85;
          }
        }

        .animate-glow-slow {
          animation: glowSlow 12s ease-in-out infinite;
        }

        .animate-glow-slow-delayed {
          animation: glowSlow 14s ease-in-out infinite;
          animation-delay: -7s;
        }
      `}</style>
    </section>
  );
}
