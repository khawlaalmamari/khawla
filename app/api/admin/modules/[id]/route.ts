import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAdminAction } from "@/lib/auth/audit-log";
import { notifyAllStudents } from "@/lib/notifications/notify-students";

const patchSchema = z.object({ isPublished: z.boolean() });

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const before = await prisma.module.findUnique({ where: { id }, select: { isPublished: true } });

  const mod = await prisma.module.update({
    where: { id },
    data: { isPublished: parsed.data.isPublished },
  });

  await logAdminAction({
    adminId: admin.id,
    action: mod.isPublished ? "module.publish" : "module.unpublish",
    targetType: "module",
    targetId: mod.id,
    detail: mod.titleEn,
  });

  // Only alert students the first time a module becomes available, not
  // every toggle (and never when it's being hidden).
  if (mod.isPublished && before && !before.isPublished) {
    await notifyAllStudents({
      titleAr: "موديل جديد متاح الآن",
      titleEn: "New module available",
      bodyAr: `تمت إتاحة موديل "${mod.titleAr}" — يمكنك البدء بدراسته الآن.`,
      bodyEn: `The "${mod.titleEn}" module is now available — you can start studying it now.`,
    });
  }

  return NextResponse.json({ module: { id: mod.id, isPublished: mod.isPublished } });
}
