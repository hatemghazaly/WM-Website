import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/meet_our_leaders", label: "Meet Our Leaders" },
  { href: "/contact", label: "Contact Us" },
  { href: "/about_us", label: "About Us" },
  { href: "/employees_section", label: "Employee's Section" },
];

export function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Willi Med For Pharmeaceutical Industries
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
        </ul>
      </nav>
    </header>
  );
}
