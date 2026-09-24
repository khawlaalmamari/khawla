import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAdminAction } from "@/lib/auth/audit-log";

const broadcastSchema = z.object({
  titleAr: z.string().trim().min(1).max(120),
  titleEn: z.string().trim().min(1).max(120),
  bodyAr: z.string().trim().min(1).max(1000),
  bodyEn: z.string().trim().min(1).max(1000),
  audience: z.enum(["all", "students", "admins"]),
});

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = broadcastSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { titleAr, titleEn, bodyAr, bodyEn, audience } = parsed.data;

  const recipients = await prisma.user.findMany({
    where: audience === "all" ? {} : { role: audience === "admins" ? "admin" : "student" },
    select: { id: true },
  });

  if (recipients.length > 0) {
    await prisma.notification.createMany({
      data: recipients.map((r) => ({ userId: r.id, titleAr, titleEn, bodyAr, bodyEn })),
    });
  }

  await logAdminAction({
    adminId: admin.id,
    action: "notification.broadcast",
    targetType: "notification",
    detail: `${audience} (${recipients.length} ${recipients.length === 1 ? "recipient" : "recipients"}): ${titleEn}`,
  });

  return NextResponse.json({ ok: true, recipientCount: recipients.length });
}
