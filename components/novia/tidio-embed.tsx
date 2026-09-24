import Script from "next/script";

type TidioVisitor = { id: string; email: string; fullName: string };

/**
 * Loads Tidio's chat widget script for "Ask Novia".
 *
 * ▶ TO ACTIVATE: set NEXT_PUBLIC_TIDIO_PUBLIC_KEY in your environment (see
 * .env.example) — it's the code in the embed snippet Tidio gives you, the
 * part right before ".js" in "//code.tidio.co/<PUBLIC_KEY>.js". Get it from
 * the Tidio dashboard under Settings > Developer > "Tidio API keys", or
 * from the install snippet under Channels > Live Chat > Install.
 *
 * Once that's set, app/layout.tsx renders this instead of the site's
 * built-in NoviaWidget.
 *
 * Widget color and position aren't set here — Tidio doesn't expose those
 * through the embed script, only through its own dashboard: go to
 * Channels > Live Chat > Appearance and set the widget color to this
 * site's brand teal (#0d9488) there so it stays on-theme. Arabic is also
 * chosen in the Tidio dashboard, under the widget language settings.
 */
export function TidioEmbed({
  publicKey,
  visitor,
}: {
  publicKey: string;
  visitor: TidioVisitor | null;
}) {
  return (
    <>
      {/* Visitor identification must run before the widget script below —
          see https://developers.tidio.com — so a logged-in student shows
          up in Tidio's operator panel by name/email instead of anonymous. */}
      {visitor && (
        <Script id="tidio-identify" strategy="lazyOnload">
          {`window.tidioIdentify = ${JSON.stringify({
            distinct_id: visitor.id,
            email: visitor.email,
            name: visitor.fullName,
          })};`}
        </Script>
      )}
      {/* lazyOnload: fetched only after the page is interactive and the
          browser is idle, so it never competes with lesson/quiz content
          for bandwidth or blocks the main thread on page load. */}
      <Script
        id="tidio-widget"
        src={`https://code.tidio.co/${publicKey}.js`}
        strategy="lazyOnload"
      />
    </>
  );
}
