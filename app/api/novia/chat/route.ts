import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth/session";
import { getNoviaReply } from "@/lib/novia/reply";
import { checkRateLimit, clientIpFrom } from "@/lib/auth/rate-limit";

const schema = z.object({
  message: z.string().trim().min(1).max(2000),
  sessionId: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const ip = clientIpFrom(req.headers);
  const rl = checkRateLimit(`novia:${ip}`, { limit: 30, windowMs: 10 * 60 * 1000 });
  if (!rl.allowed) {
    return NextResponse.json({ error: "rateLimited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const user = await getCurrentUser();
  const { message } = parsed.data;
  let sessionId = parsed.data.sessionId;
  let history: { role: "user" | "assistant"; content: string }[] = [];

  if (user) {
    let session = sessionId
      ? await prisma.chatSession.findFirst({ where: { id: sessionId, userId: user.id } })
      : null;

    if (!session) {
      session = await prisma.chatSession.create({ data: { userId: user.id } });
    }
    sessionId = session.id;

    const priorMessages = await prisma.chatMessage.findMany({
      where: { chatSessionId: session.id },
      orderBy: { createdAt: "asc" },
      take: 20,
    });
    history = priorMessages
      .filter((m) => m.role !== "SYSTEM")
      .map((m) => ({ role: m.role === "USER" ? "user" : "assistant", content: m.content }));

    await prisma.chatMessage.create({
      data: { chatSessionId: session.id, role: "USER", content: message },
    });
  }

  try {
    const result = await getNoviaReply(message, history);

    if (!result.configured) {
      return NextResponse.json({ configured: false, sessionId });
    }

    if (user && sessionId && result.reply) {
      await prisma.chatMessage.create({
        data: { chatSessionId: sessionId, role: "ASSISTANT", content: result.reply },
      });
    }

    return NextResponse.json({ configured: true, reply: result.reply, sessionId });
  } catch {
    return NextResponse.json({ error: "providerError", sessionId }, { status: 502 });
  }
}
