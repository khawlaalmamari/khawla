"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function CoursesDropdown({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const items = [
    { href: "/anatomy", label: dict.nav.anatomy, icon: "🦴" },
    { href: "/physiology", label: dict.nav.physiology, icon: "🫀" },
  ];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm font-medium hover:text-primary-700"
      >
        {dict.nav.courses}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <div
        className={`absolute start-0 z-50 mt-2 w-56 origin-top rounded-xl border border-border bg-background p-2 shadow-lg transition-all duration-200 ease-out ${
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-700"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-base">
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
