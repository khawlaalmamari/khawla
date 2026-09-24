"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

type Course = { id: string; titleEn: string; titleAr: string };
type Plan = {
  id: string;
  courseId: string;
  examDate: string;
  dailyHours: number;
  reminderHour: number | null;
  reminderFrequency: "daily" | "weekly";
};

export function StudyPlanForm({ courses, plans }: { courses: Course[]; plans: Plan[] }) {
  const { locale, dict } = useLocale();
  const router = useRouter();
  const planByCourse = new Map(plans.map((p) => [p.courseId, p]));
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id ?? "");

  if (courses.length === 0) return null;

  return (
    <Card>
      <Field
        label={locale === "ar" ? "اختاري المادة" : "Select course"}
        htmlFor="study-plan-course-select"
      >
        <select
          id="study-plan-course-select"
          className={inputClass}
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {locale === "ar" ? course.titleAr : course.titleEn}
            </option>
          ))}
        </select>
      </Field>

      {/* Every course's form stays mounted (just hidden) so switching the
          dropdown never loses unsaved edits for the other courses. */}
      {courses.map((course) => (
        <div key={course.id} className={course.id === selectedCourseId ? "mt-6" : "hidden"}>
          <CourseForm
            course={course}
            existing={planByCourse.get(course.id)}
            locale={locale}
            dict={dict}
            onSaved={() => router.refresh()}
          />
        </div>
      ))}
    </Card>
  );
}

const HOURS_IN_DAY = Array.from({ length: 24 }, (_, i) => i);

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
  const [reminderEnabled, setReminderEnabled] = useState(existing?.reminderHour != null);
  const [reminderHour, setReminderHour] = useState(existing?.reminderHour ?? 18);
  const [reminderFrequency, setReminderFrequency] = useState<"daily" | "weekly">(
    existing?.reminderFrequency ?? "daily",
  );
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
        body: JSON.stringify({
          courseId: course.id,
          examDate,
          dailyHours,
          reminderHour: reminderEnabled ? reminderHour : null,
          reminderFrequency,
        }),
      });
      setSaved(true);
      onSaved();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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

      <div className="rounded-lg border border-border bg-surface p-3">
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={reminderEnabled}
            onChange={(e) => setReminderEnabled(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          {locale === "ar"
            ? "أرسلي لي تذكيرًا بالبريد الإلكتروني للمذاكرة"
            : "Send me an email reminder to study"}
        </label>

        {reminderEnabled && (
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Field
              label={locale === "ar" ? "الوقت الأنسب" : "Preferred time"}
              htmlFor={`reminder-hour-${course.id}`}
            >
              <select
                id={`reminder-hour-${course.id}`}
                className={inputClass}
                value={reminderHour}
                onChange={(e) => setReminderHour(Number(e.target.value))}
              >
                {HOURS_IN_DAY.map((h) => (
                  <option key={h} value={h}>
                    {String(h).padStart(2, "0")}:00
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label={locale === "ar" ? "التكرار" : "Frequency"}
              htmlFor={`reminder-freq-${course.id}`}
            >
              <select
                id={`reminder-freq-${course.id}`}
                className={inputClass}
                value={reminderFrequency}
                onChange={(e) => setReminderFrequency(e.target.value as "daily" | "weekly")}
              >
                <option value="daily">{locale === "ar" ? "يوميًا" : "Daily"}</option>
                <option value="weekly">{locale === "ar" ? "أسبوعيًا" : "Weekly"}</option>
              </select>
            </Field>
          </div>
        )}
      </div>

      <Button type="submit" disabled={saving} className="w-full">
        {saved ? `✓ ${dict.common.save}` : dict.common.save}
      </Button>
    </form>
  );
}
