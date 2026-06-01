"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  X,
} from "lucide-react";

const mazagotonProducts = [
  {
    name: "Mazagoton - F",
    image: "/images/Products/mazagoton/rr1.jpg",
    slogan: "Feel every moment with natural intensity.",
    specs: [
      "Intense Sensations.",
      "A guaranteed 100% natural experience.",
      "Silky Soft Surface with sensitive lubrication.",
      "Aviailable in packs of 3 and 10.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Mazagoton - M",
    image: "/images/Products/mazagoton/xxl.jpg",
    slogan: "Extra room. Extra comfort. Extra confidence.",
    specs: [
      "Extra Large.",
      "Highly elastic.",
      "Intense in sensation.",
      "Extra lubrication for a better experience.",
      "Aviailable in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Mazagoton Energy",
    image: "/images/Products/mazagoton/energy.jpg",
    slogan: "Textured for stronger shared sensations.",
    specs: [
      "Dotted & Ribbed.",
      "Intense stimulation for both partners.",
      "Available in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
];

export default function MazagotonPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeProduct, setActiveProduct] = useState<
    (typeof mazagotonProducts)[number] | null
  >(null);
  const carouselViewportRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDivElement | null>(null);
  const wheelStateRef = useRef({
    accumulated: 0,
    resetTimer: null as ReturnType<typeof setTimeout> | null,
  });
  const dragStateRef = useRef({
    pointerId: -1,
    startX: 0,
    lastX: 0,
  });
  const itemsPerView = 4;
  const maxIndex = Math.max(0, mazagotonProducts.length - itemsPerView);
  const pastelColors = ["bg-blue-100", "bg-emerald-100", "bg-purple-100"];
  const activeProductIndex = activeProduct
    ? mazagotonProducts.indexOf(activeProduct)
    : -1;
  const activeProductColor =
    activeProductIndex >= 0 ? pastelColors[activeProductIndex] : "bg-slate-50";
  const { scrollYProgress: trustScrollYProgress } = useScroll({
    target: trustRef,
    offset: ["start end", "end start"],
  });
  const trustImageY = useTransform(trustScrollYProgress, [0, 1], [24, -24]);
  const trustImageScale = useTransform(
    trustScrollYProgress,
    [0, 1],
    [0.98, 1.02],
  );

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

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

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const horizontalDelta =
      Math.abs(event.deltaX) >= Math.abs(event.deltaY)
        ? event.deltaX
        : event.shiftKey
          ? event.deltaY
          : 0;

    if (!horizontalDelta) return;

    event.preventDefault();

    wheelStateRef.current.accumulated += horizontalDelta;

    if (wheelStateRef.current.resetTimer) {
      clearTimeout(wheelStateRef.current.resetTimer);
    }

    const threshold = 120;

    if (wheelStateRef.current.accumulated >= threshold) {
      handleNext();
      wheelStateRef.current.accumulated = 0;
    } else if (wheelStateRef.current.accumulated <= -threshold) {
      handlePrev();
      wheelStateRef.current.accumulated = 0;
    }

    wheelStateRef.current.resetTimer = setTimeout(() => {
      wheelStateRef.current.accumulated = 0;
      wheelStateRef.current.resetTimer = null;
    }, 140);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;

    dragStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current.lastX = event.clientX;
    setDragOffset(event.clientX - dragStateRef.current.startX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || dragStateRef.current.pointerId !== event.pointerId) {
      return;
    }

    const threshold = Math.max(
      60,
      (carouselViewportRef.current?.clientWidth ?? 0) * 0.12,
    );
    const delta = dragStateRef.current.lastX - dragStateRef.current.startX;

    if (delta > threshold) {
      handlePrev();
    } else if (delta < -threshold) {
      handleNext();
    }

    setDragOffset(0);
    setIsDragging(false);
    dragStateRef.current = {
      pointerId: -1,
      startX: 0,
      lastX: 0,
    };
  };

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
          <motion.div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
              custom={0}
            >
              <Sparkles className="h-3.5 w-3.5" />
              FOR MANAGING YOUR DAILY HEALTH
            </motion.div>
            <motion.h1
              className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
              variants={reveal}
              custom={0.08}
            >
              Mazagoton Family
            </motion.h1>
            <motion.div
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              variants={reveal}
              custom={0.16}
            />
            <motion.p
              className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg"
              variants={reveal}
              custom={0.24}
            >
              Engineered in Germany since 1948, Ritex condoms combine safety,
              comfort and innovation to enhance intimate moments while providing
              reliable protection. From ultra-thin and natural-feel options to
              textured and specialty designs, Ritex offers a variety of choices
              to suit different preferences and lifestyles.
            </motion.p>
          </motion.div>
        </div>

        <div className="flex justify-center pt-6">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-xs font-medium uppercase tracking-[0.34em] text-slate-500 shadow-sm backdrop-blur"
            animate={{ y: [0, 6, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
            Scroll for more
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
              Good Sex Is Based On <span className="font-black">Trust</span>
            </h2>
            <div
              ref={trustRef}
              className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-[28px] border border-slate-200/70 bg-white shadow-[0_20px_50px_-35px_rgba(15,23,42,0.22)]"
            >
              <motion.div
                className="relative aspect-[16/9] w-full"
                initial={{ opacity: 0, scale: 1.04, y: 8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.3 }}
                style={{ y: trustImageY, scale: trustImageScale }}
              >
                <Image
                  src="/images/Products/ritex/trust.png"
                  alt="Trust illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </motion.div>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              Tingling erotic excitement, sensual experiences, tender
              togetherness - sex has many facets.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              But for the most pleasurable thing in the world to feel free and
              liberating, there must be trust as well – trust in each other and
              trust in the contraceptive.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
              At <strong>Ritex</strong>, we're the experts when it comes to
              passionate intimacy. It&apos;s more than 75 years now since we
              first started manufacturing condoms and lubricants in premium
              “made in Germany” quality – so that lovers can surrender to life’s
              sensual moments, secure in their safety.
            </p>
          </motion.div>
          <motion.div className="mt-10 text-center" variants={reveal}>
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
              Feel The <span className="font-black">Difference</span>
            </h2>
          </motion.div>
          {/* Carousel Section */}
          <motion.div className="mt-8 relative" variants={reveal}>
            {/* Carousel Container */}
            <div
              ref={carouselViewportRef}
              className={`overflow-hidden px-2 py-2 sm:px-4 sm:py-4 ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}`}
              style={{ touchAction: "pan-y" }}
            >
              <motion.div
                className={`flex gap-6 ${
                  isDragging
                    ? "transition-none"
                    : "transition-transform duration-500 ease-out"
                }`}
                style={{
                  transform: `translateX(calc(-${currentIndex * (100 / itemsPerView + 2.4)}% + ${dragOffset}px))`,
                }}
                onWheel={handleWheel}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
              >
                {mazagotonProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    className={`group relative overflow-hidden rounded-[32px] ${pastelColors[index]} h-[550px] cursor-pointer flex-shrink-0 shadow-lg`}
                    style={{ width: `calc(25% - 1.5rem)` }}
                    variants={reveal}
                    custom={0.12 + index * 0.08}
                    whileHover={{
                      scale: 1.05,
                      y: -12,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {/* Card Background Glow on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Background Image */}
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

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/5 to-transparent" />

                    {/* Content - Positioned at top and bottom */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                      {/* Top Section */}
                      <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <p className="text-xs font-medium tracking-[0.12em] text-slate-700 uppercase">
                          Ritex Condom
                        </p>
                        <h3 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-[-0.03em] text-slate-900 leading-tight">
                          {product.name}
                        </h3>
                      </motion.div>

                      {/* Bottom Section */}
                      <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {/* Plus Button */}
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
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={handlePrev}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition-all hover:bg-slate-50 hover:border-slate-300"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6 text-slate-900" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "w-8 bg-slate-900"
                        : "w-2 bg-slate-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition-all hover:bg-slate-50 hover:border-slate-300"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6 text-slate-900" />
              </button>
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
                  Ritex Condom Specs
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
                  <p
                    className={`mt-4 rounded-2xl px-4 py-3 text-sm leading-6 text-slate-700 ${activeProductColor}`}
                  >
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
