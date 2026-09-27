import { z } from "zod";

export const caseDifficultySchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);
export const caseCategorySchema = z.enum([
  "CARDIOVASCULAR",
  "RESPIRATORY",
  "GASTROINTESTINAL",
  "NEUROLOGICAL",
  "INFECTIOUS",
  "GENERAL",
]);

export const caseIdSchema = z.string().trim().min(1);

// Not wired to a route this phase — kept ready for the future
// Admin → Clinical Cases → Create/Edit screen (Step 7).
export const bilingualSchema = z.object({ en: z.string().trim().min(1), ar: z.string().trim().min(1) });

export const adminCreateCaseSchema = z.object({
  slug: z.string().trim().min(1),
  titleEn: z.string().trim().min(1),
  titleAr: z.string().trim().min(1),
  descriptionEn: z.string().trim().min(1),
  descriptionAr: z.string().trim().min(1),
  difficulty: caseDifficultySchema,
  category: caseCategorySchema,
  order: z.number().int().min(0).default(0),
});

export const adminUpdateCaseSchema = adminCreateCaseSchema.partial().extend({
  isPublished: z.boolean().optional(),
});

// For the future "start a case attempt" endpoint (not created this phase).
export const createCaseAttemptSchema = z.object({
  caseId: caseIdSchema,
});
