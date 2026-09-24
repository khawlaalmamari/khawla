import type { Metadata } from "next";
import { Tajawal, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { dirFor } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCurrentUser } from "@/lib/auth/session";
import { LocaleProvider } from "@/components/locale-provider";
import { NoviaWidget } from "@/components/novia/novia-widget";
import { TidioEmbed } from "@/components/novia/tidio-embed";

const tajawal = Tajawal({
  variable: "--font-body",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-nursing — From Knowledge to Clinical Thinking",
  description:
    "منصة E-nursing التعليمية الطبية الذكية لطلاب التمريض في السنة الأولى بسلطنة عُمان.",
};

export default async function RootLayout({
  children,
}: LayoutProps<"/">) {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  // Once NEXT_PUBLIC_TIDIO_PUBLIC_KEY is configured (see .env.example),
  // Tidio's own widget takes over from the site's built-in one — never
  // both at once.
  const tidioPublicKey = process.env.NEXT_PUBLIC_TIDIO_PUBLIC_KEY;
  const user = tidioPublicKey ? await getCurrentUser() : null;

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${tajawal.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale}>
          {children}
          {tidioPublicKey ? (
            <TidioEmbed
              publicKey={tidioPublicKey}
              visitor={
                user ? { id: user.id, email: user.email, fullName: user.fullName } : null
              }
            />
          ) : (
            <NoviaWidget />
          )}
        </LocaleProvider>
        <noscript>{dict.meta.siteName}</noscript>
      </body>
    </html>
  );
}
