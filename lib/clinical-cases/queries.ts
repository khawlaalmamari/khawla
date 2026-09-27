import { prisma } from "@/lib/db";
import type { CaseCategory, CaseDifficulty } from "@prisma/client";
import type { VisibleCaseData, HiddenCaseData } from "./types";

/** Listing-safe fields only — never includes hiddenDataJson. */
const metadataSelect = {
  id: true,
  slug: true,
  titleEn: true,
  titleAr: true,
  descriptionEn: true,
  descriptionAr: true,
  difficulty: true,
  category: true,
  order: true,
} as const;

export type CaseMetadata = {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  difficulty: CaseDifficulty;
  category: CaseCategory;
  order: number;
};

/** Published case metadata, optionally filtered — for student-facing listings. */
export async function getPublishedCases(filter?: {
  difficulty?: CaseDifficulty;
  category?: CaseCategory;
}): Promise<CaseMetadata[]> {
  return prisma.clinicalCase.findMany({
    where: {
      isPublished: true,
      difficulty: filter?.difficulty,
      category: filter?.category,
    },
    select: metadataSelect,
    orderBy: { order: "asc" },
  });
}

export async function getCasesByDifficulty(difficulty: CaseDifficulty): Promise<CaseMetadata[]> {
  return getPublishedCases({ difficulty });
}

export async function getCasesByCategory(category: CaseCategory): Promise<CaseMetadata[]> {
  return getPublishedCases({ category });
}

/**
 * Metadata + visible case content for a student — never includes
 * hiddenDataJson. Returns null if the case doesn't exist or (for a
 * non-admin) isn't published, mirroring the quiz route's
 * `!mod.isPublished && user.role !== "admin"` check.
 */
export async function getCaseMetadataById(
  id: string,
  opts: { isAdmin: boolean },
): Promise<(CaseMetadata & { isPublished: boolean; visibleData: VisibleCaseData }) | null> {
  const found = await prisma.clinicalCase.findUnique({
    where: { id },
    select: { ...metadataSelect, isPublished: true, visibleDataJson: true },
  });
  if (!found) return null;
  if (!found.isPublished && !opts.isAdmin) return null;

  const { visibleDataJson, ...rest } = found;
  return { ...rest, visibleData: JSON.parse(visibleDataJson) as VisibleCaseData };
}

/**
 * Full case row, including hiddenDataJson — for future authorized
 * simulation logic only. Callers must perform their own auth check before
 * calling this; it does not check publish state or role itself. Never
 * return this value (or hiddenData) directly from an API route to an
 * unauthenticated or unauthorized client.
 */
export async function getCaseForSimulation(id: string) {
  const found = await prisma.clinicalCase.findUnique({ where: { id } });
  if (!found) return null;

  return {
    ...found,
    visibleData: JSON.parse(found.visibleDataJson) as VisibleCaseData,
    hiddenData: JSON.parse(found.hiddenDataJson) as HiddenCaseData,
  };
}

/**
 * Minimal persistence foundation for a future case-attempt flow (Step 3).
 * Not wired to any route yet — no route calls this until a real
 * simulation UI exists to start from.
 */
export async function createCaseAttempt(userId: string, caseId: string) {
  return prisma.clinicalCaseAttempt.create({
    data: { userId, caseId },
  });
}
