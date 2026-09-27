import type { Dictionary } from "@/lib/i18n/dictionaries";

export function difficultyLabel(dict: Dictionary, difficulty: string): string {
  if (difficulty === "BEGINNER") return dict.clinicalCases.difficultyBeginner;
  if (difficulty === "ADVANCED") return dict.clinicalCases.difficultyAdvanced;
  return dict.clinicalCases.difficultyIntermediate;
}

export function categoryLabel(dict: Dictionary, category: string): string {
  switch (category) {
    case "CARDIOVASCULAR":
      return dict.clinicalCases.categoryCardiovascular;
    case "RESPIRATORY":
      return dict.clinicalCases.categoryRespiratory;
    case "GASTROINTESTINAL":
      return dict.clinicalCases.categoryGastrointestinal;
    case "NEUROLOGICAL":
      return dict.clinicalCases.categoryNeurological;
    case "INFECTIOUS":
      return dict.clinicalCases.categoryInfectious;
    default:
      return dict.clinicalCases.categoryGeneral;
  }
}

export function assessmentTypeLabel(dict: Dictionary, type: string): string {
  switch (type) {
    case "VITAL_SIGNS":
      return dict.clinicalCases.assessmentVitalSigns;
    case "GENERAL_INSPECTION":
      return dict.clinicalCases.assessmentGeneralInspection;
    case "RESPIRATORY":
      return dict.clinicalCases.assessmentRespiratory;
    case "CARDIOVASCULAR":
      return dict.clinicalCases.assessmentCardiovascular;
    case "PAIN":
      return dict.clinicalCases.assessmentPain;
    case "PALPATION":
      return dict.clinicalCases.assessmentPalpation;
    default:
      return dict.clinicalCases.assessmentAuscultation;
  }
}
