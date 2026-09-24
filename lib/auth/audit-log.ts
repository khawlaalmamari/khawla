import { prisma } from "@/lib/db";

/**
 * Records an admin-initiated action for accountability (who did what,
 * and when). Best-effort: a logging failure should never block the
 * underlying admin action, so callers fire-and-forget this.
 */
export async function logAdminAction({
  adminId,
  action,
  targetType,
  targetId,
  detail,
}: {
  adminId: string;
  action: string;
  targetType: string;
  targetId?: string;
  detail?: string;
}) {
  try {
    await prisma.adminAuditLog.create({
      data: { adminId, action, targetType, targetId, detail },
    });
  } catch (err) {
    console.error("[audit-log] Failed to record admin action:", err);
  }
}
