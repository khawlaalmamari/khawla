import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getSkillById } from "@/lib/nursing-lab/skills";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { SkillPractice } from "@/components/nursing-lab/skill-practice";

export default async function NursingLabSkillPage({ params }: { params: Promise<{ skillId: string }> }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { skillId } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const skill = getSkillById(skillId);

  if (!skill) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
          <Card>
            <p className="text-sm text-muted">{dict.nursingLab.skillNotAvailable}</p>
            <Link href="/nursing-lab" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
              {dict.nursingLab.backToLab}
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <Link href="/nursing-lab" className="text-sm text-primary-600 hover:underline">
          &larr; {dict.nursingLab.backToLab}
        </Link>

        <SkillPractice dict={dict} locale={locale} skill={skill} />
      </main>
    </div>
  );
}
