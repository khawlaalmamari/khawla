// Phase 3E — Branching Clinical Case Interaction. Client-safe summaries
// ONLY: ids, the triggering assessment, the prompt, and option labels.
// The clinical explanation for each option is intentionally NOT here — it
// stays server-side in patient-engine.ts and is only ever sent to the
// client once the student actually picks an option (see
// recordClinicalDecision in queries.ts), mirroring how an assessment's
// finding stays hidden until requested (Phase 2C). This file is imported
// by both the server (to validate ids) and the client component, so it
// must never contain anything sensitive.
//
// Grounded entirely in this case's own existing hiddenData (see
// prisma/content/clinical-cases.js): an elevated heart rate, elevated
// blood pressure, an increased respiratory rate, and mildly reduced
// oxygen saturation are this case's own scripted vital signs — nothing
// here is invented, and no diagnosis is named.

import type { AssessmentType, Bilingual } from "./types";

export type ClinicalDecisionOptionSummary = { id: string; label: Bilingual };

export type ClinicalDecisionPointSummary = {
  id: string;
  /** This decision point becomes available once the student has
   * requested this assessment for their own attempt (Step "Observe
   * finding" before "Choose next action"). */
  triggerAssessment: AssessmentType;
  prompt: Bilingual;
  options: ClinicalDecisionOptionSummary[];
};

export const DECISION_POINTS: Record<string, ClinicalDecisionPointSummary[]> = {
  "chest-pain-adult": [
    {
      id: "DECISION_POST_VITALS",
      triggerAssessment: "VITAL_SIGNS",
      prompt: {
        en: "Based on the vital signs you just measured, what would you prioritize next?",
        ar: "بناءً على العلامات الحيوية التي قِستِها للتو، ما الذي ستُعطينه الأولوية بعد ذلك؟",
      },
      options: [
        {
          id: "reassess",
          label: {
            en: "Reassess vital signs shortly to check for a trend.",
            ar: "إعادة قياس العلامات الحيوية بعد قليل لمتابعة تطوّرها.",
          },
        },
        {
          id: "cardio-assess",
          label: { en: "Perform a focused cardiovascular assessment.", ar: "إجراء تقييم قلبي وعائي مركّز." },
        },
        {
          id: "escalate",
          label: {
            en: "Communicate your concern to the supervising nurse or physician now.",
            ar: "إبلاغ الممرضة المسؤولة أو الطبيب بقلقك الآن.",
          },
        },
        {
          id: "monitor",
          label: {
            en: "Continue routine monitoring without further action.",
            ar: "الاستمرار في المراقبة الروتينية دون إجراء إضافي.",
          },
        },
      ],
    },
  ],
  // Phase 3G-2 — grounded entirely in this case's own scripted findings
  // (elevated respiratory rate, mild tachycardia, mildly reduced oxygen
  // saturation, audible wheeze, accessory muscle use, short-phrase
  // speech). The decision id is globally unique on purpose: explanations
  // and insights below are keyed "<decisionId>:<optionId>" in a flat map
  // shared across all cases, so reusing chest-pain-adult's id here would
  // silently collide with its entries.
  "shortness-of-breath-adult": [
    {
      id: "DECISION_RESP_POST_VITALS",
      triggerAssessment: "VITAL_SIGNS",
      prompt: {
        en: "Based on the vital signs and breathing pattern you just observed, what would you prioritize next?",
        ar: "بناءً على العلامات الحيوية ونمط التنفس الذي لاحظتِه للتو، ما الذي ستُعطينه الأولوية بعد ذلك؟",
      },
      options: [
        {
          id: "reassess",
          label: {
            en: "Reassess vital signs and breathing shortly to check for a trend.",
            ar: "إعادة تقييم العلامات الحيوية والتنفس بعد قليل لمتابعة تطوّرها.",
          },
        },
        {
          id: "assist-inhaler",
          label: {
            en: "Assist the patient with her prescribed reliever inhaler and reassess her breathing afterward.",
            ar: "مساعدة المريضة على استخدام بخاخها المخفف الموصوف وإعادة تقييم تنفسها بعد ذلك.",
          },
        },
        {
          id: "escalate",
          label: {
            en: "Communicate your concern to the supervising nurse or physician now.",
            ar: "إبلاغ الممرضة المسؤولة أو الطبيب بقلقك الآن.",
          },
        },
        {
          id: "monitor",
          label: {
            en: "Continue routine monitoring without further action.",
            ar: "الاستمرار في المراقبة الروتينية دون إجراء إضافي.",
          },
        },
      ],
    },
  ],
};

export function getDecisionPointSummaries(caseSlug: string): ClinicalDecisionPointSummary[] {
  return DECISION_POINTS[caseSlug] ?? [];
}
