import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { sendPasswordResetEmail } from "@/lib/auth/send-reset-email";
import { logAdminAction } from "@/lib/auth/audit-log";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, fullName: true },
  });
  if (!user) {
    return NextResponse.json({ error: "notFound" }, { status: 404 });
  }

  const { devResetUrl } = await sendPasswordResetEmail(user, req.nextUrl.origin, "admin");

  await logAdminAction({
    adminId: admin.id,
    action: "user.sendResetLink",
    targetType: "user",
    targetId: user.id,
    detail: user.email,
  });

  return NextResponse.json({ ok: true, ...(devResetUrl ? { devResetUrl } : {}) });
}
