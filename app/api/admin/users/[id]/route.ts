import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { adminUpdateUserSchema } from "@/lib/auth/schemas";
import { requireAdmin } from "@/lib/auth/require-admin";
import { logAdminAction } from "@/lib/auth/audit-log";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = adminUpdateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const data = parsed.data;

  if (data.email || data.username) {
    const existing = await prisma.user.findFirst({
      where: {
        id: { not: id },
        OR: [
          ...(data.email ? [{ email: data.email }] : []),
          ...(data.username ? [{ username: data.username }] : []),
        ],
      },
      select: { email: true, username: true },
    });
    if (existing) {
      const field = existing.email === data.email ? "emailTaken" : "usernameTaken";
      return NextResponse.json({ error: field }, { status: 409 });
    }
  }

  const user = await prisma.user.update({ where: { id }, data });

  await logAdminAction({
    adminId: admin.id,
    action: "user.update",
    targetType: "user",
    targetId: user.id,
    detail: user.email,
  });

  return NextResponse.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
    },
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const { id } = await params;

  if (id === admin.id) {
    return NextResponse.json({ error: "cannotDeleteSelf" }, { status: 400 });
  }

  const target = await prisma.user.findUnique({ where: { id }, select: { email: true } });
  await prisma.user.delete({ where: { id } });

  await logAdminAction({
    adminId: admin.id,
    action: "user.delete",
    targetType: "user",
    targetId: id,
    detail: target?.email,
  });

  return NextResponse.json({ ok: true });
}
