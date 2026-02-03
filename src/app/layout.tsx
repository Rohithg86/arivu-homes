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
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 group transition-all duration-300">
                <div className="relative flex items-center bg-gray-900 text-white p-2 rounded-lg shadow-sm group-hover:bg-blue-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <HomeLogo className="h-8 sm:h-10 w-auto" />
              </Link>
              <div className="flex flex-col border-l border-gray-200 pl-4 py-1">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 leading-none">GSTIN</span>
                <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-600 mt-1">PENDING...</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-10 text-[12px] font-black text-gray-900 uppercase tracking-[0.2em]">
              <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
              <Link href="/boq" className="hover:text-blue-600 transition-colors">BOQ Calculator</Link>
              <Link href="/team" className="hover:text-blue-600 transition-colors">Team</Link>
              <Link href="/projects" className="hover:text-blue-600 transition-colors">Projects</Link>
              <Link href="/admin" className="hover:text-blue-600 transition-colors">Admin</Link>
            </nav>
            <MobileNav />
          </div>
        </header>
        {children}
        <ContactWidget />
        <footer className="border-t mt-16">
          <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600">
            <div>Bangalore  <a href="tel:+916361867464" className="hover:text-blue-600 transition-colors">+91-6361867464</a>  <a href="mailto:contact.arivuhomes@gmail.com" className="hover:text-blue-600 transition-colors">contact.arivuhomes@gmail.com</a></div>
            <div className="mt-1">© {new Date().getFullYear()} Arivu Homes Private Limited</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
