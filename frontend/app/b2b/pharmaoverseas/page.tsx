"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Handshake, ShieldCheck, Truck } from "lucide-react";
import { useRef, useState } from "react";

const strengths = [
  {
    icon: Handshake,
    title: "Trusted Partnerships",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
  },
  {
    icon: ShieldCheck,
    title: "Quality First",
  },
];

const pharmaoverseasItems: Array<{
  itemName: string;
  pharmaoverseasCode: string;
  category: string;
}> = [
  {
    itemName: "Ritex Condom RR1 3 Pcs",
    pharmaoverseasCode: "42712",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom RR1 10 Pcs",
    pharmaoverseasCode: "42715",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Ideal 3 Pcs",
    pharmaoverseasCode: "42708",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Ideal 10 Pcs",
    pharmaoverseasCode: "42716",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom XXL 3 Pcs",
    pharmaoverseasCode: "42709",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom XXL 8 Pcs",
    pharmaoverseasCode: "42717",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Lust 3 Pcs",
    pharmaoverseasCode: "42710",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Lust 8 Pcs",
    pharmaoverseasCode: "42718",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Feeling 3 Pcs",
    pharmaoverseasCode: "42711",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Feeling 8 Pcs",
    pharmaoverseasCode: "42719",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Extra Thin 3 Pcs",
    pharmaoverseasCode: "42713",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Extra Thin 8 Pcs",
    pharmaoverseasCode: "42720",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Longtime 3 Pcs",
    pharmaoverseasCode: "42714",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Longtime 8 Pcs",
    pharmaoverseasCode: "42721",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Mix 8 Pcs",
    pharmaoverseasCode: "42722",
    category: "Condoms",
  },

  {
    itemName: "Ritex Kondomautomate 40 Pcs",
    pharmaoverseasCode: "42723",
    category: "Condoms",
  },

  {
    itemName: "Ritex Hydro Gel 50 ml",
    pharmaoverseasCode: "42725",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Longtime Lubricant 50 ml",
    pharmaoverseasCode: "42726",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Bio Vegan Gel 50 ml",
    pharmaoverseasCode: "42727",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Gel + Aloe Vera 50 ML",
    pharmaoverseasCode: "42724",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Kinderwunsch Conception Lubricant",
    pharmaoverseasCode: "42728",
    category: "Lubricants",
  },

  {
    itemName: "Willi D3 Coconut Flavour 15 ml Drops",
    pharmaoverseasCode: "42706",
    category: "Vitamin D3 Supplements",
  },

  {
    itemName: "Mazagoton - F 30 TAB",
    pharmaoverseasCode: "46423",
    category: "Multivitamins",
  },
  {
    itemName: "Mazagoton - M 30 TAB",
    pharmaoverseasCode: "46424",
    category: "Multivitamins",
  },
  {
    itemName: "Mazagoton - Energy 30 TAB",
    pharmaoverseasCode: "46425",
    category: "Multivitamins",
  },
];

export default function PharmaoverseasPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const heroTitleY = useTransform(heroProgress, [0, 1], [0, -48]);
  const heroTitleOpacity = useTransform(
    heroProgress,
    [0, 0.65, 1],
    [1, 0.72, 0.12],
  );
  const heroMediaY = useTransform(heroProgress, [0, 1], [0, 56]);
  const heroMediaScale = useTransform(heroProgress, [0, 1], [1, 1.05]);
  const imageY = useTransform(imageProgress, [0, 1], [24, -24]);
  const imageScale = useTransform(imageProgress, [0, 1], [0.98, 1.02]);

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
  };

  const filteredItems = pharmaoverseasItems.filter((item) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      item.itemName.toLowerCase().includes(query) ||
      item.pharmaoverseasCode.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-8%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-10%] top-[12%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-14%] left-[18%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,250,252,0.92))] shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_45%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.08),transparent_32%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.08),transparent_28%)]" />
          <div className="pointer-events-none absolute -right-24 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18)_0%,rgba(59,130,246,0.10)_32%,transparent_72%)] blur-3xl animate-glow-slow" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.14)_0%,rgba(16,185,129,0.08)_32%,transparent_72%)] blur-3xl animate-glow-slow-delayed" />

          <motion.div
            ref={heroRef}
            className="relative px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.28 }}
          >
            <div className="mx-auto max-w-6xl text-center lg:text-left">
              <motion.div
                variants={reveal}
                className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur lg:mx-0"
              >
                B2B Distribution Partnership
              </motion.div>

              <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="space-y-6">
                  <motion.div variants={reveal}>
                    <Image
                      src="/images/b2b/pharmaoverseas/pharmaoverseas_logo.png"
                      alt="Pharmaoverseas logo"
                      width={405}
                      height={143}
                      className="mx-auto h-20 w-auto object-contain sm:h-24 lg:mx-0"
                      priority
                    />
                  </motion.div>

                  <motion.h1
                    style={{ y: heroTitleY, opacity: heroTitleOpacity }}
                    variants={reveal}
                    className="text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl"
                  >
                    Driven by Excellence
                  </motion.h1>

                  <motion.div
                    variants={reveal}
                    className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:mx-0"
                  />

                  <motion.p
                    variants={reveal}
                    className="mx-auto max-w-2xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg lg:mx-0"
                  >
                    As part of our commitment to delivering a seamless business
                    experience, Willi Med has established a strategic
                    partnership with PharmaOverseas, one of Egypt&apos;s trusted
                    pharmaceutical distributors.
                  </motion.p>
                  <motion.p
                    variants={reveal}
                    className="mx-auto max-w-2xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg lg:mx-0"
                  >
                    This collaboration enables our partners to access Willi Med
                    products through a reliable distribution network, ensuring
                    efficient order fulfillment, product availability, and
                    professional customer support across the market.
                  </motion.p>

                  <motion.div
                    variants={reveal}
                    className="grid gap-3 pt-2 sm:grid-cols-3"
                  ></motion.div>
                </div>

                <motion.div
                  style={{ y: heroMediaY, scale: heroMediaScale }}
                  variants={reveal}
                  className="relative"
                >
                  <div className="absolute -left-10 top-8 h-40 w-40 rounded-full bg-sky-100/60 blur-3xl" />
                  <div className="absolute -right-8 bottom-4 h-40 w-40 rounded-full bg-emerald-100/60 blur-3xl" />
                  <motion.div
                    ref={imageRef}
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="group mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/70 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.28)]"
                  >
                    <motion.div style={{ y: imageY, scale: imageScale }}>
                      <Image
                        src="/images/b2b/pharmaoverseas/official_distributor_2.jpg"
                        alt="Pharmaoverseas background"
                        width={1600}
                        height={900}
                        className="h-auto w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 80vw"
                        priority
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              className="mt-14 grid gap-4 md:grid-cols-3"
            >
              {strengths.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={reveal}
                    whileHover={{ y: -4 }}
                    className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.18)] backdrop-blur"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-lg font-semibold leading-none text-slate-950">
                        {item.title}
                      </h2>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.16 }}
              variants={reveal}
              className="mt-6 overflow-hidden rounded-[34px] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(240,253,244,0.9))] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)]"
            >
              <div className="border-b border-slate-200/70 px-6 py-8 sm:px-8">
                <h2 className="text-center text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                  Items Codes
                </h2>

                <div className="mx-auto mt-6 max-w-2xl">
                  <label
                    htmlFor="pharmaoverseas-search"
                    className="mb-2 block text-left text-xs font-medium uppercase tracking-[0.28em] text-slate-400"
                  >
                    Search items
                  </label>
                  <input
                    id="pharmaoverseas-search"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search by item name, code, or category..."
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white/95 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-200/70"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead className="bg-white/55">
                    <tr className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      <th
                        scope="col"
                        className="border-b border-slate-200/70 px-6 py-4 sm:px-8"
                      >
                        Item Name
                      </th>
                      <th
                        scope="col"
                        className="border-b border-slate-200/70 px-6 py-4 text-center sm:px-8"
                      >
                        PharmaOverseas Code
                      </th>
                      <th
                        scope="col"
                        className="border-b border-slate-200/70 px-6 py-4 text-center sm:px-8"
                      >
                        Category
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.length > 0 ? (
                      filteredItems.map((row, index) => (
                        <motion.tr
                          key={`${row.itemName}-${row.pharmaoverseasCode}`}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            delay: 0.05 * index,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="border-b border-white/70 last:border-b-0"
                        >
                          <td className="px-6 py-4 text-sm text-slate-700 sm:px-8">
                            {row.itemName}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-700 sm:px-8">
                            {row.pharmaoverseasCode}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-700 sm:px-8">
                            {row.category}
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-10 text-center text-sm text-slate-500 sm:px-8"
                        >
                          No items match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes glowSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translate3d(0, 14px, 0) scale(1.08);
            opacity: 0.85;
          }
        }

        .animate-glow-slow {
          animation: glowSlow 12s ease-in-out infinite;
        }

        .animate-glow-slow-delayed {
          animation: glowSlow 14s ease-in-out infinite;
          animation-delay: -7s;
        }
      `}</style>
    </section>
  );
}
