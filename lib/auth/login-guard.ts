import { prisma } from "@/lib/db";

export const MAX_FAILED_ATTEMPTS = 3;
export const LOCKOUT_MINUTES = 15;

export function isCurrentlyLocked(user: { lockedUntil: Date | null }): boolean {
  return !!user.lockedUntil && user.lockedUntil.getTime() > Date.now();
}

export function minutesUntilUnlock(user: { lockedUntil: Date | null }): number {
  if (!user.lockedUntil) return 0;
  return Math.max(0, Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000));
}

export async function recordFailedAttempt(userId: string, ipAddress: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { failedLoginCount: { increment: 1 } },
  });

  await prisma.loginEvent.create({
    data: { userId, success: false, ipAddress },
  });

  if (user.failedLoginCount >= MAX_FAILED_ATTEMPTS) {
    const lockedUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60 * 1000);
    await prisma.user.update({
      where: { id: userId },
      data: { lockedUntil, failedLoginCount: 0 },
    });

    await prisma.notification.create({
      data: {
        userId,
        titleEn: "Suspicious login activity detected",
        titleAr: "تم رصد نشاط دخول مشبوه",
        bodyEn: `Your account was temporarily locked for ${LOCKOUT_MINUTES} minutes after ${MAX_FAILED_ATTEMPTS} failed login attempts. If this wasn't you, consider resetting your password once the lock expires.`,
        bodyAr: `تم تعليق حسابك مؤقتًا لمدة ${LOCKOUT_MINUTES} دقيقة بعد ${MAX_FAILED_ATTEMPTS} محاولات دخول فاشلة. إذا لم تكن أنت من قام بذلك، ننصحك بإعادة تعيين كلمة المرور بعد انتهاء مدة التعليق.`,
      },
    });
  }
}

export async function recordSuccessfulLogin(userId: string, ipAddress: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { failedLoginCount: 0, lockedUntil: null, lastLoginAt: new Date() },
  });

  await prisma.loginEvent.create({
    data: { userId, success: true, ipAddress },
  });

  await prisma.notification.create({
    data: {
      userId,
      titleEn: "New login to your account",
      titleAr: "تسجيل دخول جديد إلى حسابك",
      bodyEn: `A successful login was recorded from IP ${ipAddress} at ${new Date().toLocaleString("en-US")}.`,
      bodyAr: `تم تسجيل دخول ناجح من العنوان ${ipAddress} في ${new Date().toLocaleString("ar")}.`,
    },
  });
}
