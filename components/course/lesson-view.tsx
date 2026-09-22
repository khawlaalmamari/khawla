import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getLessonBySlugs } from "@/lib/content/queries";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export async function LessonView({
  courseSlug,
  moduleSlug,
  lessonSlug,
}: {
  courseSlug: "anatomy" | "physiology";
  moduleSlug: string;
  lessonSlug: string;
}) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const result = await getLessonBySlugs(moduleSlug, lessonSlug);

  if (!result) notFound();
  const { lesson, module: mod, prevLesson, nextLesson } = result;

  const objectives: string[] = JSON.parse(
    locale === "ar" ? lesson.objectivesAr : lesson.objectivesEn,
  );
  const terms: { en: string; ar: string }[] = JSON.parse(lesson.termsJson);
  const references: string[] = JSON.parse(lesson.referencesJson);
  const content = locale === "ar" ? lesson.contentAr : lesson.contentEn;
  const summary = locale === "ar" ? lesson.summaryAr : lesson.summaryEn;

  return (
    <div>
      <Link
        href={`/${courseSlug}/${mod.slug}`}
        className="text-sm text-primary-700 hover:underline"
      >
        ← {dict.course.backToModule}
      </Link>

      <h1 className="mt-3 text-2xl font-bold">
        {locale === "ar" ? lesson.titleAr : lesson.titleEn}
      </h1>

      <Card className="mt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary-700">
          {dict.course.objectives}
        </h2>
        <ul className="mt-3 list-disc space-y-1 ps-5 text-sm leading-6">
          {objectives.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </Card>

      <article className="prose prose-sm mt-6 max-w-none rounded-2xl border border-border bg-surface p-6 leading-7 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:first:mt-0 [&_li]:my-1 [&_p]:my-3 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:ps-5">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>

      <Card className="mt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary-700">
          {dict.course.keyTerms}
        </h2>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {terms.map((t) => (
            <div key={t.en} className="rounded-lg bg-background px-3 py-2 text-sm">
              <dt className="font-semibold">{locale === "ar" ? t.ar : t.en}</dt>
              <dd className="text-muted">{locale === "ar" ? t.en : t.ar}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card className="mt-6 border-primary-200 bg-primary-50">
        <h2 className="text-sm font-bold uppercase tracking-wide text-primary-800">
          {dict.course.summary}
        </h2>
        <p className="mt-2 text-sm leading-6 text-primary-900">{summary}</p>
      </Card>

      <Card className="mt-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
          {dict.course.references}
        </h2>
        <ul className="mt-3 space-y-1 text-xs text-muted">
          {references.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </Card>

      <div className="mt-8 flex items-center justify-between gap-4">
        {prevLesson ? (
          <ButtonLink variant="outline" href={`/${courseSlug}/${mod.slug}/${prevLesson.slug}`}>
            {dict.quiz.previous}
          </ButtonLink>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <ButtonLink href={`/${courseSlug}/${mod.slug}/${nextLesson.slug}`}>
            {dict.quiz.next}
          </ButtonLink>
        ) : (
          <ButtonLink href={`/${courseSlug}/${mod.slug}/quiz`}>{dict.course.takeQuiz}</ButtonLink>
        )}
      </div>
    </div>
  );
}
