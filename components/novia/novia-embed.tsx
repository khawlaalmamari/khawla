import Script from "next/script";

/**
 * Loads the external "Ask Novia" chatbot platform's widget script.
 *
 * ▶ TO ACTIVATE: set NEXT_PUBLIC_NOVIA_EMBED_SRC (and, if your platform
 * needs one, NEXT_PUBLIC_NOVIA_WIDGET_ID) in your environment — see
 * .env.example. Once NEXT_PUBLIC_NOVIA_EMBED_SRC is set, app/layout.tsx
 * renders this component instead of the site's built-in NoviaWidget.
 *
 * The `window.NoviaChatbotConfig` object below is a generic placeholder —
 * most embeddable chat platforms read their widget ID and theme colors
 * from either a global config object like this one or from data-*
 * attributes on the <script> tag itself. Check your chosen platform's
 * embed docs and rename these fields (or add data-* attributes to the
 * <Script> tag) to match its actual API. The color values already point
 * at this site's teal brand color so the widget stays on-theme if your
 * platform honors them as-is.
 */
export function NoviaEmbed() {
  const src = process.env.NEXT_PUBLIC_NOVIA_EMBED_SRC;
  const widgetId = process.env.NEXT_PUBLIC_NOVIA_WIDGET_ID;

  if (!src) return null;

  return (
    <>
      {widgetId && (
        <Script id="novia-embed-config" strategy="lazyOnload">
          {`window.NoviaChatbotConfig = ${JSON.stringify({
            widgetId,
            botName: "Novia",
            primaryColor: "#0d9488", // matches the site's --color-primary-600
            accentColor: "#f59e0b",
            position: "bottom-end",
            offsetBottom: 24,
            offsetSide: 24,
          })};`}
        </Script>
      )}
      {/* lazyOnload: fetched only after the page is interactive and the
          browser is idle, so it never competes with lesson/quiz content
          for bandwidth or blocks the main thread on page load. */}
      <Script id="novia-embed-widget" src={src} strategy="lazyOnload" />
    </>
  );
}
