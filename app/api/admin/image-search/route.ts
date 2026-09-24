import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/require-admin";

type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  urls: { thumb: string; regular: string };
  user: { name: string };
};

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const query = req.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json({ error: "notConfigured" }, { status: 503 });
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=12`,
    { headers: { Authorization: `Client-ID ${accessKey}` } },
  );

  if (!res.ok) {
    return NextResponse.json({ error: "searchFailed" }, { status: 502 });
  }

  const data = (await res.json()) as { results: UnsplashPhoto[] };
  const results = data.results.map((photo) => ({
    id: photo.id,
    thumbUrl: photo.urls.thumb,
    fullUrl: photo.urls.regular,
    alt: photo.alt_description || query,
    credit: photo.user.name,
  }));

  return NextResponse.json({ results });
}
