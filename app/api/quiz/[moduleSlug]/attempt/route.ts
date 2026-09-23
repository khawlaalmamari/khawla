import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

const submitSchema = z.object({
  answers: z.array(
    z.object({ questionId: z.string(), selectedChoiceId: z.string() }),
  ),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ moduleSlug: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { moduleSlug } = await params;
  const body = await req.json().catch(() => null);
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const mod = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: { questions: true },
  });
  if (!mod || mod.questions.length === 0) {
    return NextResponse.json({ error: "notFound" }, { status: 404 });
  }

  const questionById = new Map(mod.questions.map((q) => [q.id, q]));
  const { answers } = parsed.data;

  let correctCount = 0;
  const gradedAnswers = answers
    .filter((a) => questionById.has(a.questionId))
    .map((a) => {
      const question = questionById.get(a.questionId)!;
      const isCorrect = question.correctChoiceId === a.selectedChoiceId;
      if (isCorrect) correctCount += 1;
      return { ...a, isCorrect, question };
    });

  // Score out of the questions actually presented in this attempt (the
  // module's question bank can be larger than any one quiz sampling).
  const totalQuestions = gradedAnswers.length;
  const scorePercent =
    totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
  const passed = scorePercent >= mod.passThreshold;

  const attempt = await prisma.quizAttempt.create({
    data: {
      userId: user.id,
      moduleId: mod.id,
      scorePercent,
      passed,
      completedAt: new Date(),
      answers: {
        create: gradedAnswers.map((a) => ({
          questionId: a.questionId,
          selectedChoiceId: a.selectedChoiceId,
          isCorrect: a.isCorrect,
        })),
      },
    },
  });

  const existing = await prisma.progressRecord.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId: mod.id } },
  });

  await prisma.progressRecord.upsert({
    where: { userId_moduleId: { userId: user.id, moduleId: mod.id } },
    update: {
      status: passed ? "COMPLETED" : "IN_PROGRESS",
      bestScorePercent: Math.max(scorePercent, existing?.bestScorePercent ?? 0),
      completedAt: passed ? new Date() : existing?.completedAt ?? null,
    },
    create: {
      userId: user.id,
      moduleId: mod.id,
      status: passed ? "COMPLETED" : "IN_PROGRESS",
      bestScorePercent: scorePercent,
      completedAt: passed ? new Date() : null,
    },
  });

  if (passed) {
    await prisma.notification.create({
      data: {
        userId: user.id,
        titleEn: "Module completed!",
        titleAr: "تم إكمال الموديل!",
        bodyEn: `You passed the "${mod.titleEn}" quiz with a score of ${scorePercent}%.`,
        bodyAr: `لقد اجتزت اختبار "${mod.titleAr}" بدرجة ${scorePercent}%.`,
      },
    });
  }

  // Topics needing review: lessons behind any incorrectly answered question.
  const reviewLessonIds = [
    ...new Set(
      gradedAnswers
        .filter((a) => !a.isCorrect && a.question.lessonId)
        .map((a) => a.question.lessonId as string),
    ),
  ];

  const reviewLessons = reviewLessonIds.length
    ? await prisma.lesson.findMany({
        where: { id: { in: reviewLessonIds } },
        select: { slug: true, titleEn: true, titleAr: true },
      })
    : [];

  return NextResponse.json({
    attemptId: attempt.id,
    scorePercent,
    passed,
    passThreshold: mod.passThreshold,
    reviewLessons,
  });
}
