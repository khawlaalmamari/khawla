import Link from "next/link";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

export default async function LandingPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const { landing, meta } = dict;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-background">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <p className="mb-3 inline-block rounded-full bg-primary-100 px-4 py-1 text-sm font-semibold text-primary-800">
                {meta.tagline}
              </p>
              <h1 className="text-3xl font-extrabold leading-tight text-primary-900 sm:text-4xl lg:text-5xl">
                {meta.siteName}
              </h1>
              <p className="mt-6 whitespace-pre-line text-base leading-8 text-foreground/90">
                {landing.heroDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="/signup" variant="primary">
                  {landing.ctaStart}
                </ButtonLink>
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-md">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* Discover */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
            {landing.discoverTitle}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {landing.features.map((feature) => (
              <Card key={feature.title} className="flex flex-col gap-3">
                <span className="text-3xl" aria-hidden>
                  {feature.icon}
                </span>
                <h3 className="text-lg font-bold">{feature.title}</h3>
                <p className="text-sm leading-6 text-muted">{feature.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-surface py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="mb-10 text-center text-2xl font-bold sm:text-3xl">
              {landing.howItWorksTitle}
            </h2>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {landing.steps.map((step, i) => (
                <li key={step} className="relative rounded-2xl bg-background p-6 shadow-sm">
                  <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 text-lg font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-6">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <p className="text-lg font-semibold text-primary-800">{landing.heroShort}</p>
          <div className="mt-6">
            <ButtonLink href="/signup">{landing.ctaStart}</ButtonLink>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        <p>
          {meta.siteName} — {meta.tagline}
        </p>
        <div className="mt-2 flex justify-center gap-4">
          <Link href="/help" className="hover:text-primary-700">
            {locale === "ar" ? "المساعدة والدعم" : "Help & Support"}
          </Link>
        </div>
      </footer>
    </div>
  );
}

function HeroIllustration() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="E-nursing">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="170" fill="url(#g1)" opacity="0.08" />
      <circle cx="200" cy="200" r="120" fill="url(#g1)" opacity="0.12" />
      {/* simplified heartbeat pulse line */}
      <path
        d="M40 210 H140 L165 150 L195 260 L220 180 L240 210 H360"
        fill="none"
        stroke="#0f766e"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* simplified cross / medical mark */}
      <rect x="185" y="90" width="30" height="90" rx="8" fill="#0d9488" />
      <rect x="155" y="120" width="90" height="30" rx="8" fill="#0d9488" />
    </svg>
  );
}
