"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";

export function LogoutButton() {
  const router = useRouter();
  const { dict } = useLocale();

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={onLogout}
      className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-foreground"
    >
      {dict.nav.logout}
    </button>
  );
}
