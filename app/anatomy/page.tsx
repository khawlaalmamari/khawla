import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/navbar";
import { CourseOverview } from "@/components/course/course-overview";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

// Publicly browsable (per "Explore the Platform" on the landing page):
// anyone can see the course/module structure; opening an actual module,
// lesson, or quiz still requires an account.
export default async function AnatomyCoursePage() {
  const user = await getCurrentUser();
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <Card className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-bold">{dict.anatomy3D.pageTitle}</h2>
            <p className="mt-1 text-sm text-muted">{dict.anatomy3D.pageIntro}</p>
          </div>
          <ButtonLink href="/anatomy/3d-explorer" variant="outline">
            {dict.nav.anatomy3D}
          </ButtonLink>
        </Card>

        <CourseOverview courseSlug="anatomy" userId={user?.id ?? null} />
      </main>
    </div>
  );
}
