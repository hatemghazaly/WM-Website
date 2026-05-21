"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Link as LinkIcon,
} from "lucide-react";

type Person = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin: string;
  twitter: string;
};

const management: Person[] = [
  {
    name: "Hatem El-Ghazaly",
    role: "Chief Executive Officer",
    bio: "Visionary leader with a passion for innovation and empowering teams to build impactful digital experiences.",
    image: "/images/team/hatem.png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Maha",
    role: "Head of Operations",
    bio: "Ensures operational excellence and seamless execution across all departments.",
    image: "/images/team/maha.png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Omar",
    role: "Strategy Director",
    bio: "Leads strategic planning and market positioning initiatives.",
    image: "/images/team/omar.png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Nour",
    role: "Marketing Lead",
    bio: "Builds meaningful brand communication and customer engagement.",
    image: "/images/team/nour.png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Sara",
    role: "People & Culture",
    bio: "Creates a supportive and inspiring work environment.",
    image: "/images/team/sara.png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Kareem",
    role: "Finance Manager",
    bio: "Drives financial clarity and sustainable growth strategies.",
    image: "/images/team/kareem.png",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % management.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + management.length) % management.length,
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f8fc] py-10">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="rounded-[36px] border border-slate-200/60 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* LEFT SIDE */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
                  About Us
                </p>

                <h1 className="mt-4 text-5xl font-black leading-none tracking-[-0.04em] text-slate-900">
                  Our
                  <br />
                  Team
                </h1>

                <p className="mt-6 max-w-[200px] text-sm leading-7 text-slate-500">
                  Click on a member to learn more about them.
                </p>

                <div className="mt-6 h-1 w-14 rounded-full bg-sky-400" />
              </div>

              {/* PROFILE CARD */}
              <motion.div
                key={management[activeIndex].name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-10 rounded-[28px] border border-slate-200/60 bg-white p-5 shadow-lg"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {management[activeIndex].name}
                </h3>

                <p className="mt-1 text-sm font-medium text-slate-500">
                  {management[activeIndex].role}
                </p>

                <div className="mt-3 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Leadership
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {management[activeIndex].bio}
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <Link
                    href={management[activeIndex].linkedin}
                    target="_blank"
                    className="rounded-full bg-slate-100 p-2 transition hover:bg-slate-200"
                  >
                    <LinkIcon className="h-4 w-4 text-slate-700" />
                  </Link>

                  <Link
                    href={management[activeIndex].twitter}
                    target="_blank"
                    className="rounded-full bg-slate-100 p-2 transition hover:bg-slate-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-4 w-4 text-slate-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1s-1 .57-2.36.88A4.48 4.48 0 0 0 16.5 0c-2.5 0-4.5 2.1-4.5 4.7 0 .37.04.73.12 1.07C7.69 5.3 4.07 3.4 1.64.8c-.41.7-.64 1.53-.64 2.4 0 1.66.84 3.12 2.12 3.98A4.5 4.5 0 0 1 .96 6v.06c0 2.31 1.62 4.24 3.77 4.68-.34.09-.7.14-1.07.14-.26 0-.51-.02-.76-.07.52 1.6 2.04 2.77 3.83 2.81A9.02 9.02 0 0 1 0 19.54 12.73 12.73 0 0 0 6.92 21c8.3 0 12.84-7.17 12.84-13.39 0-.2 0-.4-.02-.6A9.22 9.22 0 0 0 23 3z"
                      />
                    </svg>
                  </Link>

                  <Link
                    href="mailto:info@wmwebsite.com"
                    className="rounded-full bg-slate-100 p-2 transition hover:bg-slate-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-4 w-4 text-slate-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex items-center justify-center overflow-hidden rounded-[36px] bg-gradient-to-b from-[#f9fbff] to-[#f3f5fa] py-10">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
              >
                <ChevronLeftIcon className="h-5 w-5 text-slate-700" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105"
              >
                <ChevronRightIcon className="h-5 w-5 text-slate-700" />
              </button>

              <div className="flex w-full max-w-4xl items-stretch gap-6 px-8">
                {/* Spotlight */}
                <div className="flex-1 flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={management[activeIndex].name}
                      src={management[activeIndex].image}
                      alt={management[activeIndex].name}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.45 }}
                      className="max-h-[420px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.18)]"
                    />
                  </AnimatePresence>
                </div>

                {/* Thumbnails / Names */}
                <div className="w-56 flex-shrink-0">
                  <div className="space-y-4">
                    {management.map((person, index) => {
                      const selected = index === activeIndex;
                      return (
                        <button
                          key={person.name}
                          onClick={() => setActiveIndex(index)}
                          className={`w-full rounded-lg p-3 text-left transition-shadow hover:shadow-md flex items-start gap-3 ${
                            selected ? "bg-white/80 shadow-lg" : "bg-white/60"
                          }`}
                        >
                          <img
                            src={person.image}
                            alt={person.name}
                            className={`h-20 w-20 rounded-full object-cover flex-shrink-0 ${
                              selected ? "ring-4 ring-amber-200" : ""
                            }`}
                          />

                          <div>
                            <div className="text-sm font-semibold text-slate-900">
                              {person.name.split(" ")[0]}
                            </div>
                            <div className="text-xs text-slate-500">
                              {person.role}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
