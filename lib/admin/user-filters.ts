import type { Prisma } from "@prisma/client";

export type UserStatusFilter = "active" | "locked" | "unverified" | "all";

export function daysAgo(days: number): Date {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/**
 * Builds the shared Prisma `where` clause for the admin student list, used
 * by both the on-screen table (with pagination) and the CSV export, so the
 * two always agree on what a given search/status filter includes.
 */
export function buildUserWhere(q: string | undefined, status: UserStatusFilter): Prisma.UserWhereInput {
  const conditions: Prisma.UserWhereInput[] = [];

  if (q && q.trim()) {
    const term = q.trim();
    conditions.push({
      OR: [
        { fullName: { contains: term, mode: "insensitive" } },
        { username: { contains: term, mode: "insensitive" } },
        { email: { contains: term, mode: "insensitive" } },
      ],
    });
  }

  if (status === "locked") {
    conditions.push({ lockedUntil: { gt: new Date() } });
  } else if (status === "unverified") {
    conditions.push({ emailVerified: false, lockedUntil: null });
  } else if (status === "active") {
    conditions.push({
      emailVerified: true,
      OR: [{ lockedUntil: null }, { lockedUntil: { lte: new Date() } }],
    });
  }

  return conditions.length > 0 ? { AND: conditions } : {};
}
