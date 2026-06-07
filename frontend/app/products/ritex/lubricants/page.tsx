"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  X,
} from "lucide-react";

const LubricantProducts = [
  {
    name: "Bio Vegan",
    image: "/images/Products/ritex/bio.jpg",
    popupImage: "/images/Products/ritex/bio.jpg",
    slogan: "A natural glide with a vegan touch.",
    specs: [
      "Vegan Lubricant.",
      "Water based.",
      "Dermatologically tested.",
      "No fragrances, colorants, PEG, parabens & other preservatives.",
      "Protects your sensitive mucous membranes in a natural way.",
      "Suitable with all Ritex Condoms.",
      "Available in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Hydro Gel",
    image: "/images/Products/ritex/hydro.jpg",
    popupImage: "/images/Products/ritex/hydro.jpg",
    slogan: "Gentle comfort made for sensitive skin.",
    specs: [
      "Water based.",
      "For Sensitive Skin.",
      "Free from fragrances & colorants.",
      "Specially designed to match the vaginal mucosa pH value.",
      "Dermatologically & Gynaecologically tested.",
      "Suitable with all Ritex Condoms.",
      "Available in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Gel Plus",
    image: "/images/Products/ritex/gel_plus.jpg",
    popupImage: "/images/Products/ritex/gel_plus.jpg",
    slogan: "Aloe-powered smoothness for every moment.",
    specs: [
      "Water based.",
      "With Organic Aloe Vera.",
      "No fragrances & colorants.",
      "pH-neutral.",
      "Dermatologically tested.",
      "Suitable with all Ritex Condoms.",
      "Available in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Longtime",
    image: "/images/Products/ritex/longtime_lub.jpg",
    popupImage: "/images/Products/ritex/longtime_lub.jpg",
    slogan: "Extra-long glide when you want more staying power.",
    specs: [
      "Silicone based.",
      "Provides Extra Lubrication",
      "No preservatives, fragrances & other additives",
      "Dermatologically tested.",
      "Suitable with all Ritex Condoms.",
      "Available in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
];

export default function RitexLubricantsPage() {
  const [activeProduct, setActiveProduct] = useState<
    (typeof LubricantProducts)[number] | null
  >(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const activeProductIndex = activeProduct
    ? LubricantProducts.indexOf(activeProduct)
    : -1;
  const pastelColors = [
    "bg-rose-100",
    "bg-blue-100",
    "bg-emerald-100",
    "bg-purple-100",
  ];
  const activeProductColor =
    activeProductIndex >= 0 ? pastelColors[activeProductIndex] : "bg-slate-50";
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

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

  const reveal = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
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
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <div className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-14">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.96),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.16)_0%,rgba(59,130,246,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

          <motion.div
            className="relative mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
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
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Extra Pleasure
            </motion.div>
            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
              variants={reveal}
            >
              Ritex Lubricants
            </motion.h1>
            <motion.div
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              variants={reveal}
            />
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
            >
              Ritex lubricants are designed to enhance comfort, intimacy and
              pleasure while supporting a smooth and enjoyable experience.
              Developed with the same commitment to quality and innovation that
              has defined Ritex since 1948, the range offers solutions tailored
              to different preferences and needs.
            </motion.p>
          </motion.div>

          <div className="flex justify-center pt-6">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-medium uppercase tracking-[0.34em] text-slate-500 shadow-sm backdrop-blur"
              animate={{ y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
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
            <motion.div className="mt-10 text-center" variants={reveal}>
              <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
                For Enhanced{" "}
                <span className="font-black">Pleasure And Passion</span>
              </h2>
              <div
                ref={heroRef}
                className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)]"
              >
                <motion.div
                  className="relative aspect-[16/9] w-full"
                  initial={{ opacity: 0, scale: 1.04, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  transition={{
                    duration: 1.05,
                    ease: [0.22, 1, 0.36, 1] as const,
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  style={{ y: imageY, scale: imageScale }}
                >
                  <Image
                    src="/images/Products/ritex/lubricants.jpg"
                    alt="Ritex Lubricants illustration"
                    fill
                    className="object-cover scale-[1.1]"
                    sizes="(max-width: 768px) 100vw, 900px"
                  />
                </motion.div>
              </div>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-base">
                Love is ... for trying out something new whenever the fancy
                takes you. Let Ritex lubricants take you on a sensuous journey
                to the furthest shores of your desire.
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-base">
                Our lubes spoil you with erotic massages, sweep you away to new
                pinnacles of lust and smooth the way for variations of play that
                call for enhanced lubrication.
              </p>
            </motion.div>

            <motion.div className="mt-10 text-center" variants={reveal}>
              <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
                Feel The <span className="font-black">Difference</span>
              </h2>
            </motion.div>

            <motion.div
              className="mt-8"
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
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {LubricantProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    className={`group relative overflow-hidden rounded-[32px] ${pastelColors[index]} h-[560px] cursor-pointer flex-shrink-0 shadow-lg`}
                    variants={reveal}
                    whileHover={{
                      scale: 1.05,
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
                      <div className="relative h-full w-full">
                        <motion.div
                          className="relative h-full w-full"
                          whileHover={{ scale: 1.08 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
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
                          Ritex Lubricant
                        </p>
                        <h3 className="mt-3 text-3xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 lg:text-4xl">
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
              </div>
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
                  Ritex Lubricant
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
                      alt={`${activeProduct.name} showcase`}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, 220px"
                    />
                  </div>
                  <p
                    className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-6 text-slate-700 ${activeProductColor}`}
                  >
                    {activeProduct.slogan}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
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
