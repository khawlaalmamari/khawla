import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { put } from "@vercel/blob";
import { getCurrentUser } from "@/lib/auth/session";

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json({ error: "notConfigured" }, { status: 503 });
  }

  const form = await req.formData().catch(() => null);
  const file = form?.get("image");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "invalidType" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "tooLarge" }, { status: 400 });
  }

  // Filename is never taken from the client — a random name replaces it
  // entirely, so nothing about the original file (name, path) is stored.
  const extension = file.type.split("/")[1];
  const pathname = `messages/${user.id}/${randomUUID()}.${extension}`;

  const blob = await put(pathname, file, {
    access: "public",
    contentType: file.type,
    addRandomSuffix: false,
  });

  return NextResponse.json({ url: blob.url });
}
