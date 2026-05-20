import type { Metadata } from "next";
import { SiteNavbar } from "@/components/site-navbar";
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
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
