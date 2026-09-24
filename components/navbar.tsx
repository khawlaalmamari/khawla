import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { LanguageSwitcher } from "@/components/language-switcher";
import { LogoutButton } from "@/components/logout-button";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NotificationBell } from "@/components/notifications/notification-bell";

export async function Navbar() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const user = await getCurrentUser();

  const notifications = user
    ? await prisma.notification.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { sender: { select: { role: true } } },
      })
    : [];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/">
          <Logo wordmark={dict.meta.siteName} />
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {user && (
            <>
              <Link href="/anatomy" className="hover:text-primary-700">
                {dict.nav.anatomy}
              </Link>
              <Link href="/physiology" className="hover:text-primary-700">
                {dict.nav.physiology}
              </Link>
              <Link href="/study-planner" className="hover:text-primary-700">
                {dict.nav.studyPlanner}
              </Link>
              <Link href="/dashboard" className="hover:text-primary-700">
                {dict.nav.dashboard}
              </Link>
            </>
          )}
          {user?.role === "admin" && (
            <Link href="/admin" className="hover:text-primary-700">
              {dict.nav.admin}
            </Link>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user && (
            <NotificationBell
              notifications={notifications.map((n) => ({
                id: n.id,
                titleAr: n.titleAr,
                titleEn: n.titleEn,
                bodyAr: n.bodyAr,
                bodyEn: n.bodyEn,
                read: n.read,
                createdAt: n.createdAt.toISOString(),
                senderRole: (n.sender?.role as "admin" | "student" | undefined) ?? null,
              }))}
            />
          )}
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
