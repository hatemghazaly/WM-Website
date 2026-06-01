"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon, Mail, X } from "lucide-react";

type Person = {
  name: string;
  role: string;
  label: string;
  bio: string;
  image: string;
  email: string;
  avatarOffsetX?: string;
  linkedin: string;
  twitter: string;
};

const teamFallbackImage = "/images/team/vacant-char.png";

const management: Person[] = [
  {
    name: "Dr. Hatem El-Ghazaly",
    role: "Chief Executive Officer",
    label: "Zarzadu",
    bio: "Meet our Zarzadu Founder and CEO, Hatem El-Ghazaly.Hatem, the heart and vision behind Willi Med. With a blend of strategic brilliance and down-to-earth charm, he leads our team with purpose, passion, and an unwavering belief in people. He is the kind of leader who makes everyone feel seen, heard, and empowered. With his strategic guidance, the company is poised to achieve remarkable milestones, emphasizing operational excellence and fostering a collaborative culture that supports long-term success.",
    image: "/images/team/Hatem.png",
    email: "hghazaly@willimed.com",
    linkedin: "https://www.linkedin.com/in/hatem-el-ghazaly-05981219/",
    twitter: "https://twitter.com",
  },
  {
    name: "Dr. Eman El Nabrawy",
    role: "Business Unit Manager",
    label: "Boss Lady",
    bio: "Leads business direction with a focus on growth, coordination, and effective delivery.",
    image: "/images/team/Eman.png",
    email: "eman@wmwebsite.com",
    avatarOffsetX: "-4px",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Dr. Ibtihal Abd Elhameed",
    role: "Developer",
    label: "Code Architect",
    bio: "Focuses on building reliable digital experiences with clean, practical implementation.",
    image: "/images/team/Ibtihal.png",
    email: "ibtihal@wmwebsite.com",
    avatarOffsetX: "-2px",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },

  {
    name: "Shahd Awad",
    role: "HR Manager",
    label: "Headhunter",
    bio: "Supports people operations and helps build a positive, organized team culture.",
    image: "/images/team/Shahd-Awad.png",
    email: "shahd@wmwebsite.com",
    avatarOffsetX: "12px",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Ahmed El Nawawy",
    role: "Accountant",
    label: "Budget Boss",
    bio: "Handles financial clarity, accuracy, and day-to-day accounting support.",
    image: "/images/team/Nawawi.png",
    email: "ahmed.nawawy@wmwebsite.com",
    avatarOffsetX: "-4px",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Dr. Ahmed El Shahat",
    role: "Supply Chain Manager",
    label: "Linker",
    bio: "Coordinates supply chain operations and supports smooth operational flow.",
    image: "/images/team/Elshahat.png",
    email: "ahmed.shahat@wmwebsite.com",
    avatarOffsetX: "-2px",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  {
    name: "Vacant",
    role: "Product Manager Needed",
    label: "For Sale",
    bio: "This role is currently open.",
    image: "/images/team/vacant-char.png",
    email: "careers@wmwebsite.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
];

export default function AboutPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const selectedPerson = management[activeIndex];

  const scrollCarousel = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) {
      return;
    }

    const amount =
      direction === "left"
        ? -container.clientWidth * 0.7
        : container.clientWidth * 0.7;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <section className="relative overflow-hidden bg-transparent px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-sky-200/28 blur-3xl" />
        <div className="absolute right-[-10%] top-[15%] h-[420px] w-[420px] rounded-full bg-emerald-200/18 blur-3xl" />
        <div className="absolute bottom-[-16%] left-[18%] h-[420px] w-[420px] rounded-full bg-slate-200/40 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <div className="rounded-[42px] border border-white/70 bg-white/75 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl">
          <div className="relative overflow-hidden rounded-[42px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
            <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0.10)_32%,transparent_72%)] blur-3xl animate-glow-slow" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

            <div className="relative mx-auto max-w-4xl text-center">
              <p className="mb-6 inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
                Leadership
              </p>

              <h1 className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
                Meet Our Leaders
              </h1>

              <div className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

              <p className="mx-auto mt-10 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl">
                A team built around clarity, calm, and execution. Every leader
                here plays a role in shaping the way Willi Med moves forward.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={() => scrollCarousel("left")}
                className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-white sm:inline-flex"
                aria-label="Scroll team left"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>

              <div
                ref={carouselRef}
                className="flex w-full gap-2 overflow-x-auto scroll-smooth py-10 px-1 lg:gap-1 lg:py-8"
              >
                {management.map((person, index) => {
                  const selected = index === activeIndex;

                  return (
                    <button
                      key={person.name}
                      type="button"
                      onClick={() => {
                        setActiveIndex(index);
                        setIsModalOpen(true);
                      }}
                      className="group relative flex-shrink-0 overflow-visible rounded-[32px] bg-transparent text-left transition-transform duration-300 ease-out focus:outline-none hover:-translate-y-2"
                      style={{ width: 250 }}
                    >
                      <div className="relative flex h-full min-h-[430px] flex-col items-center justify-end p-2">
                        <div className="relative h-[388px] w-full">
                          <div
                            aria-hidden="true"
                            className="absolute bottom-0 left-1/2 h-24 w-64 -translate-x-1/2 transition-transform duration-300 group-hover:scale-105"
                          >
                            <span className="absolute bottom-0 left-1/2 h-6 w-56 -translate-x-1/2 rounded-full bg-slate-900/10 blur-2xl" />
                            <span
                              className={`absolute bottom-2 left-1/2 z-0 h-7 w-56 -translate-x-1/2 rounded-full border transition-colors duration-300 shadow-[0_8px_14px_rgba(15,23,42,0.05)] ${
                                selected
                                  ? "border-amber-200/70 bg-[#F8E3A6]"
                                  : "border-slate-200 bg-white/92 group-hover:border-amber-200/60 group-hover:bg-[#F8E8C0]"
                              }`}
                            />
                            <span className="absolute left-1/2 top-[78%] z-20 -translate-x-1/2 -translate-y-1/2 w-[86px] rounded-full bg-[#fff7df]/80 px-2 py-1 text-center text-[9px] font-semibold uppercase tracking-[0.16em] leading-[1.05] text-amber-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)] backdrop-blur-sm">
                              {person.label}
                            </span>
                          </div>

                          <motion.img
                            src={person.image}
                            alt={person.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            style={
                              {
                                "--avatar-offset-x":
                                  person.avatarOffsetX ?? "0px",
                              } as CSSProperties
                            }
                            onError={(event) => {
                              event.currentTarget.src = teamFallbackImage;
                            }}
                            className={`absolute bottom-5 left-1/2 z-10 h-[360px] w-full translate-x-[calc(-50%_+_var(--avatar-offset-x))] origin-bottom object-contain transition-transform duration-300 ease-out will-change-transform ${
                              selected
                                ? "scale-[1.12] -translate-y-3 drop-shadow-[0_28px_44px_rgba(245,158,11,0.22)]"
                                : "scale-100 -translate-y-3 opacity-95 group-hover:scale-[1.05]"
                            }`}
                          />
                          {selected ? (
                            <span
                              aria-hidden="true"
                              className="absolute bottom-1 left-1/2 h-[240px] w-[300px] -translate-x-1/2 rounded-full bg-amber-200/18 blur-3xl"
                            />
                          ) : null}
                        </div>

                        <div className="mt-3 text-center">
                          <span className="block text-sm font-semibold text-slate-900">
                            {person.name}
                          </span>
                          <span className="block text-xs text-slate-500">
                            {person.role}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => scrollCarousel("right")}
                className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/80 text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-white sm:inline-flex"
                aria-label="Scroll team right"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="grid w-[min(92vw,1100px)] overflow-hidden rounded-[32px] bg-white shadow-[0_40px_120px_rgba(15,23,42,0.35)] md:grid-cols-[1.1fr_0.9fr]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex items-center justify-center bg-slate-50 p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.16),transparent_58%)]" />
                <span
                  aria-hidden="true"
                  className="absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-yellow-300/50 blur-3xl"
                />
                <motion.img
                  key={selectedPerson.name}
                  src={selectedPerson.image}
                  alt={selectedPerson.name}
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onError={(event) => {
                    event.currentTarget.src = teamFallbackImage;
                  }}
                  className="relative z-10 h-[520px] w-full object-contain"
                />
              </div>

              <div className="relative p-8 sm:p-10">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  aria-label="Close team member popup"
                >
                  <X className="h-5 w-5" />
                </button>

                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Team member
                </p>
                <h2 className="mt-3 text-4xl font-black tracking-[-0.04em] text-slate-950">
                  {selectedPerson.name}
                </h2>
                <p className="mt-2 text-base font-medium text-slate-500">
                  {selectedPerson.role}
                </p>

                <p className="mt-6 text-sm leading-7 text-slate-600">
                  {selectedPerson.bio.split("Zarzadu").map((part, idx, arr) =>
                    idx === arr.length - 1 ? (
                      <Fragment key={idx}>{part}</Fragment>
                    ) : (
                      <Fragment key={idx}>
                        {part}
                        <strong>Zarzadu</strong>
                      </Fragment>
                    ),
                  )}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href={selectedPerson.linkedin}
                    target="_blank"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-4 w-4 text-[#0A66C2]"
                    >
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.41v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.29 2.39 4.29 5.5v6.24ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
                    </svg>
                  </Link>
                  <Link
                    href={`mailto:${selectedPerson.email}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
