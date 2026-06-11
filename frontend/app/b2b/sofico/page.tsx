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

const soficoItems: Array<{
  itemName: string;
  soficoCode: string;
  category: string;
}> = [
  {
    itemName: "Ritex Condom RR1 3 Pcs",
    soficoCode: "3004484",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom RR1 10 Pcs",
    soficoCode: "3004491",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Ideal 3 Pcs",
    soficoCode: "3004485",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Ideal 10 Pcs",
    soficoCode: "3004492",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom XXL 3 Pcs",
    soficoCode: "3004486",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom XXL 8 Pcs",
    soficoCode: "3004493",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Lust 3 Pcs",
    soficoCode: "3004487",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Lust 8 Pcs",
    soficoCode: "3004494",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Feeling 3 Pcs",
    soficoCode: "3004488",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Feeling 8 Pcs",
    soficoCode: "3004495",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Extra Thin 3 Pcs",
    soficoCode: "3004489",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Extra Thin 8 Pcs",
    soficoCode: "3004496",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Longtime 3 Pcs",
    soficoCode: "3004511",
    category: "Condoms",
  },
  {
    itemName: "Ritex Condom Longtime 8 Pcs",
    soficoCode: "3004509",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Sortiment 10 Pcs",
    soficoCode: "3004498",
    category: "Condoms",
  },

  {
    itemName: "Ritex Condom Mix - Gold",
    soficoCode: "3004499",
    category: "Condoms",
  },

  {
    itemName: "Ritex Kondomautomate 40 Pcs",
    soficoCode: "3004500",
    category: "Condoms",
  },

  {
    itemName: "Ritex Pleasure Mix Condom",
    soficoCode: "3004510",
    category: "Condoms",
  },

  {
    itemName: "Ritex Hydro Gel 50 ml",
    soficoCode: "3004502",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Longtime Lubricant 50 ml",
    soficoCode: "3004503",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Bio Vegan Gel 50 ml",
    soficoCode: "3004504",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Gel + Aloe Vera 50 ML",
    soficoCode: "3004501",
    category: "Lubricants",
  },

  {
    itemName: "Ritex Kinderwunsch Conception Lubricant",
    soficoCode: "3004505",
    category: "Lubricants",
  },

  {
    itemName: "Willi D3 Coconut Flavour 15ML Drops",
    soficoCode: "3004508",
    category: "Vitamin D3 Supplements",
  },

  {
    itemName: "Mazagoton - F 30 TAB",
    soficoCode: "2001394",
    category: "Multivitamins",
  },
  {
    itemName: "Mazagoton - M 30 TAB",
    soficoCode: "2001396",
    category: "Multivitamins",
  },
  {
    itemName: "Mazagoton - Energy 30 TAB",
    soficoCode: "2001395",
    category: "Multivitamins",
  },
  {
    itemName: "Mazagoton Mix 12 Pack",
    soficoCode: "2001397",
    category: "Multivitamins",
  },
];

export default function SoficoPage() {
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

  const filteredItems = soficoItems.filter((item) => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      item.itemName.toLowerCase().includes(query) ||
      item.soficoCode.toLowerCase().includes(query) ||
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

          <div
            ref={heroRef}
            className="relative px-6 py-12 sm:px-10 lg:px-14 lg:py-16"
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
                      src="/images/b2b/sofico/logoSoficoPharam.png"
                      alt="Sofico logo"
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
                    partnership with Sofico Pharm, one of Egypt&apos;s trusted
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
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1] as const,
                    }}
                    className="group mx-auto max-w-5xl overflow-hidden rounded-[34px] border border-slate-200/70 bg-white/70 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.28)]"
                  >
                    <motion.div style={{ y: imageY, scale: imageScale }}>
                      <Image
                        src="/images/b2b/sofico/official_distributor.jpg"
                        alt="Sofico background"
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

            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {strengths.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
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
                  </div>
                );
              })}
            </div>

            <div className="mt-6 overflow-hidden rounded-[34px] border border-sky-100/80 bg-[linear-gradient(180deg,rgba(239,246,255,0.95),rgba(240,253,244,0.9))] shadow-[0_24px_60px_-36px_rgba(15,23,42,0.22)]">
              <div className="border-b border-slate-200/70 px-6 py-8 sm:px-8">
                <h2 className="text-center text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl">
                  Items Codes
                </h2>

                <div className="mx-auto mt-6 max-w-2xl">
                  <label
                    htmlFor="sofico-search"
                    className="mb-2 block text-left text-xs font-medium uppercase tracking-[0.28em] text-slate-400"
                  >
                    Search items
                  </label>
                  <input
                    id="sofico-search"
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
                        Sofico Code
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
                        <tr
                          key={`${row.itemName}-${row.soficoCode}`}
                          className="border-b border-white/70 last:border-b-0"
                        >
                          <td className="px-6 py-4 text-sm text-slate-700 sm:px-8">
                            {row.itemName}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-700 sm:px-8">
                            {row.soficoCode}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-slate-700 sm:px-8">
                            {row.category}
                          </td>
                        </tr>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
