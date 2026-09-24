// The E-nursing mark: an open book (education) crossed by a heartbeat
// pulse line (health/nursing), inside a rounded gradient badge. Kept as
// inline SVG (rather than an <img>) so it stays crisp at any size and
// needs no extra network request.
export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#logo-bg)" />
      <path
        d="M50,40 C36,28 20,30 14,40 L14,72 C20,64 36,66 50,74 Z"
        fill="#ffffff"
        opacity={0.95}
      />
      <path
        d="M50,40 C64,28 80,30 86,40 L86,72 C80,64 64,66 50,74 Z"
        fill="#ffffff"
        opacity={0.95}
      />
      <path
        d="M14,44 L34,44 L41,26 L50,56 L59,26 L66,44 L86,44"
        fill="none"
        stroke="#f59e0b"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({ size = 32, wordmark }: { size?: number; wordmark: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoIcon size={size} />
      <span className="text-lg font-extrabold text-primary-700" dir="ltr">
        {wordmark}
      </span>
    </span>
  );
}
