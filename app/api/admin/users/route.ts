import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { adminCreateUserSchema } from "@/lib/auth/schemas";
import { requireAdmin } from "@/lib/auth/require-admin";

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = adminCreateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const { fullName, username, email, password, role } = parsed.data;

  const existing = await prisma.user.findFirst({
    where: { OR: [{ email }, { username }] },
    select: { email: true, username: true },
  });
  if (existing) {
    const field = existing.email === email ? "emailTaken" : "usernameTaken";
    return NextResponse.json({ error: field }, { status: 409 });
  }

  const passwordHash = await hashPassword(password);

  // Admin-created accounts skip the email-verification code flow: the admin
  // has already vouched for the student's identity directly.
  const user = await prisma.user.create({
    data: { fullName, username, email, passwordHash, role, emailVerified: true },
  });

  return NextResponse.json({
    user: { id: user.id, fullName: user.fullName, username: user.username },
  });
}
