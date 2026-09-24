"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoIcon } from "@/components/logo";

export function AuthShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { dict } = useLocale();

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-gradient-to-br from-primary-800 to-primary-600 p-10 text-white lg:flex">
        <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
          <LogoIcon size={36} />
          <span dir="ltr">{dict.meta.siteName}</span>
        </Link>
        <div className="space-y-6">
          <p className="text-lg font-semibold opacity-90">{dict.meta.tagline}</p>
          <p className="whitespace-pre-line text-sm leading-7 opacity-90">
            {dict.auth.loginSubtitle}
          </p>
        </div>
        <p className="text-xs opacity-70">
          {dict.meta.siteName} — {dict.meta.tagline}
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-10 sm:px-16">
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-primary-700">
            <LogoIcon size={28} />
            <span dir="ltr">{dict.meta.siteName}</span>
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="mx-auto hidden w-full max-w-md justify-end lg:flex">
          <LanguageSwitcher />
        </div>
        <div className="mx-auto w-full max-w-md">
          <h1 className="mt-6 text-2xl font-bold">{title}</h1>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
