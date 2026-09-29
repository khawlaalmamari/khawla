import type { NextConfig } from "next";

// Security headers applied to every response. Kept to directives with no
// realistic compatibility risk (no script-src/style-src allowlist here —
// getting that wrong would silently break the optional Tidio chat widget
// or lesson content without live verification of every page).
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // frame-ancestors is CSP's own (stronger) clickjacking control, additive
  // to X-Frame-Options above; object-src/base-uri close two classic
  // injection vectors without touching script-src/style-src.
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
