"use client";

import { ArrowUpRight, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

type AccessCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: typeof Mail;
  tone: string;
};

const accessCards: AccessCard[] = [
  {
    title: "Willi Med's Business Email",
    description:
      "Access your Willi Med email account for seamless communication and collaboration.",
    href: "https://mail.willimed.com",
    badge: "Email Access",
    icon: Mail,
    tone: "from-sky-500/15 via-white to-white",
  },
  {
    title: "Monkey Task 360",
    description: "Manage your tasks and projects with Monkey Task 360.",
    href: "https://willimed.wm360.info",
    badge: "Secure Access",
    icon: ShieldCheck,
    tone: "from-emerald-500/15 via-white to-white",
  },
];

export default function EmployeesSectionPage() {
  const reveal = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
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
        <div className="absolute left-[-10%] top-[-8%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[20%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-16%] left-[18%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="overflow-hidden rounded-[42px] border border-white/70 bg-white/75 shadow-[0_30px_90px_-40px_rgba(15,23,42,0.35)] backdrop-blur-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="px-6 py-10 sm:px-8 lg:px-10 lg:py-12">
            <motion.div className="mx-auto max-w-4xl text-center">
              <motion.div
                className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
                variants={reveal}
              >
                <LockKeyhole className="h-3.5 w-3.5" />
                Private Access
              </motion.div>

              <motion.h1
                className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
                variants={reveal}
              >
                Employee&apos;s Section
              </motion.h1>

              <motion.div
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                variants={reveal}
              />

              <motion.p
                className="mx-auto mt-10 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
                variants={reveal}
              >
                For Willimedians only. A clean, secure gateway to the tools your
                team uses every day.
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.08,
                    delayChildren: 0.1,
                  },
                },
              }}
            >
              {["Fast access", "Internal tools", "Secure portals"].map(
                (item) => (
                  <motion.span
                    key={item}
                    className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm"
                    variants={reveal}
                  >
                    {item}
                  </motion.span>
                ),
              )}
            </motion.div>

            <motion.div
              className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.12,
                  },
                },
              }}
            >
              {accessCards.map((card) => {
                const Icon = card.icon;

                return (
                  <motion.a
                    key={card.title}
                    href={card.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group relative overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/88 p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(15,23,42,0.4)] sm:p-7"
                    variants={reveal}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.tone}`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_42%)]" />

                    <div className="relative flex h-full flex-col justify-between gap-8">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/90 text-slate-900 shadow-sm">
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="text-left">
                            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                              {card.badge}
                            </p>
                            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2rem]">
                              {card.title}
                            </h2>
                          </div>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/90 text-slate-500 transition group-hover:border-slate-300 group-hover:text-slate-900">
                          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </div>
                      </div>

                      <p className="max-w-md text-left text-sm leading-7 text-slate-600 sm:text-base">
                        {card.description}
                      </p>

                      <div className="flex items-center justify-between border-t border-white/80 pt-4">
                        <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                          Open portal
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                          Continue
                        </span>
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
