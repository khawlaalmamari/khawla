import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";

const schema = z.discriminatedUnion("recipientType", [
  z.object({ recipientType: z.literal("admin"), body: z.string().trim().min(1).max(1000) }),
  z.object({
    recipientType: z.literal("user"),
    recipientEmail: z.string().trim().email(),
    body: z.string().trim().min(1).max(1000),
  }),
]);

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const senderRoleWord = user.role === "admin" ? "المدير" : "الطالبة";
  const senderRoleWordEn = user.role === "admin" ? "admin" : "student";

  let recipients: { id: string }[];

  if (parsed.data.recipientType === "admin") {
    recipients = await prisma.user.findMany({ where: { role: "admin" }, select: { id: true } });
    if (recipients.length === 0) {
      return NextResponse.json({ error: "recipientNotFound" }, { status: 404 });
    }
  } else {
    const recipient = await prisma.user.findFirst({
      where: { email: { equals: parsed.data.recipientEmail, mode: "insensitive" } },
      select: { id: true },
    });
    if (!recipient) {
      return NextResponse.json({ error: "recipientNotFound" }, { status: 404 });
    }
    if (recipient.id === user.id) {
      return NextResponse.json({ error: "cannotMessageSelf" }, { status: 400 });
    }
    recipients = [recipient];
  }

  const messageText = parsed.data.body;

  await prisma.notification.createMany({
    data: recipients.map((r) => ({
      userId: r.id,
      senderId: user.id,
      titleAr: `رسالة جديدة من ${senderRoleWord} ${user.username}`,
      titleEn: `New message from ${senderRoleWordEn} ${user.username}`,
      bodyAr: messageText,
      bodyEn: messageText,
    })),
  });

  return NextResponse.json({ ok: true });
}
