"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles, X } from "lucide-react";

const condomProducts = [
  {
    name: "Ritex Probe Covers",
    image: "/images/Products/ritex/probe.jpg",
    slogan: "Reliable protection for precise diagnostics.",
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
  const [activeProduct, setActiveProduct] = useState<
    (typeof condomProducts)[number] | null
  >(null);
  const reveal = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  } as const;

  useEffect(() => {
    if (!activeProduct) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProduct(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeProduct]);

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
                  src="/images/Products/ritex/probe_bg.jpg"
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
                className="group relative overflow-hidden rounded-[32px] bg-sky-100 h-[540px] cursor-pointer shadow-lg"
                variants={reveal}
                whileHover={{
                  scale: 1.02,
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div className="absolute inset-0 p-8 lg:p-12 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <motion.div
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/5 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xs font-medium tracking-[0.12em] text-slate-700 uppercase">
                      Ritex Probe Cover
                    </p>
                    <h3 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-slate-900 leading-tight">
                      {product.name}
                    </h3>
                  </motion.div>

                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-end">
                      <motion.button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400/30 backdrop-blur-sm"
                        onClick={() => setActiveProduct(product)}
                        onPointerDown={(event) => event.stopPropagation()}
                        aria-label={`View specs for ${product.name}`}
                        whileHover={{
                          scale: 1.15,
                          backgroundColor: "rgba(100, 116, 139, 0.5)",
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.svg
                          className="h-6 w-6 text-slate-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          whileHover={{
                            rotate: 90,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </motion.svg>
                      </motion.button>
                    </div>
                  </motion.div>
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

      {activeProduct ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
          onClick={() => setActiveProduct(null)}
          role="presentation"
        >
          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.45)]"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5 sm:px-8">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                  Ritex Probe Specs
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                  {activeProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveProduct(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                aria-label="Close specs popup"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 sm:px-8">
              <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
                <div className="flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-slate-100">
                    <Image
                      src={activeProduct.image}
                      alt={activeProduct.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 220px"
                    />
                  </div>
                  <p className="mt-4 rounded-2xl bg-sky-100 px-4 py-3 text-sm leading-6 text-slate-700">
                    {activeProduct.slogan}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Product Details
                  </div>
                  <ul className="mt-4 space-y-3">
                    {activeProduct.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}
