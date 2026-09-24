"use client";

import { useLocale } from "@/components/locale-provider";

/**
 * Best-effort cleanup of the external chat widget's own client-side state
 * (cookies + storage keys it set, plus closing it if open) so the next
 * person on this device doesn't see the previous student's conversation.
 * Only ever touches keys/cookies whose name contains "tidio" — nothing
 * belonging to this site or any other provider is affected.
 */
function resetChatWidgetState() {
  try {
    document.cookie.split(";").forEach((entry) => {
      const name = entry.split("=")[0]?.trim();
      if (name && /tidio/i.test(name)) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }
    });
    for (const store of [window.localStorage, window.sessionStorage]) {
      Object.keys(store)
        .filter((key) => /tidio/i.test(key))
        .forEach((key) => store.removeItem(key));
    }
    (
      window as unknown as { tidioChatApi?: { close?: () => void } }
    ).tidioChatApi?.close?.();
  } catch {
    // Best-effort only — never block logout on this.
  }
}

export function LogoutButton() {
  const { dict } = useLocale();

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    resetChatWidgetState();
    // A full navigation (not client-side router.push) so the chat widget's
    // script re-initializes from scratch with no leftover identity or
    // in-memory conversation state from this session.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- intentional hard reload, see comment above
    window.location.href = "/";
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
