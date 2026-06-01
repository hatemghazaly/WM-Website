"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  MapPinned,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";

type HubCard = {
  title: string;
  href: string;
  description: string;
  icon: ReactNode;
  gradient: string;
};

const hubCards: HubCard[] = [
  {
    title: "About Us",
    href: "/about_us",
    description:
      "Read the story behind Willi Med, our mission, and the way we work across Poland and Egypt.",
    icon: <Building2 className="h-5 w-5" />,
    gradient: "from-sky-500/15 via-white to-white",
  },
  {
    title: "Products",
    href: "/products",
    description:
      "Explore featured product lines and find the best starting point for your search.",
    icon: <Sparkles className="h-5 w-5" />,
    gradient: "from-emerald-500/15 via-white to-white",
  },
  {
    title: "Where to Buy",
    href: "/where_to_buy",
    description:
      "Visit official online stores and trusted offline pharmacies and retail partners.",
    icon: <ShoppingBag className="h-5 w-5" />,
    gradient: "from-amber-500/15 via-white to-white",
  },
  {
    title: "Career",
    href: "/careers/open_vacancies",
    description:
      "See available roles and join a team that values quality, focus, and growth.",
    icon: <Users className="h-5 w-5" />,
    gradient: "from-violet-500/15 via-white to-white",
  },
  {
    title: "B2B",
    href: "/b2b/pharmaoverseas",
    description:
      "Review our business partnerships and distribution channels across the region.",
    icon: <MapPinned className="h-5 w-5" />,
    gradient: "from-cyan-500/15 via-white to-white",
  },
  {
    title: "Contact Us",
    href: "/contact",
    description:
      "Reach the team directly if you need help choosing a store, product, or partner.",
    icon: <BadgeCheck className="h-5 w-5" />,
    gradient: "from-rose-500/15 via-white to-white",
  },
];

const highlights = [
  {
    title: "Polish-Egyptian presence",
    description: "Built to serve customers and partners across two markets.",
  },
  {
    title: "Healthcare + software",
    description: "A dual focus that combines scientific and digital strength.",
  },
  {
    title: "Trusted channels",
    description: "We direct visitors to official stores and reliable partners.",
  },
];

const reveal = {
  hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
    },
  },
} as const;

export default function Home() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-emerald-100/75 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[18%] h-80 w-80 rounded-full bg-amber-100/80 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="overflow-hidden rounded-[42px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)]"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.05,
              },
            },
          }}
        >
          <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
            <div className="px-6 py-10 sm:px-10 lg:px-14 lg:py-16">
              <motion.div className="max-w-3xl" variants={reveal}>
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
                  Willi Med Group
                </div>

                <h1 className="mt-6 text-5xl font-semibold tracking-[-0.07em] text-slate-950 sm:text-6xl lg:text-7xl">
                  A clear starting point for everything Willi Med.
                </h1>

                <p className="mt-6 max-w-2xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl">
                  This is the place to move quickly between our company story,
                  product pages, store locator, business partnerships, careers,
                  and support channels.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.6)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Explore Products
                  </Link>
                  <Link
                    href="/where_to_buy"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Where to Buy
                  </Link>
                </div>

                <div className="mt-10 grid gap-3 sm:grid-cols-3">
                  {highlights.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm"
                    >
                      <p className="text-sm font-semibold text-slate-950">
                        {item.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="relative min-h-[360px] lg:min-h-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.94),transparent_42%),linear-gradient(180deg,rgba(148,163,184,0.08),rgba(15,23,42,0.02))]" />
              <div className="relative flex h-full items-center justify-center p-6 sm:p-10 lg:p-12">
                <motion.div
                  className="relative w-full max-w-xl overflow-hidden rounded-[34px] border border-white/80 bg-white/80 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
                  variants={reveal}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_34%)]" />
                  <div className="relative p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/wm_logo.png"
                        alt="Willi Med logo"
                        width={160}
                        height={64}
                        className="h-10 w-auto object-contain"
                        priority
                      />
                      <div className="h-px flex-1 bg-gradient-to-r from-slate-300 to-transparent" />
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[28px] border border-slate-200/70 bg-white/90">
                      <Image
                        src="/images/egypt-poland.jpg"
                        alt="Willi Med group visual"
                        width={2481}
                        height={3508}
                        className="h-auto w-full object-contain"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        priority
                      />
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                          Focus
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          Healthcare and digital growth
                        </p>
                      </div>
                      <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4">
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                          Access
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-950">
                          Official routes only
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-10 sm:px-10 lg:px-14">
            <motion.div
              className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.08,
                  },
                },
              }}
            >
              {hubCards.map((card) => (
                <motion.div key={card.title} variants={reveal}>
                  <Link
                    href={card.href}
                    className="group block h-full overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/85 p-6 shadow-[0_18px_45px_-34px_rgba(15,23,42,0.28)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_-36px_rgba(15,23,42,0.36)]"
                  >
                    <div
                      className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200/70 bg-gradient-to-br ${card.gradient} text-slate-900`}
                    >
                      {card.icon}
                    </div>

                    <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                      Open page
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-8 overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/80 p-6 shadow-sm"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={reveal}
            >
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                    Need help?
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    We can guide you to the right page fast.
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                    If you are looking for a store, a product line, a job
                    opening, or a partnership route, the links below are the
                    quickest way in.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/meet_our_leaders"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
                  >
                    Meet Leaders
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.6)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
