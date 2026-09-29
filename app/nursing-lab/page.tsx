import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getAllSkills } from "@/lib/nursing-lab/skills";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Phase 3B-4 — Virtual Nursing Lab Foundation. Requires an account, same as
// Clinical Cases (see app/clinical-cases/page.tsx): this is per-student
// practice, not publicly browsable course content like Anatomy.
export default async function NursingLabPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const skills = getAllSkills();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold">{dict.nursingLab.pageTitle}</h1>
          <p className="mt-2 text-sm text-muted">{dict.nursingLab.pageIntro}</p>
        </div>

        {skills.length === 0 ? (
          <Card>
            <p className="text-sm text-muted">{dict.nursingLab.noSkillsYet}</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <Link key={skill.id} href={`/nursing-lab/${skill.id}`}>
                <Card className="h-full transition-colors hover:border-primary-300">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={skill.difficulty === "BEGINNER" ? "success" : "accent"}>
                      {skill.difficulty === "BEGINNER"
                        ? dict.clinicalCases.difficultyBeginner
                        : dict.clinicalCases.difficultyIntermediate}
                    </Badge>
                    <Badge tone="neutral">
                      {dict.clinicalCases.durationMinutes.replace("{minutes}", String(skill.estimatedMinutes))}
                    </Badge>
                  </div>
                  <h2 className="mt-3 text-lg font-bold">{locale === "ar" ? skill.titleAr : skill.titleEn}</h2>
                  <p className="mt-2 text-sm text-muted">{locale === "ar" ? skill.descriptionAr : skill.descriptionEn}</p>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
