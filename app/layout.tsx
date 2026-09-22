import type { Metadata } from "next";
import { Tajawal, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { dirFor } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LocaleProvider } from "@/components/locale-provider";
import { NoviaWidget } from "@/components/novia/novia-widget";

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

  return (
    <html
      lang={locale}
      dir={dirFor(locale)}
      className={`${tajawal.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider locale={locale}>
          {children}
          <NoviaWidget />
        </LocaleProvider>
        <noscript>{dict.meta.siteName}</noscript>
      </body>
    </html>
  );
}
