import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Ellipsis, PencilLine } from "lucide-react";

type Person = {
  name: string;
  role: string;
  initials: string;
  tone: string;
  skin: string;
};

const leaders: Person[] = [
  {
    name: "Bakr",
    role: "CEO",
    initials: "BK",
    tone: "from-slate-950 via-slate-800 to-slate-700",
    skin: "from-amber-100 via-orange-50 to-amber-50",
  },
];

const management: Person[] = [
  {
    name: "Maha",
    role: "Operations",
    initials: "MH",
    tone: "from-slate-900 via-slate-700 to-slate-600",
    skin: "from-rose-100 via-pink-50 to-orange-50",
  },
  {
    name: "Omar",
    role: "Strategy",
    initials: "OM",
    tone: "from-slate-900 via-slate-700 to-slate-500",
    skin: "from-emerald-100 via-teal-50 to-cyan-50",
  },
  {
    name: "Nour",
    role: "Marketing",
    initials: "NR",
    tone: "from-slate-950 via-slate-800 to-slate-600",
    skin: "from-violet-100 via-indigo-50 to-sky-50",
  },
  {
    name: "Sara",
    role: "People",
    initials: "SR",
    tone: "from-slate-900 via-slate-700 to-slate-600",
    skin: "from-amber-100 via-yellow-50 to-lime-50",
  },
];

const team: Person[] = [
  {
    name: "Hassan",
    role: "Frontend",
    initials: "HS",
    tone: "from-slate-950 via-slate-800 to-slate-700",
    skin: "from-sky-100 via-cyan-50 to-white",
  },
  {
    name: "Laila",
    role: "Design",
    initials: "LL",
    tone: "from-slate-900 via-slate-700 to-slate-600",
    skin: "from-fuchsia-100 via-rose-50 to-white",
  },
  {
    name: "Yara",
    role: "Support",
    initials: "YR",
    tone: "from-slate-900 via-slate-700 to-slate-500",
    skin: "from-emerald-100 via-lime-50 to-white",
  },
  {
    name: "Adam",
    role: "Backend",
    initials: "AD",
    tone: "from-slate-950 via-slate-800 to-slate-700",
    skin: "from-orange-100 via-amber-50 to-white",
  },
  {
    name: "Mina",
    role: "Data",
    initials: "MN",
    tone: "from-slate-900 via-slate-700 to-slate-600",
    skin: "from-violet-100 via-purple-50 to-white",
  },
  {
    name: "Reem",
    role: "Ops",
    initials: "RM",
    tone: "from-slate-900 via-slate-700 to-slate-500",
    skin: "from-blue-100 via-sky-50 to-white",
  },
  {
    name: "Tarek",
    role: "QA",
    initials: "TR",
    tone: "from-slate-950 via-slate-800 to-slate-700",
    skin: "from-rose-100 via-orange-50 to-white",
  },
  {
    name: "Nada",
    role: "Growth",
    initials: "ND",
    tone: "from-slate-900 via-slate-700 to-slate-600",
    skin: "from-teal-100 via-cyan-50 to-white",
  },
];

function PersonFigure({ person, compact = false }: { person: Person; compact?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      <div
        className={`relative rounded-full border border-white/70 bg-gradient-to-b ${person.skin} shadow-[0_18px_50px_rgba(15,23,42,0.12)] ${
          compact ? "h-28 w-20" : "h-44 w-32 sm:h-52 sm:w-36"
        }`}
      >
        <div className="absolute inset-x-1/2 top-4 h-10 w-10 -translate-x-1/2 rounded-full bg-gradient-to-b from-amber-100 to-amber-300 shadow-inner" />
        <div
          className={`absolute inset-x-1/2 bottom-0 -translate-x-1/2 rounded-t-[2.5rem] bg-gradient-to-b ${person.tone} ${
            compact ? "h-20 w-16" : "h-28 w-24"
          }`}
        />
        <div
          className={`absolute inset-x-1/2 bottom-4 -translate-x-1/2 rounded-full border border-white/80 bg-slate-900 text-center font-semibold tracking-[0.18em] text-white shadow-lg ${
            compact ? "flex h-10 w-10 items-center justify-center text-[0.55rem]" : "flex h-12 w-12 items-center justify-center text-[0.65rem]"
          }`}
        >
          {person.initials}
        </div>
      </div>
      <p className="mt-3 text-sm font-semibold text-slate-800">{person.name}</p>
      <p className="text-xs text-slate-500">{person.role}</p>
    </div>
  );
}

function Platform({
  label,
  accent,
  children,
  size = "md",
}: {
  label: string;
  accent: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}) {
  const widthClass =
    size === "lg"
      ? "w-[min(100%,56rem)]"
      : size === "md"
        ? "w-[min(100%,48rem)]"
        : "w-[min(100%,40rem)]";
  const heightClass = size === "lg" ? "h-24 sm:h-28" : size === "md" ? "h-20 sm:h-24" : "h-16 sm:h-20";

  return (
    <div className={`relative ${widthClass}`}>
      <div
        className={`relative ${heightClass} overflow-hidden rounded-[50%] border border-white/80 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.95),_rgba(241,245,249,0.9)_54%,_rgba(226,232,240,0.95))] shadow-[0_26px_70px_rgba(15,23,42,0.12)]`}
      >
        <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${accent} opacity-70`} />
        <div className="absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-slate-200/60 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center px-4">{children}</div>
      </div>
      <div
        className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full px-5 py-1 text-xs font-semibold tracking-wide text-white shadow-lg ${
          size === "lg" ? "bg-amber-500" : size === "md" ? "bg-sky-500" : "bg-slate-500"
        }`}
      >
        {label}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.34),_transparent_34%),radial-gradient(circle_at_80%_20%,_rgba(250,204,21,0.14),_transparent_28%),linear-gradient(to_bottom,_rgba(255,255,255,1),_rgba(248,250,252,1))]" />
      <div className="pointer-events-none absolute left-1/2 top-16 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="mx-auto max-w-6xl space-y-12 py-6 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm backdrop-blur">
              About Us
            </div>
            <div className="space-y-4">
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                The people behind WM Website
              </h1>
              <p className="max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                We build with care, ship with purpose, and keep the experience
                clean and dependable from the first screen to the last detail.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,23,42,0.24)] transition-transform hover:-translate-y-0.5"
              >
                Learn more
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Reliable, modern, human-centered
              </div>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/80 bg-white/70 p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-6">
            <div className="mb-6 flex items-center justify-between rounded-[1.5rem] bg-white/80 px-5 py-4 shadow-sm ring-1 ring-slate-200/70">
              <div>
                <p className="text-sm font-medium text-slate-500">WM Website</p>
                <p className="text-lg font-semibold text-slate-900">3D Layers / Depth</p>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <PencilLine className="h-4 w-4" />
                <Ellipsis className="h-5 w-5" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex justify-center">
                <Platform label="CEO" accent="from-slate-900 via-slate-700 to-slate-500" size="lg">
                  <div className="flex flex-wrap justify-center gap-4">
                    {leaders.map((person) => (
                      <PersonFigure key={person.name} person={person} />
                    ))}
                  </div>
                </Platform>
              </div>

              <div className="flex justify-center">
                <Platform label="Management" accent="from-sky-300 via-sky-500 to-blue-600" size="md">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {management.map((person) => (
                      <PersonFigure key={person.name} person={person} compact />
                    ))}
                  </div>
                </Platform>
              </div>

              <div className="flex justify-center">
                <Platform label="Team" accent="from-slate-200 via-slate-300 to-slate-400" size="sm">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
                    {team.map((person) => (
                      <PersonFigure key={person.name} person={person} compact />
                    ))}
                  </div>
                </Platform>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Clarity first",
              text: "We keep the layout readable, focused, and easy to scan on every screen size.",
            },
            {
              title: "Built to scale",
              text: "The layered structure can grow as the team grows without changing the visual system.",
            },
            {
              title: "Easy to update",
              text: "You can swap names, roles, colors, or counts directly in the About page data.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur"
            >
              <h2 className="text-base font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
