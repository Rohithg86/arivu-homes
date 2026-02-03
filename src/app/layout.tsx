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
              <Link href="/" className="flex items-center gap-2 py-1.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group -ml-2 px-2">
                <div className="relative flex items-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-400 rounded-full animate-pulse border-2 border-white"></div>
                </div>
                <HomeLogo className="h-10 sm:h-12 w-auto" />
              </Link>
              <div className="flex flex-col border-l pl-4 ml-1">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-blue-600 block leading-none">GSTIN</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-gray-900">Pending...</span>
              </div>
            </div>
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
