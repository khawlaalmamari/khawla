import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";

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

  const questions = mod.questions.map((q) => ({
    id: q.id,
    type: q.type,
    text: locale === "ar" ? q.textAr : q.textEn,
    choices: (JSON.parse(q.choicesJson) as { id: string; en: string; ar: string }[]).map((c) => ({
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
