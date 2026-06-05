"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Droplets,
  ShieldCheck,
  Shield,
  Sparkles,
  ScanLine,
} from "lucide-react";

const categoryLinks = [
  {
    icon: Shield,
    accent:
      "from-sky-100 to-sky-50 text-sky-700 border-sky-200/70 hover:border-sky-300/80 hover:shadow-sky-200/50",
    baseBg: "bg-sky-50/70",
    hoverBg: "hover:bg-sky-100/90",
    hoverText: "group-hover:text-sky-700 group-hover:decoration-sky-500/60",
    href: "/products/ritex/condoms",
    title: "Ritex Condoms",
  },
  {
    icon: Droplets,
    accent:
      "from-emerald-100 to-emerald-50 text-emerald-700 border-emerald-200/70 hover:border-emerald-300/80 hover:shadow-emerald-200/50",
    baseBg: "bg-emerald-50/70",
    hoverBg: "hover:bg-emerald-100/90",
    hoverText:
      "group-hover:text-emerald-700 group-hover:decoration-emerald-500/60",
    href: "/products/ritex/lubricants",
    title: "Ritex Lubricants",
  },
  {
    icon: ScanLine,
    accent:
      "from-amber-100 to-amber-50 text-amber-700 border-amber-200/70 hover:border-amber-300/80 hover:shadow-amber-200/50",
    baseBg: "bg-amber-50/70",
    hoverBg: "hover:bg-amber-100/90",
    hoverText: "group-hover:text-amber-700 group-hover:decoration-amber-500/60",
    href: "/products/ritex/probe-covers",
    title: "Ritex Probe Covers",
  },
];

export default function RitexPage() {
  const reveal = {
    hidden: { opacity: 0, y: 16, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  } as const;

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
        <div className="relative mb-14 overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)] inset-0 -z-10" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed inset-0 -z-10" />
          <motion.div
            className="relative mx-auto max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
                variants={reveal}
              >
                German Quality Since 1948 🇩🇪
              </motion.div>
              <motion.h1
                className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
                variants={reveal}
              >
                Ritex GmbH
              </motion.h1>
              <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
              <motion.p
                className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
                variants={reveal}
              >
                Ritex GmbH is a leading German manufacturer of premium family
                planning products, including condoms and personal lubricants.
                Since 1948, Ritex has been committed to delivering exceptional
                quality, safety and innovation, earning the trust of consumers
                and healthcare professionals across Europe and beyond.
              </motion.p>
              <motion.p
                className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
                variants={reveal}
              >
                In Egypt, Ritex products are exclusively represented and
                distributed through Willi Med, the company&apos;s sole
                authorized agent, ensuring the highest standards of
                availability, customer support and market expertise.
              </motion.p>
            </div>

            <motion.div
              className="relative mt-8 h-[260px] overflow-hidden rounded-[30px] bg-slate-100 sm:h-[340px] lg:h-[420px]"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.03 }}
                whileInView={{ scale: 1 }}
                transition={{
                  duration: 1.4,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <Image
                  src="/images/Products/ritex/ritex_factory.jpg"
                  alt="Ritex factory"
                  fill
                  className="object-cover scale-[1.1]"
                  sizes="100vw"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.03),rgba(15,23,42,0.14))]" />
            </motion.div>

            <motion.div
              className="mt-6 grid gap-4 lg:grid-cols-2"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {[
                {
                  icon: Award,
                  title: "Premium Quality",
                  description:
                    "Crafted to meet the premium standard Ritex is known for worldwide.",
                },
                {
                  icon: ShieldCheck,
                  title: "100% Made in German",
                  description:
                    "Built with German manufacturing precision, consistency, and care.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-[26px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.25)] backdrop-blur"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50 text-slate-900">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                        Ritex promise
                      </p>
                      <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-slate-950">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            <motion.h2
              className="mt-16 text-center text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl"
              variants={reveal}
            >
              Tested Quality
            </motion.h2>

            <motion.p
              className="mx-auto mt-4 max-w-4xl text-center text-[0.98rem] leading-8 text-slate-600 sm:text-lg"
              variants={reveal}
            >
              Ritex products are made exclusively in Germany from the highest
              quality raw materials using the latest technology. This is also
              reflected in periodic tests that independent institutes carry out.
              Below is an overview of some of our products&apos; test ratings.
            </motion.p>
            <motion.div
              className="relative mt-6 h-[220px] overflow-hidden rounded-[30px] bg-slate-100 sm:h-[280px]"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.02, opacity: 0.96 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <Image
                  src="/images/Products/ritex/intimacy.png"
                  alt="Intimacy illustration"
                  fill
                  className="object-cover scale-[1.1]"
                  sizes="100vw"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,23,42,0.08))]" />
            </motion.div>
          </motion.div>
          <motion.div>
            <motion.div
              className="mt-6 grid gap-5 sm:grid-cols-3"
              variants={reveal}
            >
              {categoryLinks.map((category) => (
                <Link
                  key={category.title}
                  href={category.href}
                  className={`group flex flex-col items-center rounded-[28px] border px-4 py-4 text-center shadow-[0_12px_30px_-24px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(15,23,42,0.28)] ${category.baseBg} ${category.hoverBg}`}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-full border bg-gradient-to-b shadow-[0_18px_40px_-24px_rgba(15,23,42,0.28)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.35)] ${category.accent}`}
                  >
                    <category.icon className="h-12 w-12" />
                  </div>
                  <span className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                    Ritex
                  </span>
                  <h3
                    className={`mt-1 text-base font-semibold uppercase tracking-[0.08em] text-[#163b82] underline decoration-[#163b82]/60 decoration-1 underline-offset-4 transition-colors duration-300 ${category.hoverText}`}
                  >
                    {category.title.replace("Ritex ", "")}
                  </h3>
                  <div className="mt-3 h-1 w-16 rounded-full bg-slate-200/80 transition-all duration-300 group-hover:w-24 group-hover:bg-[#0f5db8]/35" />
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
