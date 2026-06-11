"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { normalizeCareersConfig, type Vacancy } from "@/lib/careers-data";

const leaders = [
  {
    name: "Dr. Hatem El-Ghazaly",
    role: "Chief Executive Officer",
    image: "/images/team/Hatem.png",
  },
  {
    name: "Dr. Eman El Nabrawy",
    role: "Business Unit Manager",
    image: "/images/team/Eman.png",
  },
  {
    name: "Dr. Ibtihal Abd Elhameed",
    role: "Developer",
    image: "/images/team/Ibtihal.png",
  },
] as const;

const timeline = [
  {
    year: "2018",
    title: "Foundation",
    description:
      "Willi Med was founded with a vision to deliver innovative healthcare solutions and create long-term value for patients, healthcare professionals, and partners.",
  },
  {
    year: "2020",
    title: "Ritex Sole Agency & Egyptian Market Launch",
    description:
      "Willi Med became the exclusive agent of German-made Ritex products in Egypt, marking the beginning of a strategic expansion phase and strengthening its position in the healthcare sector.",
  },
  {
    year: "2023",
    title: "Digital Transformation & Growth",
    description:
      "Establishment of the Software Development Division, the launch of Willi D3 as the company's flagship pediatric vitamin D product, and a strategic partnership with Sofico Pharm to strengthen nationwide distribution capabilities.",
  },
  {
    year: "2025",
    title: "Regional Expansion & Innovation",
    description:
      "Launch of Monkey Task 360, the group's software and digital solutions platform, Expansion of distribution operations into the Kingdom of Saudi Arabia, Launch of the Mazagoton product family, and Strategic partnerships with  PharmaOverseas and Egydrug to accelerate market growth and accessibility.",
  },
  {
    year: "2026",
    title: "National Distribution Milestone",
    description:
      "Willi Med entered into a strategic partnership with Ibnsina Pharma, further strengthening nationwide coverage and expanding access to its healthcare portfolio across Egypt.",
  },
] as const;

export default function Home() {
  const reduceMotion = useReducedMotion();
  const [firstVacancy, setFirstVacancy] = useState<Vacancy | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  const timelineReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.05,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.18,
        delayChildren: 0.12,
      },
    },
  } as const;

  const timelineItem = {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.95,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as const;

  const imageMotion = reduceMotion
    ? { initial: { scale: 1 }, animate: { scale: 1 } }
    : {
        initial: { scale: 1.08, y: 8 },
        animate: {
          scale: 1,
          y: 0,
          transition: {
            duration: 1.8,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      };

  useEffect(() => {
    let cancelled = false;

    async function loadFirstVacancy() {
      try {
        const response = await fetch("/api/admin/careers", {
          cache: "no-store",
        });
        const payload = (await response.json()) as unknown;
        const config = normalizeCareersConfig(payload);
        const firstActiveVacancy =
          config.vacancies.find((vacancy) => vacancy.active !== false) ?? null;

        if (!cancelled) {
          setFirstVacancy(firstActiveVacancy);
        }
      } catch {
        if (!cancelled) {
          setFirstVacancy(null);
        }
      }
    }

    loadFirstVacancy();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("home-page");

    return () => {
      document.documentElement.classList.remove("home-page");
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={imageMotion.initial}
          animate={imageMotion.animate}
        >
          <Image
            src="/images/home/home_3.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-100"
            aria-hidden="true"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.78))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_45%)]" />
      </div>

      <section className="relative min-h-screen">
        <motion.div
          className="flex justify-center px-6 pt-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-14"
          initial={{ opacity: 0, y: -14, filter: "blur(8px)" }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
              duration: 1,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          <Image
            src="/images/wm_logo.png"
            alt="Willi Med"
            width={520}
            height={174}
            priority
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 32vw, 24vw"
            className="h-auto w-[45vw] max-w-[520px] drop-shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
          />
        </motion.div>
      </section>

      <motion.section
        className="relative px-6 pb-16 pt-0 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.32 }}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.14,
              delayChildren: 0.12,
            },
          },
        }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="relative rounded-[32px] border border-white/12 bg-white/8 p-6 shadow-[0_22px_60px_-36px_rgba(0,0,0,0.72)] backdrop-blur-2xl sm:p-8 lg:p-10">
            <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_40%)] pointer-events-none" />
            <motion.div
              className="relative max-w-4xl border-l border-white/15 pl-5 sm:pl-7"
              variants={fadeUp}
            >
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-white/45">
                About Willi Med ...
              </p>
              <p className="mt-5 text-2xl font-medium leading-9 text-white/92 sm:text-3xl sm:leading-[1.55] lg:text-[2rem]">
                Willi Med Group is a dynamic Polish-Egyptian organization
                operating through two specialized divisions: Healthcare and
                Software Development. Through these complementary sectors, we
                combine scientific excellence, innovation and technology to
                create meaningful values for patients, healthcare professionals
                and businesses.
              </p>

              <motion.div className="mt-8 flex justify-end" variants={fadeUp}>
                <Link
                  href="/about_us"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative px-6 pb-20 sm:px-8 sm:pb-24 lg:px-10 lg:pb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.08,
            },
          },
        }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="border-t border-white/10 pt-8 sm:pt-10 lg:pt-12">
            <motion.div
              className="flex items-end justify-between gap-6"
              variants={fadeUp}
            >
              <div>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-white/45">
                  Leadership
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                  Meet Our Leaders
                </h2>
              </div>

              <Link
                href="/meet_our_leaders"
                className="hidden rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 sm:inline-flex"
              >
                View All
              </Link>
            </motion.div>

            <motion.div
              className="mt-8 grid gap-5 md:grid-cols-3"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.12,
                  },
                },
              }}
            >
              {leaders.map((leader) => (
                <motion.div
                  key={leader.name}
                  variants={fadeUp}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-black/35"
                >
                  <div className="relative px-4 pt-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[22px] bg-black/25">
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-3 transition duration-700 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.46))]" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-semibold text-white">
                      {leader.name}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{leader.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-8 flex justify-end sm:hidden">
              <Link
                href="/meet_our_leaders"
                className="inline-flex rounded-full border border-white/15 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={{
          hidden: { opacity: 0, y: 24 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.08,
            },
          },
        }}
      >
        <div className="mx-auto max-w-5xl">
          <div className="border-t border-white/10 pt-8 sm:pt-10 lg:pt-12">
            <motion.div className="mb-8" variants={fadeUp}>
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-white/45">
                Careers
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                Vacancy
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
                Join our team and be part of a dynamic organization that values
                innovation, collaboration, and growth.
              </p>
            </motion.div>

            <motion.div
              className="overflow-hidden rounded-[30px] border border-white/10 bg-white/8 shadow-[0_18px_50px_-38px_rgba(0,0,0,0.65)] backdrop-blur-2xl"
              variants={fadeUp}
            >
              {firstVacancy ? (
                <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.3em] text-white/45">
                      {firstVacancy.department || "Open Position"}
                    </p>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
                      {firstVacancy.title}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-white/72 sm:text-base">
                      {firstVacancy.summary}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/70">
                      <span className="inline-flex items-center rounded-full border border-white/12 bg-black/25 px-3 py-2">
                        {firstVacancy.location || "Location to be announced"}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/12 bg-black/25 px-3 py-2">
                        {firstVacancy.type || "Employment type"}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-white/12 bg-black/25 px-3 py-2">
                        {firstVacancy.experience || "Experience required"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 lg:items-end lg:text-right">
                    <Link
                      href={`/careers/apply_now?role=${encodeURIComponent(firstVacancy.title)}`}
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                    >
                      Apply Now
                    </Link>
                    <Link
                      href="/careers/open_vacancies"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black/30"
                    >
                      View All Vacancies
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-6 sm:p-8">
                  <p className="text-sm leading-7 text-white/70">
                    No active vacancy is currently available to preview.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/careers/open_vacancies"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90"
                    >
                      View Open Vacancies
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="relative px-6 pb-10 sm:px-8 sm:pb-12 lg:px-10 lg:pb-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={timelineReveal}
      >
        <div className="mx-auto max-w-5xl">
          <motion.div className="mb-8" variants={fadeUp}>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.38em] text-white/45">
              History
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-white sm:text-4xl">
              Timeline of Growth
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65 sm:text-base">
              A short timeline showing how Willi Med evolved from a focused idea
              into a more structured and diversified organization.
            </p>
          </motion.div>

          <div className="relative pl-6 sm:pl-8">
            <motion.div
              className="absolute left-2 top-2 h-full w-px origin-top bg-gradient-to-b from-white/30 via-white/12 to-transparent sm:left-3"
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div className="space-y-5" variants={timelineReveal}>
              {timeline.map((item) => (
                <motion.div
                  key={item.year}
                  variants={timelineItem}
                  className="relative"
                >
                  <div className="absolute left-[-1.15rem] top-5 h-4 w-4 rounded-full border border-white/20 bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.05)] sm:left-[-1.35rem]" />
                  <div className="rounded-[26px] border border-white/12 bg-white/8 px-5 py-5 shadow-[0_18px_50px_-38px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-6 sm:py-6">
                    <div className="absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_42%)] pointer-events-none" />
                    <div className="relative flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">
                        {item.year}
                      </p>
                      <p className="text-base font-semibold text-white">
                        {item.title}
                      </p>
                    </div>
                    <p className="relative mt-3 max-w-3xl text-sm leading-7 text-white/72 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
