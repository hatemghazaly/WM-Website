import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "WM Website",
  description: "Welcome to WM Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <SiteNavbar />

        <main
          className="w-full flex-1 pb-8"
          style={{
            paddingTop: "calc(var(--navbar-height) + var(--page-top-spacing))",
          }}
        >
          {children}
        </main>

        <SiteFooter />
      </body>
    </html>
  );
}
