"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [{ href: "/", label: "Home" }];

export function SiteNavbar() {
  const [isRitexOpen, setIsRitexOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav className="flex w-full items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
          <Image
            src="/images/wm_logo.png"
            alt="Willi Med logo"
            width={180}
            height={48}
            className="h-10 w-auto sm:h-11"
            priority
          />
          <span className="hidden text-lg font-semibold tracking-tight sm:block">
            Willi Med For Pharmaceutical Industries
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground lg:hidden"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-site-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
        >
          <span className="relative block h-5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 top-1 h-0.5 w-5 bg-current transition-transform duration-200 ${
                isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 h-0.5 w-5 bg-current transition-opacity duration-200 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition-transform duration-200 ${
                isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <ul className="hidden items-center gap-2 sm:gap-4 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                About Us
              </Link>
              <Link
                href="/meet_our_leaders"
                onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
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
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Overview
                  </Link>
                  <Link
                    href="/products/ritex/condoms"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Condoms
                  </Link>
                  <Link
                    href="/products/ritex/lubricants"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Lubricants
                  </Link>
                  <Link
                    href="/products/ritex/probe-covers"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Ritex Probe Cover
                  </Link>
                </div>
              </div>
              <Link
                href="/products/pedia"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Pedia Line
              </Link>
              <Link
                href="/coming_soon"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                CNS Line
              </Link>
              <Link
                href="/coming_soon"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Diabetes Line
              </Link>
              <Link
                href="/coming_soon"
                onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Open Vacancies
              </Link>
              <Link
                href="/careers/apply_now"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Apply Now
              </Link>
            </div>
          </li>

          <li>
            <Link
              href="/employees_section"
              onClick={closeMobileMenu}
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
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                PharmaOverseas
              </Link>
              <Link
                href="/b2b/sofico"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Sofico Pharm
              </Link>
              <Link
                href="/b2b/egydrug"
                onClick={closeMobileMenu}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Egy Drug
              </Link>
            </div>
          </li>
          <li>
            <Link
              href="/where_to_buy"
              onClick={closeMobileMenu}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Where to Buy?
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={closeMobileMenu}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {isMobileMenuOpen ? (
        <div
          id="mobile-site-navigation"
          className="border-t border-border bg-background/98 lg:hidden"
        >
          <div className="max-h-[calc(100vh-72px)] overflow-y-auto px-4 py-4 sm:px-6">
            <div className="space-y-2">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="block rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Home
              </Link>

              <details className="rounded-xl border border-border px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  About Us
                </summary>
                <div className="mt-3 space-y-2 pl-2">
                  <Link
                    href="/about_us"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/meet_our_leaders"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Meet Our Leaders
                  </Link>
                </div>
              </details>

              <details className="rounded-xl border border-border px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  Products
                </summary>
                <div className="mt-3 space-y-2 pl-2">
                  <Link
                    href="/products"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Products Overview
                  </Link>
                  <div className="rounded-lg border border-border/60 p-2">
                    <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Ritex
                    </p>
                    <Link
                      href="/products/ritex/ritex-overview"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Ritex Overview
                    </Link>
                    <Link
                      href="/products/ritex/condoms"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Ritex Condoms
                    </Link>
                    <Link
                      href="/products/ritex/lubricants"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Ritex Lubricants
                    </Link>
                    <Link
                      href="/products/ritex/probe-covers"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      Ritex Probe Cover
                    </Link>
                  </div>
                  <Link
                    href="/products/pedia"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Pedia Line
                  </Link>
                  <Link
                    href="/coming_soon"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    CNS Line
                  </Link>
                  <Link
                    href="/coming_soon"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Diabetes Line
                  </Link>
                  <Link
                    href="/coming_soon"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    GIT Line
                  </Link>
                </div>
              </details>

              <details className="rounded-xl border border-border px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  Career
                </summary>
                <div className="mt-3 space-y-2 pl-2">
                  <Link
                    href="/careers/open_vacancies"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Open Vacancies
                  </Link>
                  <Link
                    href="/careers/apply_now"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Apply Now
                  </Link>
                </div>
              </details>

              <Link
                href="/employees_section"
                onClick={closeMobileMenu}
                className="block rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Employee&apos;s Section
              </Link>

              <details className="rounded-xl border border-border px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-foreground">
                  B2B
                </summary>
                <div className="mt-3 space-y-2 pl-2">
                  <Link
                    href="/b2b/pharmaoverseas"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    PharmaOverseas
                  </Link>
                  <Link
                    href="/b2b/sofico"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Sofico Pharm
                  </Link>
                  <Link
                    href="/b2b/egydrug"
                    onClick={closeMobileMenu}
                    className="block rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Egy Drug
                  </Link>
                </div>
              </details>

              <Link
                href="/where_to_buy"
                onClick={closeMobileMenu}
                className="block rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Where to Buy?
              </Link>

              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
