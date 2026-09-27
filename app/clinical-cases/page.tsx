import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getPublishedCases } from "@/lib/clinical-cases/queries";
import { difficultyLabel, categoryLabel } from "@/lib/clinical-cases/labels";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function ClinicalCasesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const cases = await getPublishedCases();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold">{dict.clinicalCases.pageTitle}</h1>
          <p className="mt-2 text-sm text-muted">{dict.clinicalCases.pageIntro}</p>
        </div>

        {cases.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">{dict.clinicalCases.noCasesYet}</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <Link key={c.id} href={`/clinical-cases/${c.slug}`}>
                <Card className="h-full transition-colors hover:border-primary-300">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="primary">{categoryLabel(dict, c.category)}</Badge>
                    <Badge tone="neutral">{difficultyLabel(dict, c.difficulty)}</Badge>
                  </div>
                  <h2 className="mt-3 text-lg font-bold">
                    {locale === "ar" ? c.titleAr : c.titleEn}
                  </h2>
                  <p className="mt-2 text-sm text-muted">
                    {locale === "ar" ? c.descriptionAr : c.descriptionEn}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
