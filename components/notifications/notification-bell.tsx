"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/locale-provider";

export type BellNotification = {
  id: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  read: boolean;
  createdAt: string;
  senderRole: "admin" | "student" | null;
};

export function NotificationBell({ notifications }: { notifications: BellNotification[] }) {
  const { dict, locale } = useLocale();
  const [items, setItems] = useState(notifications);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount = items.filter((n) => !n.read).length;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  async function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
    } catch {
      // Best-effort: a failed request just leaves it unread server-side.
    }
  }

  function senderLabel(n: BellNotification) {
    if (n.senderRole === "admin") return dict.notif.fromAdmin;
    if (n.senderRole === "student") return dict.notif.fromStudent;
    return dict.notif.system;
  }

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.notif.bellLabel}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface hover:text-primary-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c.5-1 2-2.5 2-6.5Z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -end-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute end-0 z-50 mt-2 w-80 max-w-[90vw] overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-bold">{dict.notif.title}</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted">{dict.notif.empty}</p>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => !n.read && markRead(n.id)}
                      className={`block w-full px-4 py-3 text-start text-sm transition-colors ${
                        n.read ? "hover:bg-surface" : "bg-primary-50 hover:bg-primary-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />}
                        <p className="font-medium">{locale === "ar" ? n.titleAr : n.titleEn}</p>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                        {locale === "ar" ? n.bodyAr : n.bodyEn}
                      </p>
                      <p className="mt-1 text-[11px] text-muted/80">{senderLabel(n)}</p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
