"use client";

import { Apple, ArrowUpRight, LockKeyhole, Mail, QrCode } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

type AccessCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: typeof Mail;
  tone: string;
  logoSrc?: string;
  logoAlt?: string;
};

type DownloadCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: typeof Apple;
  tone: string;
  qrLabel: string;
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
    logoSrc: "/images/employees_section/email_logo.png",
    logoAlt: "Business email logo",
  },
  {
    title: "Monkey Task 360",
    description: "Manage your tasks and projects with Monkey Task 360.",
    href: "https://willimed.wm360.info",
    badge: "Secure Access",
    icon: Mail,
    tone: "from-emerald-500/15 via-white to-white",
    logoSrc: "/images/employees_section/monkey_task_logo.png",
    logoAlt: "Monkey Task logo",
  },
];

const downloadCards: DownloadCard[] = [
  {
    title: "Download on the App Store",
    description:
      "Get Monkey Task on your iPhone or iPad and sign in with your employee access.",
    href: "https://apps.apple.com/eg/app/monkey-task/id6761862370",
    badge: "iOS App",
    icon: Apple,
    tone: "from-slate-950/10 via-white to-white",
    qrLabel: "Scan for App Store",
  },
  {
    title: "Get it on Google Play",
    description:
      "Install Monkey Task on your Android phone or tablet in a few taps.",
    href: "https://play.google.com/store/apps/details?id=monkey.willimed.com&pcampaignid=web_share",
    badge: "Android App",
    icon: AndroidLogo,
    tone: "from-emerald-500/15 via-white to-white",
    qrLabel: "Scan for Google Play",
  },
];

function AndroidLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M17.6 9.2c.1-.3.2-.6.2-1 0-1.8-1.5-3.3-3.3-3.3h-.3l1-1.7c.1-.2.1-.4-.1-.5-.2-.1-.4-.1-.5.1l-1.1 1.9c-.8-.3-1.6-.4-2.4-.4s-1.7.1-2.4.4L7.6 2.8c-.1-.2-.4-.3-.5-.1-.2.1-.2.3-.1.5l1 1.7h-.3c-1.8 0-3.3 1.5-3.3 3.3 0 .4.1.7.2 1C3 9.9 2 11.4 2 13.2c0 2 1.6 3.6 3.6 3.6h.9v2.1c0 1.2 1 2.1 2.1 2.1s2.1-.9 2.1-2.1v-2.1h1.6v2.1c0 1.2 1 2.1 2.1 2.1s2.1-.9 2.1-2.1v-2.1h.9c2 0 3.6-1.6 3.6-3.6 0-1.8-1-3.3-2.4-4zM8.1 5.9c.7-.3 1.4-.5 2.2-.5s1.5.2 2.2.5c.2.1.3.3.2.5-.1.2-.3.3-.5.2-.6-.3-1.2-.4-1.8-.4s-1.3.1-1.8.4c-.2.1-.4 0-.5-.2-.1-.2 0-.4.2-.5zm-1.8 6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm11.4 0c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z" />
    </svg>
  );
}

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
    <section className="relative isolate overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-8%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[20%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-16%] left-[18%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <motion.div
          className="mx-auto mb-14 max-w-5xl overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0.10)_32%,transparent_72%)] blur-3xl animate-glow-slow" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

          <motion.div
            className="relative mx-auto max-w-4xl text-center"
            variants={reveal}
          >
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
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
              className="mx-auto mt-8 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
              variants={reveal}
            >
              A secure, polished gateway for Willimedians to reach the internal
              tools they use every day.
            </motion.p>

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
              {accessCards.map((card) => (
                <motion.a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={card.title}
                  className="group relative flex aspect-square min-h-[300px] items-center justify-center overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/92 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.28)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(15,23,42,0.35)] sm:min-h-[330px]"
                  variants={reveal}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.tone}`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_42%)]" />

                  <div className="relative flex h-full w-full flex-col">
                    <div className="relative flex flex-1 items-center justify-center p-7 sm:p-9">
                      <div className="absolute inset-0 p-7 sm:p-9">
                        <Image
                          src={card.logoSrc ?? "/images/wm_logo.png"}
                          alt={card.logoAlt ?? card.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-contain object-center transition duration-300 group-hover:scale-[1.02]"
                          priority
                        />
                      </div>

                      <div className="absolute right-4 top-4 rounded-full border border-white/70 bg-white/85 px-3 py-2 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <ArrowUpRight className="h-4 w-4 text-slate-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            Open
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/70 bg-white/92 px-4 py-4 sm:px-5 sm:py-5">
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                        {card.badge}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,250,252,0.95))] p-6 shadow-[0_18px_50px_-35px_rgba(15,23,42,0.22)] sm:p-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={reveal}
        >
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
              Monkey Task App
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
              Download the mobile app
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Use the links below for the official iOS and Android apps, or scan
              the QR codes to open the store page instantly on your phone.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {downloadCards.map((card) => {
              const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(card.href)}`;

              return (
                <a
                  key={card.title}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={card.title}
                  className="relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.3)]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.tone}`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_40%)]" />

                  <div className="relative flex h-full flex-col gap-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4 text-left">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/80 bg-white/90 text-slate-900 shadow-sm">
                          {card.icon === Apple ? (
                            <Apple className="h-6 w-6" />
                          ) : (
                            <AndroidLogo className="h-6 w-6" />
                          )}
                        </div>
                        <div>
                          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                            {card.badge}
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-950">
                            {card.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 bg-white/90 text-slate-500">
                        <QrCode className="h-4 w-4" />
                      </div>
                    </div>

                    <p className="max-w-lg text-left text-sm leading-7 text-slate-600">
                      {card.description}
                    </p>

                    <div className="grid gap-4 md:grid-cols-[auto_1fr] md:items-center">
                      <div className="flex justify-center">
                        <div className="rounded-[22px] border border-slate-200 bg-white p-3 shadow-sm">
                          <Image
                            src={qrSrc}
                            alt={card.qrLabel}
                            width={176}
                            height={176}
                            className="h-44 w-44 rounded-[18px]"
                            unoptimized
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.6)]">
                          Open store link
                          <ArrowUpRight className="h-4 w-4" />
                        </span>
                        <p className="text-xs leading-6 text-slate-500">
                          Scan the QR code above if you are already on your
                          phone.
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
