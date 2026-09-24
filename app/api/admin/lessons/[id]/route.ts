import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { adminUpdateLessonSchema } from "@/lib/auth/schemas";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAdminAction } from "@/lib/auth/audit-log";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = adminUpdateLessonSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { objectivesEn, objectivesAr, ...rest } = parsed.data;

  const lesson = await prisma.lesson.update({
    where: { id },
    data: {
      ...rest,
      objectivesEn: JSON.stringify(objectivesEn),
      objectivesAr: JSON.stringify(objectivesAr),
    },
  });

  await logAdminAction({
    adminId: admin.id,
    action: "lesson.update",
    targetType: "lesson",
    targetId: lesson.id,
    detail: lesson.titleEn,
  });

  return NextResponse.json({ lesson: { id: lesson.id } });
}
