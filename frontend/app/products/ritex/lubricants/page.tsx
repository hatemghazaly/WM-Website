"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const LubricantProducts = [
  {
    name: "Bio Vegan",
    image: "/images/Products/ritex/bio.jpg",
    specs: [
      "Vegan Lubricant.",
      "Water based.",
      "Free from fragrances and colorants, PEG, parabens and other preservatives.",
      "Made from vegan raw materials.",
      "Dermatologically tested.",
      "Ritex BIO vegan protects the sensitive mucous membranes in a natural way.",
      "Suitable for use with all Ritex Condoms.",
      "Aviailable in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Hydro Gel",
    image: "/images/Products/ritex/hydro.jpg",
    specs: [
      "For Sensitive Skin.",
      "Water based.",
      "Free from fragrances and colorants.",
      "Specially designed to match the pH value of the vaginal mucosa.",
      "Dermatologically and Gynaecologically tested.",
      "Suitable for use with all Ritex Condoms.",
      "Aviailable in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Gel Plus",
    image: "/images/Products/ritex/gel_plus.jpg",
    specs: [
      "With Organic Aloe Vera.",
      "Water based.",
      "Free from fragrances and colorants.",
      "pH-neutral.",
      "Dermatologically tested.",
      "Suitable for use with all Ritex Condoms.",
      "Aviailable in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
  {
    name: "Longtime Lubricant",
    image: "/images/Products/ritex/longtime_lub.jpg",
    specs: [
      "Provides Extra Lubrication",
      "Silicone based.",
      "Free from preservatives, fragrances and other additives",
      "Dermatologically tested.",
      "Suitable for use with all Ritex Condoms.",
      "Aviailable in tube of 50 ml.",
      "100% Made in Germany.",
    ],
  },
];

export default function RitexLubricantsPage() {
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
              Extra Pleasure
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Ritex Lubricants
            </h1>
            <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              Ritex lubricants are designed to enhance comfort, intimacy, and
              pleasure while supporting a smooth and enjoyable experience.
              Developed with the same commitment to quality and innovation that
              has defined Ritex since 1948, the range offers solutions tailored
              to different preferences and needs. Whether used to reduce
              friction, enhance comfort, or enrich intimate moments, Ritex
              lubricants help create a more natural and pleasurable experience.
            </p>
          </motion.div>
          <motion.div className="mt-10 text-center" variants={reveal}>
            <h2 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
              For Enhanced{" "}
              <span className="font-black">Pleasure And Passion</span>
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
                  src="/images/Products/ritex/lubricants.jpg"
                  alt="Trust illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </motion.div>
            </div>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Love is ... for trying out something new whenever the fancy takes
              you. Let Ritex lubricants take you on a sensuous journey to the
              furthest shores of your desire.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Our lubes spoil you with erotic massages, sweep you away to new
              pinnacles of lust and smooth the way for variations of play that
              call for enhanced lubrication. Whether you&apos;re talking about a
              passionate duo or an exhilarating solo number, that extra helping
              of moisture will create smoother love play and intensify your
              sensual experience.
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Discomfort from friction or even soreness will become a thing of
              the past. RITEX lubricant is available as a vegan BIO GEL, in a
              particularly sensitive HYDRO variant or as GEL+ formulated with
              aloe vera, which pampers tender skin and is particularly suitable
              for foreplay and massages. The silicone-based LONGTIME creates a
              pleasurable experience that is extra long-lasting and versatile-
              including sensual massages..
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
            {LubricantProducts.map((product) => (
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
                    Ritex Lubricants
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
