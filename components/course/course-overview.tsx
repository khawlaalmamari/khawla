import Link from "next/link";
import { getCourseBySlug, getModuleProgressMap, hasFullContent } from "@/lib/content/queries";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export async function CourseOverview({
  courseSlug,
  userId,
}: {
  courseSlug: "anatomy" | "physiology";
  userId: string | null;
}) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const course = await getCourseBySlug(courseSlug);

  if (!course) {
    return <p className="text-danger">Course not found.</p>;
  }

  const progress = await getModuleProgressMap(userId, course.id);

  return (
    <div>
      <h1 className="text-2xl font-bold">{locale === "ar" ? course.titleAr : course.titleEn}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        {locale === "ar" ? course.descriptionAr : course.descriptionEn}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {course.modules.map((mod) => {
          const record = progress.get(mod.id);
          const available = mod.slug === "anatomy-skeletal-system"; // only fully built module for now
          const title = locale === "ar" ? mod.titleAr : mod.titleEn;
          const description = locale === "ar" ? mod.descriptionAr : mod.descriptionEn;

          const statusTone =
            record?.status === "COMPLETED"
              ? "success"
              : record?.status === "IN_PROGRESS"
                ? "primary"
                : "neutral";
          const statusLabel =
            record?.status === "COMPLETED"
              ? dict.course.completed
              : record?.status === "IN_PROGRESS"
                ? dict.course.inProgress
                : dict.course.notStarted;

          const content = (
            <Card className={`h-full ${available ? "" : "opacity-70"}`}>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                  {mod.order}
                </span>
                {available ? (
                  <Badge tone={statusTone}>{statusLabel}</Badge>
                ) : (
                  <Badge tone="accent">{locale === "ar" ? "قريبًا" : "Coming soon"}</Badge>
                )}
              </div>
              <h3 className="mt-3 text-base font-bold">{title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
            </Card>
          );

          return available ? (
            <Link key={mod.id} href={`/${courseSlug}/${mod.slug}`}>
              {content}
            </Link>
          ) : (
            <div key={mod.id} aria-disabled className="cursor-not-allowed">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { hasFullContent };
