"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

export default function ComingSoonPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  const reveal = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
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
        <motion.div
          ref={heroRef}
          className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.08,
              },
            },
          }}
        >
          <motion.div
            className="mx-auto flex max-w-4xl flex-col items-center text-center"
            variants={reveal}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
              variants={reveal}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Coming Soon
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-7xl"
              variants={reveal}
            >
              Excellence in Development
            </motion.h1>

            <motion.div
              className="mx-auto mt-8 h-px w-24 origin-center bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              variants={reveal}
              initial={{ opacity: 0, scaleX: 0.6 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const }}
              viewport={{ once: true, amount: 0.2 }}
            />

            <motion.p
              className="mx-auto mt-8 max-w-3xl text-[0.98rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
              variants={reveal}
            >
              At Willi Med, innovation is part of our excellence code. Our
              pipeline includes promising healthcare solutions currently under
              development, reflecting our commitment to quality, science, and
              patient care. More details will be available soon
            </motion.p>
            <div className="relative my-12">
              <div className="absolute -left-16 top-6 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl" />
              <div className="absolute -right-12 bottom-6 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
              <motion.div
                className="group mx-auto max-w-2xl overflow-hidden rounded-[34px]"
                variants={reveal}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <motion.div style={{ y: imageY, scale: imageScale }}>
                  <Image
                    src="/images/coming_soon.png"
                    alt="Willi Med team member portrait"
                    width={2481}
                    height={3508}
                    className="object-cover scale-[1.1]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
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
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
