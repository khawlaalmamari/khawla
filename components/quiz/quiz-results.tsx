import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

export async function QuizResults({
  courseSlug,
  moduleSlug,
  attemptId,
  userId,
}: {
  courseSlug: string;
  moduleSlug: string;
  attemptId: string;
  userId: string;
}) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  const attempt = await prisma.quizAttempt.findUnique({
    where: { id: attemptId },
    include: {
      module: true,
      answers: { include: { question: true } },
    },
  });

  if (!attempt || attempt.userId !== userId || attempt.module.slug !== moduleSlug) {
    notFound();
  }

  return (
    <div>
      <Link
        href={`/${courseSlug}/${moduleSlug}`}
        className="text-sm text-primary-700 hover:underline"
      >
        ← {dict.course.backToModule}
      </Link>

      <Card className={`mt-4 text-center ${attempt.passed ? "border-green-300 bg-green-50" : "border-danger/30 bg-danger/5"}`}>
        <h1 className="text-xl font-bold">{dict.quiz.resultsTitle}</h1>
        <p className="mt-2 text-4xl font-extrabold">
          {attempt.scorePercent}%
        </p>
        <Badge tone={attempt.passed ? "success" : "neutral"}>
          {attempt.passed ? dict.quiz.passed : dict.quiz.failed}
        </Badge>
      </Card>

      <div className="mt-6 space-y-4">
        {attempt.answers.map((a, i) => {
          const q = a.question;
          const choices: { id: string; en: string; ar: string }[] = JSON.parse(q.choicesJson);
          const correctChoice = choices.find((c) => c.id === q.correctChoiceId);
          const selectedChoice = choices.find((c) => c.id === a.selectedChoiceId);

          return (
            <Card key={a.id} className={a.isCorrect ? "" : "border-danger/30"}>
              <p className="text-sm font-semibold text-muted">
                {dict.quiz.question} {i + 1}
              </p>
              <p className="mt-1 font-medium">{locale === "ar" ? q.textAr : q.textEn}</p>

              <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted">{dict.quiz.yourAnswer}: </span>
                  <span className={a.isCorrect ? "text-green-700" : "text-danger"}>
                    {locale === "ar" ? selectedChoice?.ar : selectedChoice?.en}
                  </span>
                </p>
                {!a.isCorrect && (
                  <p>
                    <span className="text-muted">{dict.quiz.correctAnswer}: </span>
                    <span className="text-green-700">
                      {locale === "ar" ? correctChoice?.ar : correctChoice?.en}
                    </span>
                  </p>
                )}
              </div>

              <p className="mt-3 rounded-lg bg-surface px-3 py-2 text-sm leading-6">
                <span className="font-semibold">{dict.quiz.explanation}: </span>
                {locale === "ar" ? q.explanationAr : q.explanationEn}
              </p>

              {q.lessonId && (
                <Link
                  href={`/${courseSlug}/${moduleSlug}`}
                  className="mt-2 inline-block text-xs text-primary-700 hover:underline"
                >
                  {dict.quiz.goToLesson}
                </Link>
              )}
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`/${courseSlug}/${moduleSlug}/quiz`} variant={attempt.passed ? "outline" : "primary"}>
          {dict.quiz.retakeQuiz}
        </ButtonLink>
        <ButtonLink href={`/${courseSlug}`} variant="ghost">
          {dict.dashboard.continueLearning}
        </ButtonLink>
      </div>
    </div>
  );
}
