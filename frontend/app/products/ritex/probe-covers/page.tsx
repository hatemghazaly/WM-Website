"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const condomProducts = [
  {
    name: "Ritex Probe Covers",
    image: "/images/Products/probe.jpg",
    specs: [
      "For Vaginal And Rectal Sonography Probes.",
      "Clear Vision For Accurate Diagnostics.",
      "Reduce the risk of transmitting infections.",
      "Colour: transparent.",
      "Coating: dry, powdered.",
      "Each protective cover is individually electronically tested.",
      "100% Made in Germany.",
    ],
  },
];

export default function RitexProbeCoversPage() {
  const reveal = {
    hidden: { opacity: 0, y: 24, scale: 0.96 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.95,
        ease: [0.2, 0.8, 0.2, 1],
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
          className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
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
            className="mx-auto max-w-4xl text-center"
            variants={reveal}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Extra Safety
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Ritex Probe Covers
            </h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              Ritex protective covers for ultrasound probes are designed for
              medical use during vaginal and rectal sonography procedures.
              Manufactured to high quality standards, they provide a reliable
              protective barrier that helps reduce the risk of
              cross-contamination and infection transmission between patients
              and healthcare professionals. Ritex probe covers support safe,
              hygienic, and efficient diagnostic examinations while ensuring
              optimal compatibility with ultrasound equipment used in clinical
              and healthcare settings.
            </p>
          </motion.div>

          <motion.div className="mt-10 text-center" variants={reveal}>
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
              Advanced Protection for Clinical{" "}
              <span className="font-black">Excellence</span>
            </h2>
            <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)]">
              <motion.div
                className="relative aspect-[16/9] w-full"
                initial={{ opacity: 0, scale: 1.06, y: 8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.15, ease: [0.2, 0.8, 0.2, 1] }}
                viewport={{ once: true, amount: 0.25 }}
              >
                <Image
                  src="/images/Products/probe_bg.jpg"
                  alt="Trust illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </motion.div>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Ritex protective covers for ultrasound probes undergo several
              quality tests and are characterised by very good skin
              compatibility. Each protective cover is individually
              electronically tested for leaks.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
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
            {condomProducts.map((product) => (
              <motion.div
                key={product.name}
                className="overflow-hidden rounded-[30px] border border-slate-200/70 bg-white shadow-[0_18px_40px_-28px_rgba(15,23,42,0.22)]"
                variants={reveal}
              >
                <motion.div
                  className="relative h-72 bg-white px-6 pt-14"
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, ease: [0.2, 0.8, 0.2, 1] }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain object-top translate-y-4 scale-[0.88]"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />
                </motion.div>
                <div className="p-5">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                    Ritex condom
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-[-0.04em] text-slate-950">
                    {product.name}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {product.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex gap-2 text-sm leading-7 text-slate-600"
                      >
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="mt-10 flex justify-center" variants={reveal}>
            <Link
              href="/products/ritex/ritex-overview"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Ritex GMBH
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
