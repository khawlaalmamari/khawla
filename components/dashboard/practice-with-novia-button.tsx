"use client";

import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";

export function PracticeWithNoviaButton({
  topicEn,
  topicAr,
}: {
  topicEn: string;
  topicAr: string;
}) {
  const { locale, dict } = useLocale();

  function onClick() {
    const topic = locale === "ar" ? topicAr : topicEn;
    const prompt = dict.dashboard.practiceWithNoviaPrompt.replace("{topic}", topic);
    window.dispatchEvent(new CustomEvent("novia:ask", { detail: prompt }));
  }

  return (
    <Button variant="outline" className="!px-3 !py-1.5 text-xs" onClick={onClick}>
      {dict.dashboard.practiceWithNovia}
    </Button>
  );
}
