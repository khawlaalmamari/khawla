import { NextResponse } from "next/server";

// These routes render per-user data behind a server-side session check
// (redirect("/login") when signed out). The page's own Cache-Control
// ("no-cache, must-revalidate") stops the HTTP cache from reusing a stale
// response, but it does NOT stop the browser's back-forward cache
// (bfcache) from restoring a full snapshot of the page — including a
// previous user's rendered data — when the user hits Back, with no
// request (and therefore no session check) happening at all. Only
// Cache-Control: no-store opts a page out of bfcache; setting it here in
// middleware is what actually wins over the page's own header, unlike a
// static next.config.ts headers() rule.
export function middleware() {
  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export const config = {
  matcher: ["/dashboard", "/admin", "/study-planner", "/anatomy/:path*", "/physiology/:path*"],
};
