"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Apple, ArrowUpRight, Mail, QrCode, X } from "lucide-react";
import type { ElementType } from "react";

type DownloadIcon = ElementType<{ className?: string }>;

type AccessCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: typeof Mail;
  tone: string;
  logoSrc?: string;
  logoAlt?: string;
  showDownloadPopupButton?: boolean;
};

type DownloadCard = {
  title: string;
  description: string;
  href: string;
  badge: string;
  icon: DownloadIcon;
  tone: string;
  qrLabel: string;
};

const accessCards: AccessCard[] = [
  {
    title: "Willi Med's Business Email",
    description: "Access your Willi Med email account securely from anywhere.",
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
    showDownloadPopupButton: true,
  },
];

const downloadCards: DownloadCard[] = [
  {
    title: "Download on the App Store",
    description: "Install Monkey Task on iPhone or iPad in a few taps..",
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
  const [isDownloadPopupOpen, setIsDownloadPopupOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
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
  } as const;

  useEffect(() => {
    if (!isDownloadPopupOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDownloadPopupOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDownloadPopupOpen]);

  const openExternalLink = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="relative mb-14 overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-14 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

          <motion.div
            ref={heroRef}
            className="relative mx-auto max-w-4xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="text-center">
              <motion.div
                className="mb-6 inline-flex flex-wrap items-center justify-center gap-2"
                variants={reveal}
              >
                {["Fast access", "Internal tools", "Secure portals"].map(
                  (tag) => (
                    <div
                      key={tag}
                      className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur"
                    >
                      {tag}
                    </div>
                  ),
                )}
              </motion.div>

              <motion.h1
                className="text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
                variants={reveal}
              >
                Employee&apos;s Section
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
                  A secure gateway for Willimedians to reach the internal tools
                  they use every day.
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
                        src="/images/secure_gateway.png"
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
              </div>
            </div>
          </motion.div>

          <motion.div
            className="t-10 mx-auto max-w-5xl grid gap-8 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {accessCards.map((card, index) => {
              const cardColors = ["bg-sky-100", "bg-emerald-100"];
              const cardColor = cardColors[index % cardColors.length];

              return (
                <motion.div
                  key={card.title}
                  className={`group relative overflow-hidden rounded-[32px] ${cardColor} h-[380px] shadow-lg`}
                  variants={reveal}
                  whileHover={{
                    scale: 1.05,
                    y: -12,
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-[32px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                      pointerEvents: "none",
                    }}
                  />

                  {card.logoSrc && (
                    <div className="absolute inset-0 flex items-center justify-center p-6">
                      <div className="relative flex h-full w-full flex-col items-center justify-center gap-4">
                        <div className="relative h-56 w-full">
                          <motion.div
                            className="relative h-full w-full"
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          >
                            <Image
                              src={card.logoSrc}
                              alt={card.logoAlt || card.title}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 92vw, 50vw"
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-white/5 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-between p-6 lg:p-8">
                    <motion.div
                      className="flex flex-col"
                      initial={{ opacity: 0, y: -10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-700">
                        {card.badge}
                      </p>
                      <h3 className="mt-2 max-w-md text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-900 lg:text-3xl">
                        {card.title}
                      </h3>
                    </motion.div>

                    <motion.div
                      className="flex flex-col gap-0.2 text-center items-center"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <p className="mx-auto max-w-md text-sm leading-6 text-center text-slate-700/90">
                        {card.description}
                      </p>

                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => openExternalLink(card.href)}
                          className="
                            inline-flex items-center justify-center gap-2
                            rounded-full border border-slate-200
                            bg-white px-4 py-2.5
                            text-sm font-semibold text-slate-700
                            shadow-sm backdrop-blur
                            transition-all duration-300 ease-out

                            hover:-translate-y-1
                            hover:border-blue-700
                            hover:bg-blue-900
                            hover:text-white
                            hover:shadow-[0_12px_30px_rgba(30,58,138,0.45)]
                            "
                        >
                          Open link
                          <ArrowUpRight className="h-4 w-4" />
                        </button>

                        {card.showDownloadPopupButton ? (
                          <button
                            type="button"
                            onClick={() => setIsDownloadPopupOpen(true)}
                            className="
                            inline-flex items-center justify-center gap-2
                            rounded-full border border-slate-200
                            bg-white px-4 py-2.5
                            text-sm font-semibold text-slate-700
                            shadow-sm backdrop-blur
                            transition-all duration-300 ease-out

                            hover:-translate-y-1
                            hover:border-green-700
                            hover:bg-green-900
                            hover:text-white
                            hover:shadow-[0_12px_30px_rgba(16,185,129,0.35)]
                            "
                          >
                            Download
                            <QrCode className="h-4 w-4" />
                          </button>
                        ) : null}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isDownloadPopupOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDownloadPopupOpen(false)}
          >
            <motion.div
              className="relative w-[min(94vw,1100px)] overflow-hidden rounded-[32px] bg-white shadow-[0_40px_120px_rgba(15,23,42,0.35)]"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute right-5 top-5 z-10">
                <button
                  type="button"
                  onClick={() => setIsDownloadPopupOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200"
                  aria-label="Close download popup"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="border-b border-slate-200/70 px-6 py-6 sm:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                  Monkey Task App
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                  Download Monkey Task 360 mobile app
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                  Open the official store links below, or scan the QR code on
                  the card to jump straight to the app page from your phone.
                </p>
              </div>

              <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-2">
                {downloadCards.map((card) => {
                  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=10&data=${encodeURIComponent(
                    card.href,
                  )}`;

                  return (
                    <div
                      key={card.title}
                      className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.3)]"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.tone}`}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_42%)]" />

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
                            <button
                              type="button"
                              onClick={() => openExternalLink(card.href)}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.6)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                            >
                              Open store link
                              <ArrowUpRight className="h-4 w-4" />
                            </button>
                            <p className="text-xs leading-6 text-slate-500">
                              Scan the QR code above if you are already on your
                              phone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
