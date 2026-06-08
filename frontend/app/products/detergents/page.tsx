"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Sparkles,
  ShieldCheck,
  SprayCan,
  CheckCircle2,
  ArrowLeft,
  X,
} from "lucide-react";

const DetergentProducts = [
  {
    name: "Tetatol",
    tagline: "Detergents",
    cardImage: "/images/Products/detergents/granny.png",
    cardImageClassName: "scale-[1.12] object-[center_38%]",
    popupImage: "/images/Products/detergents/tetatol2.png",
    description: "",
    specs: [
      "Powerful cleaning & disinfecting.",
      "Helps eliminating germs & bacteria.",
      "Suitable for everyday household cleaning.",
      "Leaves surfaces fresh, clean, & hygienic.",
      "Made in Poland to high-quality European standards.",
    ],
  },

  {
    name: "Product Coming Soon",
    tagline: "Hand Soap",
    cardImage: "/images/Products/detergents/granny2.png",
    popupImage: "/images/Products/detergents/handsoap.png",
    description: "",
    specs: ["DETAILS COMING SOON."],
  },

  {
    name: "More Product Coming Soon",
    tagline: "Shower Gel",
    cardImage: "/images/Products/detergents/shower_lady.png",
    popupImage: "/images/Products/detergents/shower_gel.png",
    description: "",
    specs: ["DETAILS COMING SOON."],
  },
];

export default function DetergentPage() {
  const [activeProduct, setActiveProduct] = useState<
    (typeof DetergentProducts)[number] | null
  >(null);
  const activeProductIndex = activeProduct
    ? DetergentProducts.indexOf(activeProduct)
    : -1;
  const pastelColors = ["bg-green-100", "bg-pink-100", "bg-yellow-100"];
  const activeProductColor =
    activeProductIndex >= 0 ? pastelColors[activeProductIndex] : "bg-slate-50";
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
        >
          {/* Header Section */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Cleanliness Meets Quality
            </motion.div>
            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
              variants={reveal}
            >
              Detergent Line
            </motion.h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
            >
              Our detergents are formulated to deliver powerful cleaning
              performance while remaining gentle on fabrics and surfaces.
              Designed for everyday use, they help remove dirt and stains
              effectively, leaving a long-lasting fresh scent and the
              cleanliness you can trust for your home and family.{" "}
            </motion.p>

            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
            >
              <strong>Tetatol</strong> Surface Cleaner is the first product in
              our growing home care range, bringing the quality and reliability
              of <strong>Polish</strong> manufacturing to everyday cleaning.
              Developed and produced in <strong>Poland</strong>,{" "}
              <strong>Tetatol</strong> delivers effective surface cleaning while
              reflecting the high standards our brand stands for. As the
              beginning of an expanding product line, it marks the first step in
              a wide range of <strong>Premium Polish-made solutions</strong>{" "}
              that will soon be available to meet more of your household
              needs.{" "}
            </motion.p>
          </div>

          {/* Hero Background Image */}
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
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <Image
                src="/images/Products/detergents/detergents2.png"
                alt="Detergent"
                fill
                className="object-cover object-[center_100%] scale-[1.55]"
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {[
              {
                icon: BadgeCheck,
                title: "Polish Quality",
                description:
                  "Proudly made in Poland with a commitment to quality, performance, and consistency.",
              },
              {
                icon: ShieldCheck,
                title: "Family Clean Care",
                description:
                  "Helping families maintain cleaner, fresher spaces with products they can rely on.",
              },
              {
                icon: SprayCan,
                title: "Powerful Cleaning",
                description:
                  "Advanced cleaning formulas developed to tackle everyday messes with ease.",
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
                      Willi Med&apos;s Excellence
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
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.02, opacity: 0.96 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <Image
                src="/images/Products/detergents/cleaning_lady.png"
                alt="Cleaning lady illustration"
                fill
                className="object-cover object-[center_32%]"
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(15,23,42,0.08))]" />
          </motion.div>

          {/* Tested Quality Section */}
          <motion.h2
            className="mt-8 text-center text-2xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-3xl"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            Premium Excellence
          </motion.h2>

          <motion.p
            className="mx-auto mt-4 max-w-4xl text-center text-[0.98rem] leading-8 text-slate-600 sm:text-lg"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            Built on a foundation of <strong>trust</strong>,{" "}
            <strong>quality</strong> and <strong>excellence</strong>, our
            products are carefully crafted to meet the highest standards of{" "}
            <strong>performance</strong> & <strong>reliability</strong>. With
            premium ingredients and advanced formulations, we deliver solutions
            you can depend on every day.{" "}
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
              {DetergentProducts.map((product) => (
                <motion.div
                  key={product.name}
                  className="group relative overflow-hidden rounded-[32px] bg-black h-[720px]"
                  variants={reveal}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <Image
                    src={product.cardImage}
                    alt={product.name}
                    fill
                    className={`object-cover group-hover:scale-105 transition-transform duration-500 ${product.cardImageClassName ?? ""}`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Content - Positioned at top and bottom */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                    {/* Top Section */}
                    {/* Top Section */}
                    <div className="flex flex-col items-center text-center">
                      <p className="text-xs font-medium tracking-[0.12em] text-black uppercase">
                        {" "}
                        {product.tagline}
                      </p>
                      <div className="mt-3 w-max max-w-[85%] rounded-full bg-slate-900/50 px-4 py-2 backdrop-blur-sm">
                        <h3 className="whitespace-nowrap text-xl font-semibold tracking-[-0.03em] text-white lg:text-2xl">
                          {product.name}
                        </h3>
                      </div>
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
            {/* <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link> */}
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
                      src={activeProduct.popupImage}
                      alt={`${activeProduct.name} packaging`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 220px"
                    />
                  </div>
                  <p
                    className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-6 text-slate-700 ${activeProductColor}`}
                  >
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
