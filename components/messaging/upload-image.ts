export type UploadImageResult = { url: string } | { error: "invalidType" | "tooLarge" | "notConfigured" | "unknown" };

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/png", "image/jpeg", "image/webp", "image/gif"]);

/** Client-side validation mirrors the server's, so a bad file is rejected
 * instantly instead of after a round trip. */
export async function uploadMessageImage(file: File): Promise<UploadImageResult> {
  if (!ALLOWED_TYPES.has(file.type)) return { error: "invalidType" };
  if (file.size > MAX_BYTES) return { error: "tooLarge" };

  const form = new FormData();
  form.set("image", file);

  const res = await fetch("/api/messages/upload", { method: "POST", body: form });
  if (res.status === 503) return { error: "notConfigured" };
  if (!res.ok) return { error: "unknown" };

  const data = await res.json().catch(() => null);
  if (!data?.url) return { error: "unknown" };
  return { url: data.url };
}
