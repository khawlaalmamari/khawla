"use client";

import { useState } from "react";
import { useLocale } from "@/components/locale-provider";

export type DashboardNotification = {
  id: string;
  titleAr: string;
  titleEn: string;
  bodyAr: string;
  bodyEn: string;
  read: boolean;
};

export function NotificationList({ notifications }: { notifications: DashboardNotification[] }) {
  const { dict, locale } = useLocale();
  const [items, setItems] = useState(notifications);

  async function markRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    try {
      await fetch(`/api/notifications/${id}/read`, { method: "PATCH" });
    } catch {
      // Best-effort: a failed request just leaves it unread server-side;
      // the next dashboard load will show it as unread again.
    }
  }

  if (items.length === 0) {
    return <p className="mt-4 text-sm text-muted">{dict.dashboard.noNotifications}</p>;
  }

  return (
    <ul className="mt-4 space-y-2">
      {items.map((n) => (
        <li key={n.id}>
          <button
            type="button"
            onClick={() => !n.read && markRead(n.id)}
            className={`w-full rounded-lg px-3 py-2 text-start text-sm transition-colors ${
              n.read ? "bg-surface" : "bg-primary-50 hover:bg-primary-100"
            }`}
          >
            <div className="flex items-center gap-2">
              {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />}
              <p className="font-medium">{locale === "ar" ? n.titleAr : n.titleEn}</p>
            </div>
            <p className="mt-0.5 text-xs text-muted">{locale === "ar" ? n.bodyAr : n.bodyEn}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
