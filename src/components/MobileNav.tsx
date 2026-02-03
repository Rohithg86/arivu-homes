"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/journey", label: "Your Journey" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/boq", label: "BOQ Calculator" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      const t = e.target as Node | null;
      if (panelRef.current && t && !panelRef.current.contains(t)) setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    return () => window.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div className="relative sm:hidden" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-900 shadow-sm hover:shadow-md active:scale-95 transition-all text-white text-sm font-semibold"
        aria-expanded={open}
        aria-label="Open menu"
      >
        <span>Explore</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-gray-100 bg-white shadow-2xl overflow-hidden ring-1 ring-black ring-opacity-5 z-[100] animate-in fade-in zoom-in duration-200">
          <div className="grid divide-y divide-gray-50 p-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3.5 text-sm font-bold text-gray-900 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

