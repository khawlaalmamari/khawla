"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { AttemptView } from "@/lib/clinical-cases/queries";
import type {
  AssessmentType,
  ClinicalReasoningResponse,
  ConversationMessageDTO,
  DebriefReflection,
  InterviewSummary,
  QuestionCategory,
} from "@/lib/clinical-cases/types";
import { ASSESSMENT_TYPES, QUESTION_CATEGORIES } from "@/lib/clinical-cases/types";
import { assessmentTypeLabel } from "@/lib/clinical-cases/labels";
import { parseVitalSigns } from "@/lib/clinical-cases/assessment-format";
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

function isAssessmentType(category: string | null): category is AssessmentType {
  return !!category && (ASSESSMENT_TYPES as readonly string[]).includes(category);
}

/** Structured rows for a VITAL_SIGNS result — plain findings, no
 * interpretation (Step 7/10). */
function VitalSignsResult({ dict, message }: { dict: Dictionary; message: string }) {
  const vitals = parseVitalSigns(message);
  if (!vitals) return <p className="text-sm">{message}</p>;

  return (
    <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
      <div>
        <dt className="text-xs text-muted">{dict.clinicalCases.temperatureLabel}</dt>
        <dd className="font-semibold">
          {dict.clinicalCases.temperatureUnit.replace("{value}", String(vitals.temperatureCelsius))}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted">{dict.clinicalCases.heartRateLabel}</dt>
        <dd className="font-semibold">
          {dict.clinicalCases.heartRateUnit.replace("{value}", String(vitals.heartRate))}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted">{dict.clinicalCases.bloodPressureLabel}</dt>
        <dd className="font-semibold">
          {dict.clinicalCases.bloodPressureUnit
            .replace("{systolic}", String(vitals.bloodPressureSystolic))
            .replace("{diastolic}", String(vitals.bloodPressureDiastolic))}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted">{dict.clinicalCases.respiratoryRateLabel}</dt>
        <dd className="font-semibold">
          {dict.clinicalCases.respiratoryRateUnit.replace("{value}", String(vitals.respiratoryRate))}
        </dd>
      </div>
      <div>
        <dt className="text-xs text-muted">{dict.clinicalCases.oxygenSaturationLabel}</dt>
        <dd className="font-semibold">
          {dict.clinicalCases.oxygenSaturationUnit.replace("{value}", String(vitals.oxygenSaturation))}
        </dd>
      </div>
    </dl>
  );
}

type ReasoningFields = Omit<ClinicalReasoningResponse, "updatedAt">;

const EMPTY_REASONING: ReasoningFields = {
  keyFindings: "",
  hypotheses: "",
  supportingEvidence: "",
  missingInformation: "",
  recommendedNextAction: "",
};

// Field order + which dict keys back each one — keeps the reasoning form
// (Step 7/8: structured fields, clearly separate from the read-only
// evidence above it) driven by one small table instead of five near-
// identical blocks.
const REASONING_FIELDS: {
  key: keyof ReasoningFields;
  label: keyof Dictionary["clinicalCases"];
  placeholder: keyof Dictionary["clinicalCases"];
}[] = [
  { key: "keyFindings", label: "keyFindingsLabel", placeholder: "keyFindingsPlaceholder" },
  { key: "hypotheses", label: "hypothesesLabel", placeholder: "hypothesesPlaceholder" },
  { key: "supportingEvidence", label: "supportingEvidenceLabel", placeholder: "supportingEvidencePlaceholder" },
  { key: "missingInformation", label: "missingInformationLabel", placeholder: "missingInformationPlaceholder" },
  {
    key: "recommendedNextAction",
    label: "recommendedNextActionLabel",
    placeholder: "recommendedNextActionPlaceholder",
  },
];

type ReflectionFields = Omit<DebriefReflection, "updatedAt">;

const EMPTY_REFLECTION: ReflectionFields = {
  mostImportantFindings: "",
  additionalInformationWanted: "",
  whatToReassess: "",
  whatToDoDifferently: "",
};

// Same table pattern as REASONING_FIELDS above, for the four reflective
// questions (Step 5/6).
const REFLECTION_FIELDS: {
  key: keyof ReflectionFields;
  label: keyof Dictionary["clinicalCases"];
  placeholder: keyof Dictionary["clinicalCases"];
}[] = [
  { key: "mostImportantFindings", label: "mostImportantFindingsLabel", placeholder: "mostImportantFindingsPlaceholder" },
  {
    key: "additionalInformationWanted",
    label: "additionalInformationWantedLabel",
    placeholder: "additionalInformationWantedPlaceholder",
  },
  { key: "whatToReassess", label: "whatToReassessLabel", placeholder: "whatToReassessPlaceholder" },
  {
    key: "whatToDoDifferently",
    label: "whatToDoDifferentlyLabel",
    placeholder: "whatToDoDifferentlyPlaceholder",
  },
];

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
  const [assessmentLoading, setAssessmentLoading] = useState<AssessmentType | null>(null);
  const [reasoning, setReasoning] = useState<ReasoningFields>(attempt.reasoning ?? EMPTY_REASONING);
  const [reasoningSaving, setReasoningSaving] = useState(false);
  const [reasoningSaved, setReasoningSaved] = useState(false);
  const [reflection, setReflection] = useState<ReflectionFields>(attempt.reflection ?? EMPTY_REFLECTION);
  const [reflectionSaving, setReflectionSaving] = useState(false);
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  // Phase 3C-2 — pure navigation/continuity aids: both sections already
  // render unconditionally (Reasoning) or once COMPLETED (Debriefing), so
  // these only scroll to and focus the existing heading, never gate access.
  const reasoningHeadingRef = useRef<HTMLHeadingElement>(null);
  const debriefHeadingRef = useRef<HTMLHeadingElement>(null);

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

  async function requestAssessment(type: AssessmentType) {
    if (status !== "IN_PROGRESS" || assessmentLoading) return;
    setAssessmentLoading(type);
    try {
      const res = await fetch(`/api/clinical-case-attempts/${attempt.id}/assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      if (!res.ok) return;
      const data = await res.json();
      setMessages((m) => [...m, data.studentMessage, data.resultMessage]);
    } finally {
      setAssessmentLoading(null);
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

  async function saveReasoning() {
    setReasoningSaving(true);
    setReasoningSaved(false);
    try {
      const res = await fetch(`/api/clinical-case-attempts/${attempt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveReasoning", ...reasoning }),
      });
      if (res.ok) setReasoningSaved(true);
    } finally {
      setReasoningSaving(false);
    }
  }

  async function saveReflection() {
    setReflectionSaving(true);
    setReflectionSaved(false);
    try {
      const res = await fetch(`/api/clinical-case-attempts/${attempt.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "saveReflection", ...reflection }),
      });
      if (res.ok) setReflectionSaved(true);
    } finally {
      setReflectionSaving(false);
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

  // Phase 3C-2 — scrolls to (and moves focus to) an existing section's own
  // heading, respecting prefers-reduced-motion. Purely navigational: it
  // never changes status, saves data, or reveals a section that wasn't
  // already rendered.
  function goToSection(ref: React.RefObject<HTMLHeadingElement | null>) {
    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ref.current?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    ref.current?.focus();
  }

  const conversationMessages = messages.filter((m) => !isAssessmentType(m.category));
  const assessmentMessages = messages.filter((m) => m.role === "SYSTEM" && isAssessmentType(m.category));
  // Phase 2D — the facts available for reasoning: the patient's answers
  // (not the student's own questions) plus assessment findings. Built
  // entirely from data already in `messages` — no separate fetch, and
  // never anything from hiddenData that wasn't actually discovered.
  const interviewEvidence = messages.filter((m) => m.role === "PATIENT" && m.category);
  const hasEvidence = interviewEvidence.length > 0 || assessmentMessages.length > 0;

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
        <p className="mt-1 text-xs text-muted">{dict.clinicalCases.fictionalDisclaimer}</p>
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
          {conversationMessages.length === 0 && (
            <p className="text-sm text-muted">{dict.clinicalCases.conversationEmpty}</p>
          )}
          {conversationMessages.map((m) => {
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

      {/* Clinical Assessment */}
      <Card>
        <h2 className="text-lg font-bold">{dict.clinicalCases.clinicalAssessmentTitle}</h2>
        <p className="mt-1 text-sm text-muted">{dict.clinicalCases.requestAssessmentHint}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {attempt.availableAssessments.map((type) => {
            const alreadyPerformed = assessmentMessages.some((m) => m.category === type);
            return (
              <button
                key={type}
                type="button"
                onClick={() => requestAssessment(type)}
                disabled={status !== "IN_PROGRESS" || assessmentLoading !== null}
                className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
              >
                {alreadyPerformed && "✓ "}
                {assessmentTypeLabel(dict, type)}
              </button>
            );
          })}
        </div>

        <div className="mt-4 space-y-3">
          {assessmentMessages.map((m) => (
            <div key={m.id} className="rounded-lg bg-surface p-3">
              <p className="mb-2 text-xs font-semibold text-muted">
                {assessmentTypeLabel(dict, m.category as AssessmentType)}
              </p>
              {m.category === "VITAL_SIGNS" ? (
                <VitalSignsResult dict={dict} message={m.message} />
              ) : (
                <p className="text-sm">{m.message}</p>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Phase 3C-2 — educational transition nudging the student from
          gathering evidence toward organizing their clinical reasoning.
          Purely navigational: Clinical Reasoning below is already
          unconditionally rendered and editable while IN_PROGRESS, so this
          never gates or reorders anything. Only shown once there is
          something to reason about, and no longer once reasoning is
          locked (status is no longer IN_PROGRESS). */}
      {status === "IN_PROGRESS" && hasEvidence && (
        <Card className="border-primary-200 bg-primary-50">
          <h2 className="text-lg font-bold">{dict.clinicalCases.reasoningTransitionTitle}</h2>
          <p className="mt-1 text-sm">{dict.clinicalCases.reasoningTransitionBody}</p>
          <Button className="mt-3" onClick={() => goToSection(reasoningHeadingRef)}>
            {dict.clinicalCases.continueToReasoningButton}
          </Button>
        </Card>
      )}

      {/* Clinical Reasoning */}
      <Card>
        <h2 ref={reasoningHeadingRef} tabIndex={-1} className="text-lg font-bold">
          {dict.clinicalCases.clinicalReasoningTitle}
        </h2>

        <h3 className="mt-4 text-sm font-semibold">{dict.clinicalCases.evidenceTitle}</h3>
        <p className="mt-1 text-xs text-muted">{dict.clinicalCases.evidenceHint}</p>
        {!hasEvidence ? (
          <p className="mt-2 text-sm text-muted">{dict.clinicalCases.evidenceEmpty}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {interviewEvidence.map((m) => (
              <li key={m.id} className="rounded-lg bg-surface p-2 text-sm">
                <Badge tone="neutral">{chipLabel(dict, m.category as QuestionCategory)}</Badge>{" "}
                {m.message}
              </li>
            ))}
            {assessmentMessages.map((m) => (
              <li key={m.id} className="rounded-lg bg-surface p-2 text-sm">
                <Badge tone="neutral">{assessmentTypeLabel(dict, m.category as AssessmentType)}</Badge>{" "}
                {m.category === "VITAL_SIGNS" ? (
                  <span className="mt-1 block">
                    <VitalSignsResult dict={dict} message={m.message} />
                  </span>
                ) : (
                  m.message
                )}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-xs text-muted">{dict.clinicalCases.reasoningHint}</p>

        <div className="mt-3 space-y-4">
          {REASONING_FIELDS.map((field) => (
            <div key={field.key}>
              <label htmlFor={`reasoning-${field.key}`} className="text-sm font-medium">
                {dict.clinicalCases[field.label]}
              </label>
              <textarea
                id={`reasoning-${field.key}`}
                value={reasoning[field.key]}
                onChange={(e) => {
                  setReasoning((r) => ({ ...r, [field.key]: e.target.value }));
                  setReasoningSaved(false);
                }}
                placeholder={dict.clinicalCases[field.placeholder]}
                disabled={status !== "IN_PROGRESS"}
                rows={3}
                className="mt-1 w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50"
              />
            </div>
          ))}
        </div>

        {status !== "IN_PROGRESS" ? (
          <p className="mt-3 text-sm text-muted">{dict.clinicalCases.reasoningLockedNotice}</p>
        ) : (
          <div className="mt-3 flex items-center gap-3">
            <Button variant="outline" onClick={saveReasoning} disabled={reasoningSaving}>
              {dict.clinicalCases.saveReasoningButton}
            </Button>
            {reasoningSaved && <span className="text-sm text-success">{dict.clinicalCases.reasoningSaved}</span>}
          </div>
        )}
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
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted">{dict.clinicalCases.assessmentsPerformedLabel}</dt>
                {summary.assessmentsPerformed.length === 0 ? (
                  <dd className="mt-1 text-sm text-muted">{dict.clinicalCases.noAssessmentsPerformedYet}</dd>
                ) : (
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {summary.assessmentsPerformed.map((type) => (
                      <Badge key={type} tone="success">
                        {assessmentTypeLabel(dict, type)}
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

      {/* Phase 3C-2 — educational transition from Clinical Reasoning into
          Debriefing. Only ever shown once COMPLETED, same as the
          Debriefing section itself below — this never reorders or gates
          anything, it only helps the student notice the next step. */}
      {status === "COMPLETED" && (
        <Card className="border-primary-200 bg-primary-50">
          <h2 className="text-lg font-bold">{dict.clinicalCases.debriefTransitionTitle}</h2>
          <p className="mt-1 text-sm">{dict.clinicalCases.debriefTransitionBody}</p>
          <Button className="mt-3" onClick={() => goToSection(debriefHeadingRef)}>
            {dict.clinicalCases.continueToDebriefButton}
          </Button>
        </Card>
      )}

      {/* Clinical Debriefing — Phase 2E. Only ever rendered once the
          attempt is COMPLETED (Step 3): a student mid-interview never
          sees this section at all. */}
      {status === "COMPLETED" && (
        <Card>
          <h2 ref={debriefHeadingRef} tabIndex={-1} className="text-lg font-bold">
            {dict.clinicalCases.debriefingTitle}
          </h2>
          <p className="mt-1 text-sm text-muted">{dict.clinicalCases.debriefIntro}</p>

          <h3 className="mt-4 text-sm font-semibold">{dict.clinicalCases.yourSimulationSummaryLabel}</h3>
          {!hasEvidence ? (
            <p className="mt-2 text-sm text-muted">{dict.clinicalCases.evidenceEmpty}</p>
          ) : (
            <ul className="mt-2 space-y-2">
              {interviewEvidence.map((m) => (
                <li key={m.id} className="rounded-lg bg-surface p-2 text-sm">
                  <Badge tone="neutral">{chipLabel(dict, m.category as QuestionCategory)}</Badge>{" "}
                  {m.message}
                </li>
              ))}
              {assessmentMessages.map((m) => (
                <li key={m.id} className="rounded-lg bg-surface p-2 text-sm">
                  <Badge tone="neutral">{assessmentTypeLabel(dict, m.category as AssessmentType)}</Badge>{" "}
                  {m.category === "VITAL_SIGNS" ? (
                    <span className="mt-1 block">
                      <VitalSignsResult dict={dict} message={m.message} />
                    </span>
                  ) : (
                    m.message
                  )}
                </li>
              ))}
            </ul>
          )}

          <h3 className="mt-4 text-sm font-semibold">{dict.clinicalCases.yourReasoningLabel}</h3>
          {!attempt.reasoning ? (
            <p className="mt-2 text-sm text-muted">{dict.clinicalCases.noReasoningRecorded}</p>
          ) : (
            <dl className="mt-2 space-y-2">
              {REASONING_FIELDS.map((field) => (
                <div key={field.key} className="rounded-lg bg-surface p-2 text-sm">
                  <dt className="text-xs font-semibold text-muted">{dict.clinicalCases[field.label]}</dt>
                  <dd className="mt-0.5">{reasoning[field.key] || "—"}</dd>
                </div>
              ))}
            </dl>
          )}

          <p className="mt-6 text-xs text-muted">{dict.clinicalCases.reflectiveQuestionsIntro}</p>
          <div className="mt-3 space-y-4">
            {REFLECTION_FIELDS.map((field) => (
              <div key={field.key}>
                <label htmlFor={`reflection-${field.key}`} className="text-sm font-medium">
                  {dict.clinicalCases[field.label]}
                </label>
                <textarea
                  id={`reflection-${field.key}`}
                  value={reflection[field.key]}
                  onChange={(e) => {
                    setReflection((r) => ({ ...r, [field.key]: e.target.value }));
                    setReflectionSaved(false);
                  }}
                  placeholder={dict.clinicalCases[field.placeholder]}
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Button variant="outline" onClick={saveReflection} disabled={reflectionSaving}>
              {dict.clinicalCases.saveReflectionButton}
            </Button>
            {reflectionSaved && <span className="text-sm text-success">{dict.clinicalCases.reflectionSaved}</span>}
          </div>
        </Card>
      )}
    </div>
  );
}
