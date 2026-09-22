import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/lib/auth/session";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoutButton } from "@/components/logout-button";
import { ButtonLink } from "@/components/ui/button";

export async function Navbar() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-extrabold text-primary-700">
          {dict.meta.siteName}
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/anatomy" className="hover:text-primary-700">
            {dict.nav.anatomy}
          </Link>
          <Link href="/physiology" className="hover:text-primary-700">
            {dict.nav.physiology}
          </Link>
          <Link href="/study-planner" className="hover:text-primary-700">
            {dict.nav.studyPlanner}
          </Link>
          {user && (
            <Link href="/dashboard" className="hover:text-primary-700">
              {dict.nav.dashboard}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden text-sm font-medium hover:text-primary-700 sm:inline"
              >
                {dict.nav.login}
              </Link>
              <ButtonLink href="/signup" className="!px-4 !py-2 text-sm">
                {dict.nav.signup}
              </ButtonLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
