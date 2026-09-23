import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/auth/session";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/login?verified=missing", req.url));
  }

  const user = await prisma.user.findFirst({ where: { emailVerifyToken: token } });
  if (!user) {
    return NextResponse.redirect(new URL("/login?verified=invalid", req.url));
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: true, emailVerifyToken: null },
  });

  await createSession(user.id);

  return NextResponse.redirect(new URL("/dashboard?verified=success", req.url));
}
