"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Link as LinkIcon,
  Mail,
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
  const selectedPerson = management[activeIndex];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % management.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prev) => (prev - 1 + management.length) % management.length,
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#f6f8fc] py-14">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-sky-200/30 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-violet-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="rounded-[36px] border border-slate-200/60 bg-white/75 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
          <div className="grid gap-10 lg:grid-cols-[320px_1.7fr]">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  About Us
                </p>
                <h1 className="mt-4 text-5xl font-black leading-none tracking-[-0.04em] text-slate-950">
                  Our
                  <br />
                  Team
                </h1>
                <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
                  Click a member to learn more about them. Explore our
                  leadership team with a polished avatar row and an emphasis on
                  the selected role.
                </p>
                <div className="mt-6 h-1 w-16 rounded-full bg-sky-400" />
              </div>

              <motion.div
                key={selectedPerson.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Featured leader
                    </p>
                    <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
                      {selectedPerson.name}
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                      {selectedPerson.role}
                    </p>
                  </div>
                  <div className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Leadership
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-600">
                  {selectedPerson.bio}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Link
                    href={selectedPerson.linkedin}
                    target="_blank"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Link>
                  <Link
                    href={selectedPerson.twitter}
                    target="_blank"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="h-4 w-4"
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
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="relative overflow-hidden rounded-[36px] bg-slate-50 p-8">
              <div className="absolute left-[-12%] top-10 h-52 w-52 rounded-full bg-sky-200/30 blur-3xl" />
              <div className="absolute right-0 top-24 h-40 w-40 rounded-full bg-violet-200/20 blur-3xl" />

              <div className="mx-auto max-w-full">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Meet the team
                </p>

                <div className="mt-6 flex w-full items-center justify-center">
                  <div className="flex w-full max-w-6xl items-end justify-start gap-6 overflow-x-auto py-6 px-4">
                    {management.map((person, index) => {
                      const selected = index === activeIndex;
                      return (
                        <button
                          key={person.name}
                          onClick={() => setActiveIndex(index)}
                          className={`relative flex-shrink-0 overflow-hidden rounded-2xl transition-all focus:outline-none ${
                            selected
                              ? "ring-4 ring-sky-300"
                              : "ring-0 hover:scale-105"
                          }`}
                          style={{ minWidth: 180 }}
                        >
                          <motion.img
                            src={person.image}
                            alt={person.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className={`h-[420px] w-[260px] object-cover ${
                              selected
                                ? "shadow-[0_40px_80px_rgba(15,23,42,0.15)] rounded-[36px]"
                                : "opacity-95 rounded-[36px]"
                            }`}
                          />
                          <div className="absolute left-0 right-0 bottom-0 flex flex-col items-start gap-0 bg-gradient-to-t from-black/50 to-transparent px-3 py-2 text-white">
                            <span className="text-sm font-semibold">
                              {person.name}
                            </span>
                            <span className="text-xs opacity-90">
                              {person.role}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Browse avatars
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={prevSlide}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
                    >
                      <ChevronLeftIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-100"
                    >
                      <ChevronRightIcon className="h-5 w-5" />
                    </button>
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
