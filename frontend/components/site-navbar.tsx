"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [{ href: "/", label: "Home" }];

export function SiteNavbar() {
  const [isRitexOpen, setIsRitexOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/wm_logo.png"
            alt="Willi Med logo"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <span className="text-lg font-semibold tracking-tight">
            Willi Med For Pharmaceutical Industries
          </span>
        </Link>

        <ul className="flex items-center gap-2 sm:gap-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}

          <li className="group relative">
            <button
              type="button"
              className="cursor-default rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            >
              About Us
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-52 translate-y-1 rounded-xl border border-border bg-background p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <Link
                href="/about_us"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                About Us
              </Link>
              <Link
                href="/meet_our_leaders"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Meet Our Leaders
              </Link>
            </div>
          </li>

          <li className="group relative">
            <button
              type="button"
              className="cursor-default rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            >
              Products
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-52 translate-y-1 rounded-xl border border-border bg-background p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <Link
                href="/products"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Products Overview
              </Link>
              <div
                className="relative"
                onMouseLeave={() => setIsRitexOpen(false)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setIsRitexOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
                  onMouseEnter={() => setIsRitexOpen(true)}
                  onFocus={() => setIsRitexOpen(true)}
                >
                  <span>Ritex</span>
                  <span className="text-xs">›</span>
                </button>

                <div
                  className={`absolute right-full top-0 z-50 mr-2 min-w-52 rounded-xl border border-border bg-background p-2 shadow-lg transition-all duration-150 ${
                    isRitexOpen
                      ? "visible -translate-x-0 opacity-100"
                      : "invisible -translate-x-1 opacity-0"
                  }`}
                  onMouseEnter={() => setIsRitexOpen(true)}
                  onFocus={() => setIsRitexOpen(true)}
                >
                  <Link
                    href="/products/ritex/ritex-overview"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Overview
                  </Link>
                  <Link
                    href="/products/ritex/condoms"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Condoms
                  </Link>
                  <Link
                    href="/products/ritex/lubricants"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Lubricants
                  </Link>
                  <Link
                    href="/products/ritex/probe-covers"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Probe Cover
                  </Link>
                </div>
              </div>
              <Link
                href="/products/pedia"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Pedia Line
              </Link>
              <Link
                href="/coming_soon"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                CNS Line
              </Link>
              <Link
                href="/coming_soon"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Diabetes Line
              </Link>
              <Link
                href="/coming_soon"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                GIT Line
              </Link>
            </div>
          </li>
          <li className="group relative">
            <button
              type="button"
              className="cursor-default rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            >
              Career
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-52 translate-y-1 rounded-xl border border-border bg-background p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <Link
                href="/careers/open_vacancies"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Open Vacancies
              </Link>
              <Link
                href="/careers/apply_now"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Apply Now
              </Link>
            </div>
          </li>

          <li>
            <Link
              href="/employees_section"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Employee&apos;s Section
            </Link>
          </li>

          <li className="group relative">
            <button
              type="button"
              className="cursor-default rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
            >
              B2B
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-2 min-w-52 translate-y-1 rounded-xl border border-border bg-background p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <Link
                href="/b2b/pharmaoverseas"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                PharmaOverseas
              </Link>
              <Link
                href="/b2b/sofico"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Sofico Pharm
              </Link>
              <Link
                href="/b2b/egydrug"
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Egy Drug
              </Link>
            </div>
          </li>
          <li>
            <Link
              href="/where_to_buy"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Where to Buy?
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
