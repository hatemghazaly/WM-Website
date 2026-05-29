"use client";

import Link from "next/link";
import { useState } from "react";

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
    tagline: "Build reliable access to quality medicines.",
    summary: "Manufacture and import essential products with scientific rigor.",
    body: "Our mission at Willi Med, as an emerging pharmaceutical company, is dedicated to manufacturing high quality generic medications and importing crucial products to our region, We are committed to excellence in every step of our roadmap,  starting with providing our patients with high-quality medications through scientific collaboration with healthcare professionals (HCPs) to ensure their patient's satisfaction and effectively manage their diseases. By utilizing our main asset, our team of highly educated and dedicated individuals at Willi Med,  we  strive for excellence  and aim to improve the quality of life for our patients., Join us on our scientific and humanitarian journey of excellence.",
  },
  Vision: {
    accent: "text-sky-700",
    softAccent: "from-sky-400 to-sky-600",
    tagline: "Become the region's most trusted pharmaceutical partner.",
    summary: "Deliver effective, high-quality products that improve outcomes.",
    body: "Our vision is to be the most trusted regional pharmaceutical company, supplying healthcare providers with effective high-quality products that support disease control and patient satisfaction.",
  },
  Values: {
    accent: "text-amber-700",
    softAccent: "from-amber-400 to-amber-600",
    tagline: "Lead with safety, transparency, and collaboration.",
    summary:
      "Put patients first, stay scientifically disciplined, and build partnerships.",
    body: "We prioritize safety, transparency, and collaboration in everything we do. These values keep us grounded as we grow and help us deliver meaningful impact across every step of our work.",
  },
};

export default function AboutUsPage() {
  const [selected, setSelected] = useState<Section>("Mission");

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-14">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-950">
            Mission, Vision, Values
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            The three core pillars that guide our company and shape every
            decision we make.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 bg-white rounded-[40px] shadow-xl divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setSelected("Mission")}
            className={`py-10 px-6 text-center transition ${selected === "Mission" ? "bg-slate-100" : "hover:bg-slate-50"}`}
          >
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
          </button>

          <button
            type="button"
            onClick={() => setSelected("Vision")}
            className={`py-10 px-6 text-center transition ${selected === "Vision" ? "bg-slate-100" : "hover:bg-slate-50"}`}
          >
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
          </button>

          <button
            type="button"
            onClick={() => setSelected("Values")}
            className={`py-10 px-6 text-center transition ${selected === "Values" ? "bg-slate-100" : "hover:bg-slate-50"}`}
          >
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
          </button>
        </div>

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
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-slate-950 px-10 py-4 text-lg font-semibold text-white transition hover:bg-slate-800"
          >
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
