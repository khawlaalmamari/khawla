import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

const messageSchema = z.object({
  body: z.string().trim().min(1).max(1000),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const parsed = messageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  // The username is never taken from the client — it's always the
  // authenticated sender's own username, stamped in server-side.
  const admins = await prisma.user.findMany({
    where: { role: "admin" },
    select: { id: true },
  });

  if (admins.length === 0) {
    return NextResponse.json({ error: "noAdmins" }, { status: 404 });
  }

  const messageText = parsed.data.body;

  await prisma.notification.createMany({
    data: admins.map((a) => ({
      userId: a.id,
      senderId: user.id,
      titleAr: `رسالة جديدة من الطالبة ${user.username}`,
      titleEn: `New message from student ${user.username}`,
      bodyAr: messageText,
      bodyEn: messageText,
    })),
  });

  return NextResponse.json({ ok: true });
}
