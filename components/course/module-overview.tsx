import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleBySlug } from "@/lib/content/queries";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/lib/auth/session";
import { prisma } from "@/lib/db";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { MarkDoneButton } from "@/components/course/mark-done-button";
import { ModuleMindMap } from "@/components/course/module-mind-map";
import { buildModuleMindMap } from "@/lib/mindmap/build-module-mindmap";

export async function ModuleOverview({
  courseSlug,
  moduleSlug,
  userId,
}: {
  courseSlug: "anatomy" | "physiology";
  moduleSlug: string;
  userId: string;
}) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const mod = await getModuleBySlug(moduleSlug);

  if (!mod || mod.course.slug !== courseSlug) notFound();

  const title = locale === "ar" ? mod.titleAr : mod.titleEn;
  const description = locale === "ar" ? mod.descriptionAr : mod.descriptionEn;

  const currentUser = await getCurrentUser();
  const isAdmin = currentUser?.role === "admin";

  if (mod.lessons.length === 0) {
    return (
      <div>
        <Link href={`/${courseSlug}`} className="text-sm text-primary-700 hover:underline">
          ← {locale === "ar" ? mod.course.titleAr : mod.course.titleEn}
        </Link>
        <h1 className="mt-3 text-2xl font-bold">{title}</h1>
        <Card className="mt-6">
          <p className="text-sm text-muted">
            {locale === "ar"
              ? "محتوى هذا الموديل قيد الإعداد حاليًا من قبل فريق المحتوى الطبي، وسيتوفر قريبًا."
              : "This module's content is currently being developed by the medical content team and will be available soon."}
          </p>
        </Card>
      </div>
    );
  }

  if (!mod.isPublished && !isAdmin) {
    return (
      <div>
        <Link href={`/${courseSlug}`} className="text-sm text-primary-700 hover:underline">
          ← {locale === "ar" ? mod.course.titleAr : mod.course.titleEn}
        </Link>
        <h1 className="mt-3 text-2xl font-bold">{title}</h1>
        <Card className="mt-6">
          <p className="text-sm text-muted">
            {locale === "ar"
              ? "هذا الموديل غير متاح حاليًا. يرجى المحاولة لاحقًا."
              : "This module isn't available right now. Please check back later."}
          </p>
        </Card>
      </div>
    );
  }

  const progress = await prisma.progressRecord.findUnique({
    where: { userId_moduleId: { userId, moduleId: mod.id } },
  });

  const lastAttempt = await prisma.quizAttempt.findFirst({
    where: { userId, moduleId: mod.id, completedAt: { not: null } },
    orderBy: { completedAt: "desc" },
  });

  const lockedByQuiz =
    !!progress?.bestScorePercent && progress.bestScorePercent >= mod.passThreshold;

  return (
    <div>
      <Link href={`/${courseSlug}`} className="text-sm text-primary-700 hover:underline">
        ← {locale === "ar" ? mod.course.titleAr : mod.course.titleEn}
      </Link>

      {!mod.isPublished && isAdmin && (
        <div className="mt-4 rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-accent-700">
          {locale === "ar"
            ? "هذا الموديل مخفي حاليًا عن الطالبات (تظهر لك أنت فقط بصفتك مديرة)."
            : "This module is currently hidden from students (visible to you only as an admin)."}
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Badge tone={progress?.status === "COMPLETED" ? "success" : "primary"}>
          {progress?.status === "COMPLETED"
            ? dict.course.completed
            : progress?.status === "IN_PROGRESS"
              ? dict.course.inProgress
              : dict.course.notStarted}
        </Badge>
      </div>
      <p className="mt-2 max-w-2xl text-sm text-muted">{description}</p>

      <h2 className="mt-8 text-lg font-bold">{dict.course.lessons}</h2>
      <ol className="mt-4 space-y-3">
        {mod.lessons.map((lesson, i) => (
          <li key={lesson.id}>
            <Link href={`/${courseSlug}/${mod.slug}/${lesson.slug}`}>
              <Card className="flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-md">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-800">
                  {i + 1}
                </span>
                <span className="font-medium">
                  {locale === "ar" ? lesson.titleAr : lesson.titleEn}
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ol>

      <h2 className="mt-8 text-lg font-bold">{dict.course.mindMapTitle}</h2>
      <div className="mt-4">
        <ModuleMindMap
          data={buildModuleMindMap({
            id: mod.id,
            titleAr: mod.titleAr,
            titleEn: mod.titleEn,
            lessons: mod.lessons.map((l) => ({
              id: l.id,
              titleAr: l.titleAr,
              titleEn: l.titleEn,
              termsJson: l.termsJson,
            })),
          })}
        />
      </div>

      <Card className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{dict.course.takeQuiz}</p>
          {lastAttempt && (
            <p className="mt-1 text-sm text-muted">
              {dict.dashboard.averageScore}: {lastAttempt.scorePercent}% —{" "}
              {lastAttempt.passed ? dict.quiz.passed : dict.quiz.failed}
            </p>
          )}
        </div>
        <ButtonLink href={`/${courseSlug}/${mod.slug}/quiz`}>{dict.course.takeQuiz}</ButtonLink>
      </Card>

      <Card className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold">{dict.course.moduleCompletionTitle}</p>
          <p className="mt-1 max-w-md text-sm text-muted">
            {progress?.status === "COMPLETED" && lockedByQuiz
              ? dict.course.doneAuto
              : progress?.status === "COMPLETED"
                ? dict.course.doneManualHint
                : dict.course.doneIntro}
          </p>
        </div>
        <MarkDoneButton
          moduleSlug={mod.slug}
          initialStatus={progress?.status ?? "NOT_STARTED"}
          lockedByQuiz={lockedByQuiz}
        />
      </Card>
    </div>
  );
}
