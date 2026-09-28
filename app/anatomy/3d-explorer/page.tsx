import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/navbar";
import { AnatomyExplorer } from "@/components/anatomy-3d/anatomy-explorer";

// Publicly browsable, matching the existing /anatomy course page's own
// convention (see app/anatomy/page.tsx) — no account required to explore.
export default async function Anatomy3DExplorerPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <Link href="/anatomy" className="text-sm text-primary-600 hover:underline">
          &larr; {dict.nav.anatomy}
        </Link>

        <div>
          <h1 className="text-2xl font-bold">{dict.anatomy3D.pageTitle}</h1>
          <p className="mt-2 text-sm text-muted">{dict.anatomy3D.pageIntro}</p>
        </div>

        <AnatomyExplorer dict={dict} locale={locale} />
      </main>
    </div>
  );
}
