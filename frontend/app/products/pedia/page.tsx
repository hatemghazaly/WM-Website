"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Baby, HeartPulse, Sparkles, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: Baby,
    title: "Gentle Formulations",
    description:
      "Pediatric products designed with a soft, careful approach for everyday family needs.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Standards",
    description:
      "Built around quality, safety, and the reassurance families expect from Willi Med.",
  },
  {
    icon: HeartPulse,
    title: "Care-Focused",
    description:
      "A line shaped around comfort, clarity, and age-aware support for younger patients.",
  },
];

export default function PediaPage() {
  const reveal = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  } as const;

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.06,
              },
            },
          }}
        >
          <motion.div
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
            variants={reveal}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Pediatric Care
            </div>

            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-7xl">
              Pedia
            </h1>

            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

            <p className="mx-auto mt-8 max-w-3xl text-[0.98rem] leading-8 text-slate-600 sm:text-lg lg:text-xl">
              A gentle line of pediatric products shaped around care, comfort,
              and thoughtful support for families and healthcare professionals.
              We are preparing this collection with the same calm, premium
              visual language used across the rest of the site.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.08,
                },
              },
            }}
          >
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.25)] backdrop-blur-2xl"
                  variants={reveal}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            variants={reveal}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Back to Home
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Explore Products
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
