"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

export type AdminCourse = {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
};

export type AdminLesson = {
  id: string;
  titleAr: string;
  titleEn: string;
  objectivesAr: string[];
  objectivesEn: string[];
  contentAr: string;
  contentEn: string;
  summaryAr: string;
  summaryEn: string;
};

export type AdminModule = {
  id: string;
  courseId: string;
  titleAr: string;
  titleEn: string;
  isPublished: boolean;
  lessons: AdminLesson[];
};

const textareaClass = `${inputClass} min-h-[140px] font-mono text-xs leading-relaxed`;

function toLessonForm(lesson: AdminLesson) {
  return {
    titleAr: lesson.titleAr,
    titleEn: lesson.titleEn,
    objectivesAr: lesson.objectivesAr.join("\n"),
    objectivesEn: lesson.objectivesEn.join("\n"),
    contentAr: lesson.contentAr,
    contentEn: lesson.contentEn,
    summaryAr: lesson.summaryAr,
    summaryEn: lesson.summaryEn,
  };
}

export function ModuleManagementPanel({
  courses,
  modules,
  locale,
}: {
  courses: AdminCourse[];
  modules: AdminModule[];
  locale: "ar" | "en";
}) {
  const { dict } = useLocale();
  const router = useRouter();
  const [courseId, setCourseId] = useState<string>(courses[0]?.id ?? "");
  const [moduleId, setModuleId] = useState<string>("");
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [form, setForm] = useState<ReturnType<typeof toLessonForm> | null>(null);
  const [toggling, setToggling] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const modulesForCourse = useMemo(
    () => modules.filter((m) => m.courseId === courseId),
    [modules, courseId],
  );
  const selectedModule = modulesForCourse.find((m) => m.id === moduleId) ?? null;
  const editingLesson = selectedModule?.lessons.find((l) => l.id === editingLessonId) ?? null;

  function onCourseChange(id: string) {
    setCourseId(id);
    setModuleId("");
    setEditingLessonId(null);
    setError(null);
    setSaved(false);
  }

  function onModuleChange(id: string) {
    setModuleId(id);
    setEditingLessonId(null);
    setError(null);
    setSaved(false);
  }

  async function toggleModule() {
    if (!selectedModule) return;
    setToggling(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/modules/${selectedModule.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !selectedModule.isPublished }),
      });
      if (!res.ok) {
        setError(dict.auth.errors.genericError);
        return;
      }
      router.refresh();
    } finally {
      setToggling(false);
    }
  }

  function startEdit(lesson: AdminLesson) {
    setEditingLessonId(lesson.id);
    setForm(toLessonForm(lesson));
    setError(null);
    setSaved(false);
  }

  async function saveLesson() {
    if (!editingLesson || !form) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/lessons/${editingLesson.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titleAr: form.titleAr,
          titleEn: form.titleEn,
          objectivesAr: form.objectivesAr.split("\n").map((s) => s.trim()).filter(Boolean),
          objectivesEn: form.objectivesEn.split("\n").map((s) => s.trim()).filter(Boolean),
          contentAr: form.contentAr,
          contentEn: form.contentEn,
          summaryAr: form.summaryAr,
          summaryEn: form.summaryEn,
        }),
      });
      if (!res.ok) {
        setError(dict.auth.errors.genericError);
        return;
      }
      setSaved(true);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-bold">{dict.admin.manageModules}</h2>
        <p className="mt-1 text-sm text-muted">{dict.admin.manageModulesIntro}</p>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label={dict.admin.selectCourse} htmlFor="admin-course-select">
          <select
            id="admin-course-select"
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

        <Field label={dict.admin.selectModule} htmlFor="admin-module-select">
          <select
            id="admin-module-select"
            className={inputClass}
            value={moduleId}
            onChange={(e) => onModuleChange(e.target.value)}
          >
            <option value="">{dict.admin.selectModulePlaceholder}</option>
            {modulesForCourse.map((m) => (
              <option key={m.id} value={m.id}>
                {locale === "ar" ? m.titleAr : m.titleEn}
              </option>
            ))}
          </select>
        </Field>
      </Card>

      {selectedModule && (
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-base font-bold">
              {locale === "ar" ? selectedModule.titleAr : selectedModule.titleEn}
            </h3>
            <div className="flex items-center gap-3">
              <Badge tone={selectedModule.isPublished ? "success" : "neutral"}>
                {selectedModule.isPublished ? dict.admin.published : dict.admin.hidden}
              </Badge>
              <button
                type="button"
                disabled={toggling}
                onClick={toggleModule}
                className="text-xs font-medium text-primary-700 hover:underline disabled:opacity-60"
              >
                {selectedModule.isPublished ? dict.admin.hideModule : dict.admin.showModule}
              </button>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">{dict.admin.lessonsInModule}</p>
            {selectedModule.lessons.length === 0 ? (
              <p className="mt-2 text-sm text-muted">{dict.admin.noLessonsYet}</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {selectedModule.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border px-3 py-2"
                  >
                    <span className="text-sm">
                      {locale === "ar" ? lesson.titleAr : lesson.titleEn}
                    </span>
                    <button
                      type="button"
                      onClick={() => startEdit(lesson)}
                      className="text-xs font-medium text-primary-700 hover:underline"
                    >
                      {dict.admin.editLesson}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      )}

      {editingLesson && form && (
        <Card className="space-y-4">
          <h3 className="text-base font-bold">{dict.admin.editLesson}</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={dict.admin.titleArLabel} htmlFor="lesson-titleAr">
              <input
                id="lesson-titleAr"
                dir="rtl"
                className={inputClass}
                value={form.titleAr}
                onChange={(e) => setForm((f) => (f ? { ...f, titleAr: e.target.value } : f))}
              />
            </Field>
            <Field label={dict.admin.titleEnLabel} htmlFor="lesson-titleEn">
              <input
                id="lesson-titleEn"
                className={inputClass}
                value={form.titleEn}
                onChange={(e) => setForm((f) => (f ? { ...f, titleEn: e.target.value } : f))}
              />
            </Field>

            <Field label={dict.admin.summaryArLabel} htmlFor="lesson-summaryAr">
              <input
                id="lesson-summaryAr"
                dir="rtl"
                className={inputClass}
                value={form.summaryAr}
                onChange={(e) => setForm((f) => (f ? { ...f, summaryAr: e.target.value } : f))}
              />
            </Field>
            <Field label={dict.admin.summaryEnLabel} htmlFor="lesson-summaryEn">
              <input
                id="lesson-summaryEn"
                className={inputClass}
                value={form.summaryEn}
                onChange={(e) => setForm((f) => (f ? { ...f, summaryEn: e.target.value } : f))}
              />
            </Field>

            <Field label={dict.admin.objectivesArLabel} htmlFor="lesson-objectivesAr">
              <textarea
                id="lesson-objectivesAr"
                dir="rtl"
                className={textareaClass}
                value={form.objectivesAr}
                onChange={(e) => setForm((f) => (f ? { ...f, objectivesAr: e.target.value } : f))}
              />
              <p className="mt-1 text-xs text-muted">{dict.admin.objectivesHint}</p>
            </Field>
            <Field label={dict.admin.objectivesEnLabel} htmlFor="lesson-objectivesEn">
              <textarea
                id="lesson-objectivesEn"
                className={textareaClass}
                value={form.objectivesEn}
                onChange={(e) => setForm((f) => (f ? { ...f, objectivesEn: e.target.value } : f))}
              />
              <p className="mt-1 text-xs text-muted">{dict.admin.objectivesHint}</p>
            </Field>

            <Field label={dict.admin.contentArLabel} htmlFor="lesson-contentAr">
              <textarea
                id="lesson-contentAr"
                dir="rtl"
                className={`${textareaClass} min-h-[260px]`}
                value={form.contentAr}
                onChange={(e) => setForm((f) => (f ? { ...f, contentAr: e.target.value } : f))}
              />
            </Field>
            <Field label={dict.admin.contentEnLabel} htmlFor="lesson-contentEn">
              <textarea
                id="lesson-contentEn"
                className={`${textareaClass} min-h-[260px]`}
                value={form.contentEn}
                onChange={(e) => setForm((f) => (f ? { ...f, contentEn: e.target.value } : f))}
              />
            </Field>
          </div>

          <p className="text-xs text-muted">{dict.admin.imageHint}</p>

          {saved && <p className="text-sm text-primary-700">{dict.admin.saveSuccess}</p>}

          <div className="flex gap-2">
            <Button type="button" disabled={saving} onClick={saveLesson}>
              {dict.common.save}
            </Button>
            <Button type="button" variant="outline" onClick={() => setEditingLessonId(null)}>
              {dict.common.cancel}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
