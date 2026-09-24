import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { adminUpdateLessonSchema } from "@/lib/auth/schemas";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAdminAction } from "@/lib/auth/audit-log";
import { notifyAllStudents } from "@/lib/notifications/notify-students";

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

  await notifyAllStudents({
    titleAr: "تحديث في محتوى الدرس",
    titleEn: "Lesson content updated",
    bodyAr: `تم تحديث درس "${lesson.titleAr}" — راجع المحتوى الجديد.`,
    bodyEn: `The lesson "${lesson.titleEn}" was updated — check out the new content.`,
  });

  return NextResponse.json({ lesson: { id: lesson.id } });
}
