"use client";

import { useLocale } from "@/components/locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale, dict } = useLocale();

  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-sm">
      <button
        type="button"
        onClick={() => setLocale("ar")}
        aria-pressed={locale === "ar"}
        className={`rounded-full px-3 py-1 transition-colors ${
          locale === "ar"
            ? "bg-primary-600 text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        {dict.common.arabic}
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={`rounded-full px-3 py-1 transition-colors ${
          locale === "en"
            ? "bg-primary-600 text-white"
            : "text-muted hover:text-foreground"
        }`}
      >
        {dict.common.english}
      </button>
    </div>
  );
}
