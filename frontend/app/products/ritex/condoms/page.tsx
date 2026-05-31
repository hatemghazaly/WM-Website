"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const condomProducts = [
  {
    name: "RR1",
    image: "/images/Products/ritex/rr1.jpg",
    specs: [
      "Intense Sensations",
      "Ritex RR.1 condoms guarantee a 100% natural experience. The silky soft surface and the sensitive lubricating film create a pleasant feeling on the skin for a particularly intense sensation.",
      "Aviailable in packs of 3 and 10.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "XXL",
    image: "/images/Products/ritex/xxl.jpg",
    specs: [
      "Extra Large",
      "Highly elastic",
      "Intense in sensation",
      "Ritex XXL condoms are coated with extra lubricant to make them easier to use during sex.",
      "Aviailable in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Lust",
    image: "/images/Products/ritex/lust.jpg",
    specs: [
      "Dotted & Ribbed.",
      "Intense stimulation for both partners.",
      "Ritex LUST condoms provide intense sensations with their specially dotted and ribbed structure.",
      "Available in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Feeling",
    image: "/images/Products/ritex/feeling.jpg",
    specs: [
      "Perfect Fit.",
      "Based on the natural shape of the penis.",
      "The contoured shape of the Ritex FEELING condoms provides a particularly intense, skin-tight stimulation.",
      "Available in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Longtime",
    image: "/images/Products/ritex/Longtime.jpg",
    specs: [
      "Make love For longer.",
      "With Double Ring for extra long love play.",
      "free of benzocaine or other anaesthetic additives",
      "Available in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Extra Thin",
    image: "/images/Products/ritex/thin.jpg",
    specs: [
      "For a natural Feel.",
      "For a particularly natural feeling. As natural as Love itself.",
      "Ritex EXTRA THIN are ultra-soft condoms for a natural feeling. The condom is extra thin and particularly intense in sensation.",
      "Available in packs of 3 and 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Ideal",
    image: "/images/Products/ritex/ideal.jpg",
    specs: [
      "Extra Lubricated.",
      "Ritex IDEAL condoms improve lubrication and make sex more relaxed and intense.",
      "Available in packs of 3 and 10.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Mix",
    image: "/images/Products/ritex/mix.jpg",
    specs: [
      "Exciting and varied.",
      "Excitingly different every time! Ritex MIX stands for intense love and more variety.",
      "Available in a pack of 8.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Kondom Automate",
    image: "/images/Products/ritex/ka.jpg",
    specs: [
      "Retro Condom Machine.",
      "40 times variety and Fun.",
      "Added freshness.",
      "It's not just the packaging that's very unusual, the selection of condoms has also been carefully chosen. With the bestsellers from Ritex, you can discover new things. Try them out and enjoy exciting moments",
      "Available in a pack of 40.",
      "100% Made in Germany.",
    ],
  },
];

export default function RitexCondomsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, condomProducts.length - itemsPerView);

  const pastelColors = [
    "bg-rose-100",
    "bg-blue-100",
    "bg-emerald-100",
    "bg-purple-100",
    "bg-orange-100",
    "bg-yellow-100",
    "bg-cyan-100",
    "bg-pink-100",
    "bg-indigo-100",
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

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
              FOR 100% SENSATION
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Ritex Condoms
            </h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              Engineered in Germany since 1948, Ritex condoms combine safety,
              comfort, and innovation to enhance intimate moments while
              providing reliable protection. From ultra-thin and natural-feel
              options to textured and specialty designs, Ritex offers a variety
              of choices to suit different preferences and lifestyles.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 overflow-hidden rounded-[28px] border border-slate-200/70 bg-slate-950 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.45)]"
            variants={reveal}
          >
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/XHfggmObUXM"
                title="Ritex Condoms Video"
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </motion.div>

          <motion.div className="mt-10 text-center" variants={reveal}>
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
              Good Sex Is Based On <span className="font-black">Trust</span>
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
                  src="/images/Products/ritex/trust.png"
                  alt="Trust illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </motion.div>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Tingling erotic excitement, sensual experiences, tender
              togetherness - sex has many facets.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              But for the most pleasurable thing in the world to feel free and
              liberating, there must be trust as well – trust in each other, and
              trust in the contraceptive.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              At Ritex, we’re the experts when it comes to passionate intimacy.
              It&apos;s more than 75 years now since we first started
              manufacturing condoms and lubricants in premium “made in Germany”
              quality – so that lovers can surrender to life’s sensual moments,
              secure in their safety.
            </p>
          </motion.div>

          {/* Carousel Section */}
          <motion.div
            className="mt-8 relative"
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
            {/* Carousel Container */}
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-6 transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView + 2.4)}%)`,
                }}
              >
                {condomProducts.map((product, index) => (
                  <motion.div
                    key={product.name}
                    className={`group relative overflow-hidden rounded-[32px] ${pastelColors[index]} h-[550px] cursor-pointer flex-shrink-0 shadow-lg`}
                    style={{ width: `calc(33.333% - 1.5rem)` }}
                    variants={reveal}
                    whileHover={{
                      scale: 1.05,
                      y: -12,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
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
                          <motion.div
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-400/30 backdrop-blur-sm"
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
                          </motion.div>
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
    </section>
  );
}
