import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAdminAction } from "@/lib/auth/audit-log";

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

  return NextResponse.json({ module: { id: mod.id, isPublished: mod.isPublished } });
}
