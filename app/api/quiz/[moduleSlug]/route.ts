import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";

// Fisher-Yates shuffle. Used so retaking a quiz doesn't show questions and
// answer choices in the same memorizable order each time.
function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// A module's question bank can hold more questions than one attempt shows —
// sampling a random subset (on top of shuffling) means retaking a quiz can
// genuinely surface different questions, not just a different order.
const QUIZ_LENGTH = 15;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ moduleSlug: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { moduleSlug } = await params;
  const locale = await getServerLocale();

  const mod = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    include: { questions: { orderBy: { order: "asc" } } },
  });

  if (!mod || mod.questions.length === 0) {
    return NextResponse.json({ error: "notFound" }, { status: 404 });
  }

  const sampled = shuffle(mod.questions).slice(0, QUIZ_LENGTH);
  const questions = sampled.map((q) => ({
    id: q.id,
    type: q.type,
    text: locale === "ar" ? q.textAr : q.textEn,
    choices: shuffle(
      JSON.parse(q.choicesJson) as { id: string; en: string; ar: string }[],
    ).map((c) => ({
      id: c.id,
      label: locale === "ar" ? c.ar : c.en,
    })),
  }));

  return NextResponse.json({
    moduleId: mod.id,
    moduleTitle: locale === "ar" ? mod.titleAr : mod.titleEn,
    passThreshold: mod.passThreshold,
    questions,
  });
}
