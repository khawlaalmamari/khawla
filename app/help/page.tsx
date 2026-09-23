import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";

export default async function HelpPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-10 sm:px-6">
        <h1 className="text-2xl font-bold">{dict.help.title}</h1>
        <p className="mt-2 text-sm text-muted">{dict.help.intro}</p>

        <Card className="mt-6">
          <p className="text-sm">
            {dict.help.contactLabel}:{" "}
            <a
              href="mailto:khawlaalmamari5@gmail.com"
              className="font-medium text-primary-700 hover:underline"
            >
              khawlaalmamari5@gmail.com
            </a>
          </p>
        </Card>

        <h2 className="mt-8 text-lg font-bold">{dict.help.faqTitle}</h2>
        <div className="mt-4 space-y-4">
          {dict.help.faqs.map((faq) => (
            <Card key={faq.q}>
              <p className="font-semibold">{faq.q}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{faq.a}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
