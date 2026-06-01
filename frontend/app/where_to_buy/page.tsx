"use client";

import Link from "next/link";
import Image from "next/image";
import { BadgeCheck, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

type StoreCard = {
  name: string;
  description: string;
  href: string;
  logoSrc: string;
  logoAlt: string;
  accent: string;
  logoClassName?: string;
};

type OfflineTile = {
  name: string;
  logoSrc: string;
  logoAlt: string;
  tone: string;
  logoClassName?: string;
};

const storeCards: StoreCard[] = [
  {
    name: "Amazon Store",
    description:
      "Shop official Willi Med products through Amazon with a familiar checkout experience.",
    href: "https://www.amazon.eg/stores/page/D5F5EC3E-6DA0-46EC-9574-554CC225E037?ingress=0&visitId=b4fa8fff-2914-45b0-b9fc-3e6d48baf427/",
    logoSrc: "/images/where_to_buy/amazon_logo.png",
    logoAlt: "Amazon logo",
    accent: "from-amber-500/15 via-white to-white",
  },
  {
    name: "Noon Store",
    description:
      "Browse the official Noon storefront to find the latest Willi Med availability.",
    href: "https://www.noon.com/egypt-ar/Ritex-brand-store/",
    logoSrc: "/images/where_to_buy/noon_logo_2.png",
    logoAlt: "Noon logo",
    accent: "from-yellow-200 via-amber-100 to-white",
    logoClassName: "object-contain object-center",
  },
  {
    name: "Willi Med Store",
    description:
      "Visit our direct store for the latest brand updates and shopping options.",
    href: "https://sllr.co/willimed/home",
    logoSrc: "/images/wm_logo.png",
    logoAlt: "Willi Med logo",
    accent: "from-emerald-500/15 via-white to-white",
  },
];

const highlights = [
  "Official stores only",
  "Easy checkout",
  "Trusted products",
];

const offlineTiles: OfflineTile[] = [
  {
    name: "Ezaby Pharmacy",
    logoSrc: "/images/where_to_buy/ezaby.gif",
    logoAlt: "Ezaby Pharmacy logo",
    tone: "from-sky-100 via-white to-cyan-50",
  },
  {
    name: "Tay Pharmacies",
    logoSrc: "/images/where_to_buy/tay.png",
    logoAlt: "Tay Pharmacies logo",
    tone: "from-emerald-100 via-white to-teal-50",
    logoClassName: "object-contain object-center p-4",
  },
  {
    name: "Tarshoby Pharmacy",
    logoSrc: "/images/where_to_buy/tarshoby.png",
    logoAlt: "Tarshoby Pharmacy logo",
    tone: "from-rose-100 via-white to-pink-50",
  },
  {
    name: "Balbaa Pharmacies",
    logoSrc: "/images/where_to_buy/balbaa.png",
    logoAlt: "Balbaa Pharmacies logo",
    tone: "from-amber-100 via-white to-amber-50",
  },
  {
    name: "LuLu Hyper Market",
    logoSrc: "/images/where_to_buy/lulu.png",
    logoAlt: "LuLu Hyper Market logo",
    tone: "from-violet-100 via-white to-fuchsia-50",
    logoClassName: "object-contain object-center p-4",
  },
  {
    name: "Sally Pharmacy",
    logoSrc: "/images/where_to_buy/sally.png",
    logoAlt: "Sally Pharmacy logo",
    tone: "from-sky-50 via-white to-indigo-50",
  },

  {
    name: "Al Ain Pharmacy",
    logoSrc: "/images/where_to_buy/al_ain_pharmacy.png",
    logoAlt: "Al Ain Pharmacy logo",
    tone: "from-stone-100 via-white to-slate-100",
  },

  {
    name: "Khalil Pharmacy",
    logoSrc: "/images/where_to_buy/khalil_logo.png",
    logoAlt: "Khalil Pharmacy logo",
    tone: "from-slate-800 via-slate-700 to-slate-900",
  },
];

export default function WhereToBuyPage() {
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
        <div className="absolute left-[-10%] top-[-8%] h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[20%] h-72 w-72 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute bottom-[-16%] left-[18%] h-80 w-80 rounded-full bg-emerald-100/90 blur-3xl" />
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
                <ShoppingBag className="h-3.5 w-3.5" />
                Where to Buy?!
              </motion.div>

              <motion.h1
                className="mt-6 text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl"
                variants={reveal}
              >
                Shop Willi Med Products
              </motion.h1>

              <motion.div
                className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                variants={reveal}
              />

              <motion.p
                className="mx-auto mt-10 max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-lg lg:text-xl"
                variants={reveal}
              >
                Buy from our official online stores and marketplace partners.
                Choose the channel that works best for you and shop with
                confidence.
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
              {highlights.map((item) => (
                <motion.span
                  key={item}
                  className="rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm"
                  variants={reveal}
                >
                  {item}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-3"
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
              {storeCards.map((card) =>
                (() => {
                  return (
                    <motion.a
                      key={card.name}
                      href={card.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={card.name}
                      className="group relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/88 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] transition will-change-transform hover:-translate-y-1 hover:shadow-[0_28px_60px_-35px_rgba(15,23,42,0.4)] sm:min-h-[470px]"
                      variants={reveal}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${card.accent}`}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_42%)]" />

                      <div className="relative flex h-full w-full flex-col">
                        <div className="relative flex flex-1 items-center justify-center">
                          <div className="absolute inset-0 p-8 sm:p-10">
                            <Image
                              src={card.logoSrc}
                              alt={card.logoAlt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 33vw"
                              className={`transition duration-300 group-hover:scale-[1.03] ${
                                card.logoClassName ?? "object-contain"
                              }`}
                            />
                          </div>
                        </div>

                        <div className="border-t border-white/70 bg-white/90 px-5 py-5 sm:px-6 sm:py-6">
                          <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                            {card.name}
                          </p>
                          <p className="mt-2 max-w-xs text-sm leading-6 text-slate-600 sm:text-base">
                            {card.description}
                          </p>
                        </div>
                      </div>
                      <span className="sr-only">{card.name}</span>
                    </motion.a>
                  );
                })(),
              )}
            </motion.div>

            <motion.div
              className="mt-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.08,
                  },
                },
              }}
            >
              <motion.div
                className="mx-auto max-w-4xl text-center"
                variants={reveal}
              >
                <p className="text-[0.72rem] font-medium uppercase tracking-[0.38em] text-slate-400">
                  Offline Store Wall
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-4xl">
                  Partners near you
                </h2>
                <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                  A quick visual map of nearby pharmacies and retail partners
                  where you can find Willi Med products offline.
                </p>
              </motion.div>
              <div className="relative my-12">
                <div className="absolute -left-16 top-6 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl" />
                <div className="absolute -right-12 bottom-6 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
                <motion.div
                  className="group mx-auto max-w-2xl overflow-hidden rounded-[34px]"
                  variants={reveal}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  <Image
                    src="/images/where_to_buy/shop_bg.png"
                    alt="Willi Med team member portrait"
                    width={2481}
                    height={3508}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </motion.div>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {offlineTiles.map((tile, index) => (
                  <motion.div
                    key={`${tile.name}-${index}`}
                    className="group relative aspect-square overflow-hidden rounded-[28px] border border-white/80 bg-white/90 shadow-[0_14px_30px_-24px_rgba(148,163,184,0.45)] transition hover:-translate-y-1 hover:shadow-[0_20px_40px_-26px_rgba(148,163,184,0.55)]"
                    variants={reveal}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tile.tone}`}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.88),transparent_48%)]" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/70" />

                    <div className="absolute inset-0">
                      <Image
                        src={tile.logoSrc}
                        alt={tile.logoAlt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className={`transition duration-300 group-hover:scale-[1.05] ${
                          tile.logoClassName ??
                          "object-contain object-center p-4"
                        }`}
                      />
                    </div>

                    <div className="absolute inset-x-3 bottom-3 rounded-full border border-white/70 bg-white/75 px-3 py-2 backdrop-blur-md">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {tile.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="mx-auto mt-10 flex max-w-4xl items-start gap-3 rounded-3xl border border-slate-200/70 bg-white/80 p-5 text-left shadow-sm"
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div className="flex-1">
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  We only point customers to official Willi Med sales channels.
                  If you ever need help finding the right store, our team can
                  guide you.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-16px_rgba(15,23,42,0.6)] transition hover:-translate-y-0.5 hover:bg-slate-800"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
