"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type NavItem = { href: string; label: string };

const NAV: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/journey", label: "Client Journey" },
  { href: "/team", label: "Team" },
  { href: "/projects", label: "Projects" },
  { href: "/boq", label: "BOQ Calculator" },
  { href: "/admin-login", label: "Admin Login" },
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
        className="px-3 py-2 rounded bg-gray-900 text-white text-sm"
        aria-expanded={open}
        aria-label="Open menu"
      >
        Explore
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white shadow-lg overflow-hidden">
          <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
            Navigate
          </div>
          <div className="grid">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-3 text-sm hover:bg-gray-50"
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

