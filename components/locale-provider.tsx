"use client";

import { createContext, useContext, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { localeCookieName, type Locale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries";

type LocaleContextValue = {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(locale);
  const [isPending, startTransition] = useTransition();

  function setLocale(next: Locale) {
    document.cookie = `${localeCookieName}=${next}; path=/; max-age=31536000; samesite=lax`;
    setCurrent(next);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <LocaleContext.Provider
      value={{ locale: current, dict: getDictionary(current), setLocale, isPending }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
