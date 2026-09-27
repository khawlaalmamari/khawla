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
