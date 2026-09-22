import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

const schema = z.object({
  courseId: z.string(),
  examDate: z.string(),
  dailyHours: z.number().min(0.5).max(16),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { courseId, examDate, dailyHours } = parsed.data;

  const existing = await prisma.studyPlan.findFirst({
    where: { userId: user.id, courseId },
  });

  const plan = existing
    ? await prisma.studyPlan.update({
        where: { id: existing.id },
        data: { examDate: new Date(examDate), dailyHours },
      })
    : await prisma.studyPlan.create({
        data: { userId: user.id, courseId, examDate: new Date(examDate), dailyHours },
      });

  return NextResponse.json({ plan });
}
