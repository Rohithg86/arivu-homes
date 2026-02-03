import type { Metadata } from "next";
import Link from "next/link";
import { HomeLogo } from "@/components/HomeLogo";
import { MobileNav } from "@/components/MobileNav";
import { ContactWidget } from "@/components/ContactWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arivu Homes Private Limited - Building Dreams with Precision",
  description: "Building Dreams with Precision • Crafting Excellence Since Day One. End-to-end construction, architectural design, structural engineering, and project management services in Bangalore.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-gradient-to-br from-slate-50 via-white to-sky-50 text-gray-900 antialiased">
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
            <Link href="/" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-black/5 transition-colors">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <HomeLogo className="h-12 sm:h-14 w-auto" />
            </Link>
            <nav className="hidden sm:flex items-center gap-4 sm:gap-6 text-sm">
              <Link href="/services" className="hover:text-blue-600">Services</Link>
              <Link href="/journey" className="hover:text-blue-600">Your Journey</Link>
              <Link href="/team" className="hover:text-blue-600">Team</Link>
              <Link href="/projects" className="hover:text-blue-600">Projects</Link>
              <Link href="/admin" className="px-3 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-800">Admin</Link>
            </nav>
            <MobileNav />
          </div>
        </header>
        {children}
        <ContactWidget />
        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600">
            <div>Bangalore  +91-6361867464  contact.arivuhomes@gmail.com</div>
            <div className="mt-1">© {new Date().getFullYear()} Arivu Homes Private Limited</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
