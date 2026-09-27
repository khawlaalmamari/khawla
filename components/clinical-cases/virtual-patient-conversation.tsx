"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AttemptView } from "@/lib/clinical-cases/queries";
import type { ConversationMessageDTO, InterviewSummary, QuestionCategory } from "@/lib/clinical-cases/types";
import { QUESTION_CATEGORIES } from "@/lib/clinical-cases/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type EmotionalState = "CALM" | "ANXIOUS" | "UNCOMFORTABLE";

// Bilingual example phrasing per category, used both for the suggested-
// question chips and to keep the deterministic classifier's keyword
// matching demonstrably reachable from the UI (Step 6/8) — these are
// hints for the student to send or edit, not automatic answers.
const SUGGESTED_QUESTIONS: Record<QuestionCategory, { en: string; ar: string }> = {
  CHIEF_COMPLAINT: { en: "What brings you in today?", ar: "ما الذي أتى بك اليوم؟" },
  ONSET: { en: "When did the pain start?", ar: "متى بدأ الألم؟" },
  LOCATION: { en: "Where exactly is the pain?", ar: "أين تحديدًا يوجد الألم؟" },
  DURATION: { en: "How long have you had this pain?", ar: "منذ متى تشعر بهذا الألم؟" },
  CHARACTER: { en: "Can you describe the pain?", ar: "هل يمكنك وصف طبيعة الألم؟" },
  SEVERITY: { en: "How severe is the pain, from 1 to 10?", ar: "ما شدة الألم من 1 إلى 10؟" },
  TIMING: { en: "Is the pain constant, or does it come and go?", ar: "هل الألم مستمر أم يجي ويروح؟" },
  AGGRAVATING_FACTORS: { en: "Does anything make the pain worse?", ar: "هل يوجد ما يزيد الألم؟" },
  RELIEVING_FACTORS: { en: "Does anything make the pain better?", ar: "هل يوجد ما يخفف الألم؟" },
  ASSOCIATED_SYMPTOMS: { en: "Do you have any other symptoms?", ar: "هل تشعر بأي أعراض أخرى؟" },
  MEDICAL_HISTORY: { en: "Do you have any medical history I should know about?", ar: "هل لديك تاريخ مرضي يجب أن أعرفه؟" },
  MEDICATION_HISTORY: { en: "Are you taking any medications?", ar: "هل تتناول أي أدوية؟" },
  ALLERGIES: { en: "Do you have any allergies?", ar: "هل لديك حساسية من أي شيء؟" },
  FAMILY_HISTORY: { en: "Is there any relevant family history?", ar: "هل يوجد تاريخ عائلي مرتبط بحالتك؟" },
  SOCIAL_HISTORY: { en: "Do you smoke or drink alcohol?", ar: "هل تدخّن أو تشرب الكحول؟" },
};

function chipLabel(dict: Dictionary, category: QuestionCategory): string {
  const map: Record<QuestionCategory, string> = {
    CHIEF_COMPLAINT: dict.clinicalCases.askChiefComplaint,
    ONSET: dict.clinicalCases.askOnset,
    LOCATION: dict.clinicalCases.askLocation,
    DURATION: dict.clinicalCases.askDuration,
    CHARACTER: dict.clinicalCases.askCharacter,
    SEVERITY: dict.clinicalCases.askSeverity,
    TIMING: dict.clinicalCases.askTiming,
    AGGRAVATING_FACTORS: dict.clinicalCases.askAggravatingFactors,
    RELIEVING_FACTORS: dict.clinicalCases.askRelievingFactors,
    ASSOCIATED_SYMPTOMS: dict.clinicalCases.askAssociatedSymptoms,
    MEDICAL_HISTORY: dict.clinicalCases.askMedicalHistory,
    MEDICATION_HISTORY: dict.clinicalCases.askMedicationHistory,
    ALLERGIES: dict.clinicalCases.askAllergies,
    FAMILY_HISTORY: dict.clinicalCases.askFamilyHistory,
    SOCIAL_HISTORY: dict.clinicalCases.askSocialHistory,
  };
  return map[category];
}

function emotionalStateLabel(dict: Dictionary, state: EmotionalState): string {
  if (state === "ANXIOUS") return dict.clinicalCases.emotionalStateAnxious;
  if (state === "UNCOMFORTABLE") return dict.clinicalCases.emotionalStateUncomfortable;
  return dict.clinicalCases.emotionalStateCalm;
}

export function VirtualPatientConversation({
  attempt,
  locale,
  dict,
}: {
  attempt: AttemptView;
  locale: Locale;
  dict: Dictionary;
}) {
  const [messages, setMessages] = useState<ConversationMessageDTO[]>(attempt.messages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [notes, setNotes] = useState(attempt.notes ?? "");
  const [notesSaving, setNotesSaving] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);
  const [emotionalState, setEmotionalState] = useState<EmotionalState>(attempt.emotionalState);
  const [status, setStatus] = useState(attempt.status);
  const [summary, setSummary] = useState<InterviewSummary | null>(null);
  const [ending, setEnding] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const patient = attempt.visibleData.patientProfile;

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  // Already-completed attempt reopened later: fetch its summary once
  // (endInterview is idempotent — it only flips status the first time).
  useEffect(() => {
    if (attempt.status === "COMPLETED") {
      fetch(`/api/clinical-case-attempts/${attempt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "endInterview" }),
      })
        .then((res) => res.json())
        .then((data) => setSummary(data.summary ?? null))
        .catch(() => {});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending || status !== "IN_PROGRESS") return;

    setSending(true);
    try {
      const res = await fetch(`/api/clinical-case-attempts/${attempt.id}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setMessages((m) => [...m, data.studentMessage, data.patientMessage]);
      setEmotionalState(data.emotionalState);
      setInput("");
    } finally {
      setSending(false);
    }
  }

  async function saveNotes() {
    setNotesSaving(true);
    setNotesSaved(false);
    try {
      const res = await fetch(`/api/clinical-case-attempts/${attempt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveNotes", notes }),
      });
      if (res.ok) setNotesSaved(true);
    } finally {
      setNotesSaving(false);
    }
  }

  async function endInterview() {
    setEnding(true);
    try {
      const res = await fetch(`/api/clinical-case-attempts/${attempt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "endInterview" }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setStatus("COMPLETED");
      setSummary(data.summary ?? null);
    } finally {
      setEnding(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Virtual Patient */}
      <Card>
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-bold">{dict.clinicalCases.virtualPatientTitle}</h1>
          <Badge tone={emotionalState === "CALM" ? "neutral" : "accent"}>
            {dict.clinicalCases.emotionalStateLabel}: {emotionalStateLabel(dict, emotionalState)}
          </Badge>
        </div>
        <p className="mt-2 text-xl font-semibold">
          {locale === "ar" ? patient.name.ar : patient.name.en}
        </p>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-xs text-muted">{dict.clinicalCases.ageLabel}</dt>
            <dd>{patient.age}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{dict.clinicalCases.genderLabel}</dt>
            <dd>{patient.gender === "male" ? dict.clinicalCases.genderMale : dict.clinicalCases.genderFemale}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{dict.clinicalCases.personalityLabel}</dt>
            <dd>{locale === "ar" ? patient.personality.ar : patient.personality.en}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{dict.clinicalCases.communicationStyleLabel}</dt>
            <dd>{locale === "ar" ? patient.communicationStyle.ar : patient.communicationStyle.en}</dd>
          </div>
        </dl>
      </Card>

      {/* Conversation */}
      <Card>
        <h2 className="text-lg font-bold">{dict.clinicalCases.conversationTitle}</h2>
        <div
          ref={listRef}
          role="log"
          aria-live="polite"
          aria-label={dict.clinicalCases.conversationTitle}
          className="mt-4 max-h-96 space-y-3 overflow-y-auto"
        >
          {messages.length === 0 && (
            <p className="text-sm text-muted">{dict.clinicalCases.conversationEmpty}</p>
          )}
          {messages.map((m) => {
            const isStudent = m.role === "STUDENT";
            return (
              <div
                key={m.id}
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-6 ${
                  isStudent ? "ms-auto bg-primary-600 text-white" : "bg-surface"
                }`}
              >
                <p className="mb-1 text-xs font-semibold opacity-80">
                  {isStudent
                    ? locale === "ar"
                      ? "أنتِ"
                      : "You"
                    : locale === "ar"
                      ? patient.name.ar
                      : patient.name.en}
                </p>
                <p>{m.message}</p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Ask the Patient */}
      <Card>
        <h2 className="text-lg font-bold">{dict.clinicalCases.askThePatientTitle}</h2>

        <div className="mt-3 flex flex-wrap gap-2">
          {QUESTION_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setInput(locale === "ar" ? SUGGESTED_QUESTIONS[category].ar : SUGGESTED_QUESTIONS[category].en)}
              disabled={status !== "IN_PROGRESS"}
              className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
            >
              {chipLabel(dict, category)}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="mt-4 flex items-center gap-2"
        >
          <label htmlFor="patient-question-input" className="sr-only">
            {dict.clinicalCases.askThePatientTitle}
          </label>
          <input
            id="patient-question-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={dict.clinicalCases.inputPlaceholder}
            disabled={status !== "IN_PROGRESS"}
            className="flex-1 rounded-full border border-border bg-surface px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
          />
          <Button type="submit" disabled={sending || !input.trim() || status !== "IN_PROGRESS"}>
            {sending ? dict.clinicalCases.sendingMessage : dict.clinicalCases.sendButton}
          </Button>
        </form>
      </Card>

      {/* Clinical Notes */}
      <Card>
        <h2 className="text-lg font-bold">{dict.clinicalCases.clinicalNotesTitle}</h2>
        <label htmlFor="clinical-notes-textarea" className="sr-only">
          {dict.clinicalCases.clinicalNotesTitle}
        </label>
        <textarea
          id="clinical-notes-textarea"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setNotesSaved(false);
          }}
          placeholder={dict.clinicalCases.notesPlaceholder}
          rows={4}
          className="mt-3 w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
        <div className="mt-2 flex items-center gap-3">
          <Button variant="outline" onClick={saveNotes} disabled={notesSaving}>
            {dict.common.save}
          </Button>
          {notesSaved && <span className="text-sm text-success">{dict.clinicalCases.notesSaved}</span>}
        </div>
      </Card>

      {/* End Interview / Summary */}
      {status !== "COMPLETED" ? (
        <div className="flex justify-center">
          <Button variant="secondary" onClick={endInterview} disabled={ending}>
            {dict.clinicalCases.endInterviewButton}
          </Button>
        </div>
      ) : (
        <Card>
          <h2 className="text-lg font-bold">{dict.clinicalCases.interviewSummaryTitle}</h2>
          {summary && (
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">{dict.clinicalCases.questionsAskedLabel}</dt>
                <dd className="text-xl font-bold">{summary.questionsAsked}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{dict.clinicalCases.durationLabel}</dt>
                <dd className="text-xl font-bold">
                  {summary.durationSeconds !== null
                    ? dict.clinicalCases.durationMinutes.replace(
                        "{minutes}",
                        String(Math.max(1, Math.round(summary.durationSeconds / 60))),
                      )
                    : "—"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted">{dict.clinicalCases.informationDiscoveredLabel}</dt>
                {summary.informationDiscovered.length === 0 ? (
                  <dd className="mt-1 text-sm text-muted">{dict.clinicalCases.noInformationDiscoveredYet}</dd>
                ) : (
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {summary.informationDiscovered.map((category) => (
                      <Badge key={category} tone="success">
                        {chipLabel(dict, category)}
                      </Badge>
                    ))}
                  </dd>
                )}
              </div>
              <div>
                <dt className="text-xs text-muted">{dict.clinicalCases.completionStatusLabel}</dt>
                <dd className="font-medium">{dict.clinicalCases.completionStatusCompleted}</dd>
              </div>
            </dl>
          )}
        </Card>
      )}
    </div>
  );
}
