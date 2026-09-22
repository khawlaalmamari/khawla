"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

type Course = { id: string; titleEn: string; titleAr: string };
type Plan = { id: string; courseId: string; examDate: string; dailyHours: number };

export function StudyPlanForm({ courses, plans }: { courses: Course[]; plans: Plan[] }) {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const planByCourse = new Map(plans.map((p) => [p.courseId, p]));

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {courses.map((course) => (
        <CourseForm
          key={course.id}
          course={course}
          existing={planByCourse.get(course.id)}
          locale={locale}
          dict={dict}
          onSaved={() => router.refresh()}
        />
      ))}
    </div>
  );
}

function CourseForm({
  course,
  existing,
  locale,
  dict,
  onSaved,
}: {
  course: Course;
  existing?: Plan;
  locale: string;
  dict: ReturnType<typeof useLocale>["dict"];
  onSaved: () => void;
}) {
  const [examDate, setExamDate] = useState(existing?.examDate.slice(0, 10) ?? "");
  const [dailyHours, setDailyHours] = useState(existing?.dailyHours ?? 2);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/study-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id, examDate, dailyHours }),
      });
      setSaved(true);
      onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <h2 className="text-lg font-bold">{locale === "ar" ? course.titleAr : course.titleEn}</h2>
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        <Field
          label={locale === "ar" ? "موعد الامتحان" : "Exam date"}
          htmlFor={`exam-${course.id}`}
        >
          <input
            id={`exam-${course.id}`}
            type="date"
            required
            className={inputClass}
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </Field>
        <Field
          label={locale === "ar" ? "ساعات المذاكرة اليومية" : "Daily study hours"}
          htmlFor={`hours-${course.id}`}
        >
          <input
            id={`hours-${course.id}`}
            type="number"
            min={0.5}
            max={16}
            step={0.5}
            required
            className={inputClass}
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
          />
        </Field>
        <Button type="submit" disabled={saving} className="w-full">
          {saved ? `✓ ${dict.common.save}` : dict.common.save}
        </Button>
      </form>
    </Card>
  );
}
