import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const products = [
  {
    name: "Ritex",
    href: "/products/ritex",
    description:
      "A focused product profile for one of our featured pharmaceutical offerings.",
    image: "/images/Products/ritex_xxl.jpg",
  },
];

export default function ProductsPage() {
  return (
    <section className="relative isolate overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-12%] h-80 w-80 rounded-full bg-sky-100/70 blur-3xl" />
        <div className="absolute right-[-8%] top-[18%] h-72 w-72 rounded-full bg-emerald-100/70 blur-3xl" />
        <div className="absolute bottom-[-12%] left-[22%] h-80 w-80 rounded-full bg-slate-100/90 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl [font-family:-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text',system-ui,sans-serif]">
        <div className="rounded-[40px] border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.92))] px-6 py-12 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.22)] sm:px-10 lg:px-14 lg:py-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.38em] text-slate-500 shadow-sm backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" />
              Products
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
              Our Product Portfolio
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-[0.98rem] leading-7 text-slate-600 sm:text-lg">
              Explore our featured products and discover the details behind each
              offering.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6">
          {products.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="group overflow-hidden rounded-[34px] border border-white/70 bg-white/80 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] backdrop-blur-2xl transition hover:-translate-y-1"
            >
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="relative min-h-[280px] bg-slate-100 sm:min-h-[360px]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04),rgba(15,23,42,0.18))]" />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                  <div>
                    <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-slate-400">
                      Featured product
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950 sm:text-[2.5rem]">
                      {product.name}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition group-hover:bg-slate-50">
                    View details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
