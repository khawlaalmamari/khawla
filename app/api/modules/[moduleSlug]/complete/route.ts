import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

const bodySchema = z.object({ completed: z.boolean() });

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ moduleSlug: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { moduleSlug } = await params;
  const body = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const mod = await prisma.module.findUnique({
    where: { slug: moduleSlug },
    select: { id: true, passThreshold: true },
  });
  if (!mod) return NextResponse.json({ error: "notFound" }, { status: 404 });

  const existing = await prisma.progressRecord.findUnique({
    where: { userId_moduleId: { userId: user.id, moduleId: mod.id } },
  });

  // A module completed by passing its quiz can't be manually un-marked —
  // that completion reflects a real, graded result.
  const lockedByQuiz =
    !!existing?.bestScorePercent && existing.bestScorePercent >= mod.passThreshold;

  if (!parsed.data.completed) {
    if (lockedByQuiz) {
      return NextResponse.json({ error: "lockedByQuiz" }, { status: 409 });
    }
    if (!existing) {
      return NextResponse.json({ status: "NOT_STARTED" });
    }
    const record = await prisma.progressRecord.update({
      where: { userId_moduleId: { userId: user.id, moduleId: mod.id } },
      data: { status: "IN_PROGRESS", completedAt: null },
    });
    return NextResponse.json({ status: record.status });
  }

  const record = await prisma.progressRecord.upsert({
    where: { userId_moduleId: { userId: user.id, moduleId: mod.id } },
    update: { status: "COMPLETED", completedAt: new Date() },
    create: { userId: user.id, moduleId: mod.id, status: "COMPLETED", completedAt: new Date() },
  });

  return NextResponse.json({ status: record.status });
}
