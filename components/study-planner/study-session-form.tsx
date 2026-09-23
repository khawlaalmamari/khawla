"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

type ModuleOption = { id: string; courseId: string; titleEn: string; titleAr: string };
type CourseOption = { id: string; titleEn: string; titleAr: string; modules: ModuleOption[] };

export function StudySessionForm({ courses }: { courses: CourseOption[] }) {
  const { locale } = useLocale();
  const router = useRouter();

  const [courseId, setCourseId] = useState(courses[0]?.id ?? "");
  const availableModules = courses.find((c) => c.id === courseId)?.modules ?? [];
  const [moduleId, setModuleId] = useState(availableModules[0]?.id ?? "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState(60);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onCourseChange(nextCourseId: string) {
    setCourseId(nextCourseId);
    const mods = courses.find((c) => c.id === nextCourseId)?.modules ?? [];
    setModuleId(mods[0]?.id ?? "");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);

    if (!moduleId || !date || !time) {
      setError(locale === "ar" ? "يرجى تعبئة جميع الحقول." : "Please fill in all fields.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/study-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, moduleId, date, time, durationMinutes: duration }),
      });
      if (!res.ok) {
        setError(locale === "ar" ? "حدث خطأ ما." : "Something went wrong.");
        return;
      }
      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  if (courses.length === 0 || courses.every((c) => c.modules.length === 0)) {
    return null;
  }

  return (
    <Card>
      <h2 className="text-lg font-bold">
        {locale === "ar" ? "جدولة جلسة مذاكرة" : "Schedule a Study Session"}
      </h2>
      <form onSubmit={onSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={locale === "ar" ? "المادة" : "Course"} htmlFor="session-course">
          <select
            id="session-course"
            className={inputClass}
            value={courseId}
            onChange={(e) => onCourseChange(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {locale === "ar" ? c.titleAr : c.titleEn}
              </option>
            ))}
          </select>
        </Field>

        <Field label={locale === "ar" ? "الموديل" : "Module"} htmlFor="session-module">
          <select
            id="session-module"
            className={inputClass}
            value={moduleId}
            onChange={(e) => setModuleId(e.target.value)}
            disabled={availableModules.length === 0}
          >
            {availableModules.map((m) => (
              <option key={m.id} value={m.id}>
                {locale === "ar" ? m.titleAr : m.titleEn}
              </option>
            ))}
          </select>
        </Field>

        <Field label={locale === "ar" ? "التاريخ" : "Date"} htmlFor="session-date">
          <input
            id="session-date"
            type="date"
            required
            className={inputClass}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Field>

        <Field label={locale === "ar" ? "الوقت" : "Time"} htmlFor="session-time">
          <input
            id="session-time"
            type="time"
            required
            className={inputClass}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Field>

        <Field
          label={locale === "ar" ? "المدة (دقائق)" : "Duration (minutes)"}
          htmlFor="session-duration"
        >
          <input
            id="session-duration"
            type="number"
            min={15}
            max={480}
            step={15}
            className={inputClass}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
        </Field>

        <div className="flex items-end">
          <Button type="submit" disabled={saving || availableModules.length === 0} className="w-full">
            {saved ? "✓" : locale === "ar" ? "جدولة" : "Schedule"}
          </Button>
        </div>
      </form>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}
    </Card>
  );
}
