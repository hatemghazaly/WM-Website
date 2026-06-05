"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Section = "Mission" | "Vision" | "Values";

interface SectionData {
  accent: string;
  softAccent: string;
  tagline: string;
  summary: string;
  body: string;
}

const sections: Record<Section, SectionData> = {
  Mission: {
    accent: "text-emerald-700",
    softAccent: "from-emerald-400 to-emerald-600",
    tagline: "Where Excellence Becomes Care",
    summary: "",
    body: `Our mission at Willi Med,  as an emerging pharmaceutical company, is dedicated to manufacturing high quality generic medications and importing crucial products to our region. We are committed to excellence in every step of our roadmap,  starting with providing our patients with high-quality medications through scientific collaboration with healthcare professionals "HCPs" to ensure their patient's satisfaction and effectively managing their diseases.
By utilizing our main asset, our team of highly educated and dedicated individuals at Willi Med,  we  strive for excellence  and aim to improve the quality of life for our patients.
Join us on our scientific and humanitarian journey of excellence.`,
  },
  Vision: {
    accent: "text-sky-700",
    softAccent: "from-sky-400 to-sky-600",
    tagline: "A Vision of Excellence, A Future of Care.",
    summary: "",
    body: "Our Vision is to be the most trusted regional pharmaceutical company which supplies healthcare providers with effective high quality products to control disease and achieve patients and customers satisfaction.",
  },
  Values: {
    accent: "text-amber-700",
    softAccent: "from-amber-400 to-amber-600",
    tagline: "Excellence Guided by Integrity.",
    summary: "",
    body: "We prioritize excellence, integrity, patient focus and collaboration in everything we do. These core values guide our decisions, shape our culture and drive our commitment to delivering high-quality healthcare solutions. By upholding the highest standards, acting with transparency and responsibility, putting patients at the heart of our efforts, and fostering strong partnerships, we create meaningful impact across every step of our work and contribute to healthier communities.",
  },
};

export default function AboutUsPage() {
  const [selected, setSelected] = useState<Section>("Mission");
  const [jumpOpen, setJumpOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLButtonElement>(null);
  const visionRef = useRef<HTMLButtonElement>(null);
  const valuesRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [28, -28]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.98, 1.02]);

  const reveal = {
    hidden: {
      opacity: 0,
      y: 22,
      filter: "blur(8px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
      },
    },
  };

  const scrollToSection = (section: Section) => {
    setSelected(section);
    setJumpOpen(false);

    const targetRef =
      section === "Mission"
        ? missionRef
        : section === "Vision"
          ? visionRef
          : valuesRef;

    targetRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
        {/* Hero*/}
        <div className="relative mb-14 overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)] inset-0 -z-10" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed inset-0 -z-10" />
          <motion.div
            ref={heroRef}
            className="relative mx-auto max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
                variants={reveal}
              >
                Polish - Egyptian Presence
              </motion.div>
              <motion.h1
                className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
                variants={reveal}
              >
                Who We Are?!
              </motion.h1>
              <motion.div
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                variants={reveal}
              />

              <div className="mx-auto mt-10 space-y-8">
                <motion.p
                  className="mx-auto max-w-3xl text-center text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
                  variants={reveal}
                >
                  Willi Med Group is a dynamic Polish–Egyptian organization
                  operating through two specialized divisions: Healthcare and
                  Software Development. Through these complementary sectors, we
                  combine scientific excellence, innovation and technology to
                  create meaningful values for patients, healthcare
                  professionals and businesses.
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
                        src="/images/egypt-poland.jpg"
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

                <motion.p
                  className="mx-auto max-w-3xl text-center text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
                  variants={reveal}
                >
                  Our healthcare division, Willi Med for Pharmaceutical
                  Industries, serves a wide range of therapeutic areas,
                  including Central Nervous System disorders, Diabetes,
                  Cardiovascular Health, Primary Care, Men&apos;s Health,
                  Women&apos;s Health, Antiseptics and Food Supplements. We are
                  committed to delivering high-quality healthcare solutions and
                  are proud to act as the sole agent for selected leading
                  European healthcare companies.
                </motion.p>
                <motion.p
                  className="mx-auto max-w-3xl text-center text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
                  variants={reveal}
                >
                  Our technology division focuses on developing innovative
                  digital solutions that enhance productivity, efficiency and
                  business performance. Among our flagship products is{" "}
                  <strong>Monkey Task 360</strong>, a comprehensive platform
                  designed to streamline operations, improve collaboration and
                  support digital transformation across organizations. By
                  combining healthcare expertise with technological innovation,
                  Willi Med Group continues to build trusted partnerships and
                  create sustainable impact across the industries we serve.
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 bg-white rounded-[40px] shadow-xl divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <button
            ref={missionRef}
            type="button"
            onClick={() => setSelected("Mission")}
            className={`relative flex h-full w-full overflow-hidden px-6 py-10 text-center transition ${selected === "Mission" ? "bg-emerald-50" : "bg-white hover:bg-slate-50"}`}
          >
            <div className="relative z-10 flex w-full flex-col items-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="12" cy="12" r="6" />
                  <line x1="3" y1="12" x2="9" y2="12" />
                  <line x1="15" y1="12" x2="21" y2="12" />
                  <line x1="12" y1="3" x2="12" y2="9" />
                  <line x1="12" y1="15" x2="12" y2="21" />
                </svg>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">
                Mission
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {sections.Mission.summary}
              </p>
            </div>
          </button>

          <button
            ref={visionRef}
            type="button"
            onClick={() => setSelected("Vision")}
            className={`relative flex h-full w-full overflow-hidden px-6 py-10 text-center transition ${selected === "Vision" ? "bg-amber-50" : "bg-white hover:bg-slate-50"}`}
          >
            <div className="relative z-10 flex w-full flex-col items-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 border border-amber-200 text-amber-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">
                Vision
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {sections.Vision.summary}
              </p>
            </div>
          </button>

          <button
            ref={valuesRef}
            type="button"
            onClick={() => setSelected("Values")}
            className={`relative flex h-full w-full overflow-hidden px-6 py-10 text-center transition ${selected === "Values" ? "bg-sky-50" : "bg-white hover:bg-slate-50"}`}
          >
            <div className="relative z-10 flex w-full flex-col items-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 border border-sky-200 text-sky-700">
                <svg
                  viewBox="0 0 24 24"
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2l2.39 4.85 5.35.78-3.87 3.77.92 5.35L12 15.77 6.21 16.75l.92-5.35L3.26 7.63l5.35-.78L12 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-[0.3em] text-slate-900 mb-3">
                Values
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {sections.Values.summary}
              </p>
            </div>
          </button>
        </div>
        {/* Action: Mission, Vision, Values */}
        <div className="mt-10 rounded-[32px] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-4 text-sm uppercase tracking-[0.35em] text-slate-500">
            {selected}
          </div>
          <h2 className="text-3xl font-black text-slate-950 mb-4">
            {sections[selected].tagline}
          </h2>
          <p className="text-base leading-relaxed text-slate-600">
            {sections[selected].body}
          </p>
        </div>{" "}
        {/* Meet Our Leaders  */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/meet_our_leaders"
            className="group inline-flex items-center gap-4 rounded-full border border-slate-200 bg-white/90 px-4 py-3 shadow-[0_18px_42px_-24px_rgba(15,23,42,0.28)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white"
            aria-label="Meet our leaders"
          >
            <div className="flex items-center">
              {[
                "/images/team/Hatem.png",
                "/images/team/Eman.png",
                "/images/team/Shahd-Awad.png",
              ].map((src, index) => (
                <span
                  key={src}
                  className={`relative -ml-3 first:ml-0 flex h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm transition duration-300 group-hover:-translate-y-0.5 ${index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10"}`}
                >
                  <Image
                    src={src}
                    alt="Leader portrait"
                    fill
                    className="object-contain bg-white"
                    sizes="48px"
                  />
                </span>
              ))}
            </div>

            <div className="pr-2 text-left">
              <div className="text-sm font-semibold text-slate-900">
                Meet Our Leaders
              </div>
            </div>
          </Link>
        </div>
        {/* Details of Miison, Vison, Values */}
        <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8">
          {jumpOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
              className="mb-3 w-56 overflow-hidden rounded-[24px] border border-slate-200 bg-white/90 p-2 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.28)] backdrop-blur-md"
            >
              {(["Mission", "Vision", "Values"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => scrollToSection(item)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    selected === item
                      ? "bg-slate-950 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{item}</span>
                  <span className="text-xs uppercase tracking-[0.3em] text-current/60">
                    Jump
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          <button
            type="button"
            onClick={() => setJumpOpen((value) => !value)}
            className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.28)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-slate-50"
            aria-haspopup="menu"
            aria-expanded={jumpOpen}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
              ↗
            </span>
            Jump to section
          </button>
        </div>
      </div>
    </section>
  );
}
