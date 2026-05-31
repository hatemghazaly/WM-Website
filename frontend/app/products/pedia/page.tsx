"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  HeartPulse,
  Baby,
  CheckCircle2,
  ArrowLeft,
  X,
} from "lucide-react";

const PediaProducts = [
  {
    name: "Willi D3 Drops",
    tagline: "Vitamin D3 Supplement",
    image: "/images/Products/pedia/baby1.png",
    description: "",
    specs: [""],
  },
];

export default function PediaPage() {
  const [activeProduct, setActiveProduct] = useState<
    (typeof PediaProducts)[number] | null
  >(null);
  const reveal = {
    hidden: { opacity: 0, y: 16, scale: 0.985 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay,
        duration: 0.9,
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
          viewport={{ once: true, amount: 0.25 }}
          variants={reveal}
          custom={0}
        >
          {/* Header Section */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
              custom={0.05}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Pediatrics Care
            </motion.div>
            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
              variants={reveal}
              custom={0.12}
            >
              Pedia Line
            </motion.h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
              custom={0.2}
            >
              At Willi Med, we are committed to supporting healthy growth and
              development from the earliest stages of life. Our Pediatric Line
              is focused on providing safe, effective, and high-quality
              healthcare solutions tailored to the unique needs of infants and
              children.
            </motion.p>

            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
              custom={0.28}
            >
              As the first product in this growing portfolio, Willi D3 delivers
              400 IU of Vitamin D3 per drop, helping support healthy bone
              development, immune function, and overall child well-being. As
              part of our commitment to pediatric healthcare, we continue to
              expand our pipeline with innovative products designed to support
              children's health at every stage of development.{" "}
            </motion.p>
          </div>

          {/* Hero Background Image */}
          <motion.div
            className="relative mt-8 h-[260px] overflow-hidden rounded-[30px] bg-slate-100 sm:h-[340px] lg:h-[420px]"
            variants={reveal}
            custom={0.4}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.03 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <Image
                src="/images/Products/pedia/pediatric_bg.png"
                alt="Pediatric care"
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.03),rgba(15,23,42,0.14))]" />
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="mt-6 grid gap-4 lg:grid-cols-3"
            variants={reveal}
            custom={0.5}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              {
                icon: Award,
                title: "Innovation",
                description:
                  "Beautiful and durable, by design. Crafted to meet the premium standard of Willi Med's excellence.",
              },
              {
                icon: HeartPulse,
                title: "Care Focused",
                description:
                  "A line shaped around comfort, clarity and age-aware support for younger patients.",
              },
              {
                icon: Baby,
                title: "Gentle Formulation",
                description:
                  "Built with a soft, careful approach for everyday baby needs.",
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
                      Willi Med's Excellence
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

          {/* Second Background Image */}
          <motion.div
            className="relative mt-6 h-[220px] overflow-hidden rounded-[30px] bg-slate-100 sm:h-[280px]"
            variants={reveal}
            custom={0.56}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02, opacity: 0.96 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <Image
                src="/images/Products/ritex/intimacy.png"
                alt="Pediatric care illustration"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,23,42,0.08))]" />
          </motion.div>

          {/* Tested Quality Section */}
          <motion.h2
            className="mt-8 text-center text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl"
            variants={reveal}
            custom={0.6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            Tested Quality
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-4xl text-center text-[0.98rem] leading-8 text-slate-600 sm:text-lg"
            variants={reveal}
            custom={0.62}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            Willi Med products are made with the highest quality standards,
            ensuring safety and efficacy for your little ones. Below is an
            overview of our pediatric product.
          </motion.p>

          {/* Product Showcase - Apple Card Carousel */}
          <motion.div
            className="mt-16"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
              {PediaProducts.map((product) => (
                <motion.div
                  key={product.name}
                  className="group relative overflow-hidden rounded-[32px] bg-black h-[720px]"
                  variants={reveal}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content - Positioned at top and bottom */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                    {/* Top Section */}
                    <div className="flex flex-col">
                      <p className="text-xs font-medium tracking-[0.12em] text-slate-300 uppercase">
                        {product.tagline}
                      </p>
                      <h3 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-white leading-tight">
                        {product.name}
                      </h3>
                    </div>

                    {/* Bottom Section */}
                    <div className="flex flex-col">
                      <p className="text-sm leading-relaxed text-slate-100 mb-4">
                        {product.description}
                      </p>
                      <ul className="space-y-2 mb-6"></ul>

                      {/* Plus Button */}
                      <div className="flex justify-end">
                        <motion.button
                          type="button"
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all group-hover:bg-white/30"
                          onClick={() => setActiveProduct(product)}
                          onPointerDown={(event) => event.stopPropagation()}
                          aria-label={`View specs for ${product.name}`}
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div className="mt-10 flex justify-center" variants={reveal}>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
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
                  Pediatric Product Specs
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
                    {activeProduct.tagline}
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
                        <span>{spec || "Details coming soon."}</span>
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
