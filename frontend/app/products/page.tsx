import Image from "next/image";
import Link from "next/link";

const productGroups = [
  {
    title: "Pedia Line",
    description:
      "Pediatric nutrition support led by Willi D3 and future child-focused products.",
    href: "/products/pedia",
    image: "/images/Products/pedia/pediatric_bg.png",
  },
  {
    title: "Detergent Line",
    description:
      "Premium household cleaning solutions, starting with Tetatol surface cleaner.",
    href: "/products/detergents",
    image: "/images/Products/detergents/detergents2.png",
  },
  {
    title: "Ritex",
    description:
      "German-made Ritex products covering condoms, lubricants, and probe covers.",
    href: "/products/ritex/ritex-overview",
    image: "/images/Products/ritex/ritex_factory.jpg",
  },
  {
    title: "Mazagoton",
    description:
      "A growing multivitamin family designed to support daily wellness.",
    href: "/products/mazagoton",
    image: "/images/Products/mazagoton/mz-family.png",
  },
];

export default function ProductsOverviewPage() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-10 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-14">
          <div className="mx-auto max-w-4xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
              Product Portfolio
            </p>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Products Overview
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              Explore our healthcare, hygiene, and wellness product families
              from one place.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {productGroups.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className="group relative min-h-[320px] overflow-hidden rounded-[32px] border border-slate-200/70 bg-slate-950 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/55 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/65">
                    Product Family
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">
                    {product.title}
                  </h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/85">
                    {product.description}
                  </p>
                  <span className="mt-5 inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition group-hover:bg-white/20">
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
