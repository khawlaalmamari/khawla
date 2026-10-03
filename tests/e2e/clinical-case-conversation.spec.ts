import { test, expect, type Page } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

/**
 * Phase VR-1 — e2e coverage for the realistic clinical-patient-conversation
 * flow on the existing `shortness-of-breath-adult` case. Runs against both
 * the desktop-chromium and mobile-chromium projects (see
 * playwright.config.ts), so each test below also doubles as the mobile-
 * viewport pass the phase's testing requirements call for.
 *
 * Each test creates its own throwaway, verified user directly via Prisma
 * (same pattern used for manual verification throughout this project's
 * development — bypasses the email-verification flow on purpose, since
 * that flow is already covered by its own feature, not this one) and
 * deletes it afterward; cascading deletes clean up the attempt and its
 * conversation messages.
 */

const prisma = new PrismaClient();
const CASE_SLUG = "shortness-of-breath-adult";

async function createTestUser() {
  const email = `e2e-vr1-${Date.now()}-${Math.random().toString(36).slice(2)}@example.com`;
  const password = "TestPass123!";
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      username: email.split("@")[0],
      fullName: "VR-1 E2E Test",
      passwordHash,
      emailVerified: true,
    },
  });
  return { userId: user.id, email, password };
}

async function deleteTestUser(userId: string) {
  await prisma.user.delete({ where: { id: userId } }).catch(() => {});
}

async function loginAndStartAttempt(page: Page, email: string, password: string, locale?: "ar" | "en") {
  if (locale) {
    await page.context().addCookies([{ name: "en_locale", value: locale, domain: "localhost", path: "/" }]);
  }
  const loginRes = await page.request.post("/api/auth/login", { data: { identifier: email, password } });
  expect(loginRes.ok()).toBeTruthy();

  const startRes = await page.request.post(`/api/clinical-cases/${CASE_SLUG}/attempts`);
  expect(startRes.ok()).toBeTruthy();
  const { attemptId } = await startRes.json();
  expect(attemptId).toBeTruthy();

  await page.goto(`/clinical-cases/${CASE_SLUG}/attempt/${attemptId}`);
  return attemptId as string;
}

test.describe("Clinical case conversation — English", () => {
  let user: Awaited<ReturnType<typeof createTestUser>>;

  test.beforeEach(async () => {
    user = await createTestUser();
  });

  test.afterEach(async () => {
    await deleteTestUser(user.userId);
  });

  test("patient speaks first, free text works, persists on reload, and ending requires confirmation", async ({
    page,
  }) => {
    await loginAndStartAttempt(page, user.email, user.password, "en");

    const log = page.getByRole("log");

    // Patient speaks first (Phase VR-1's core addition) — no empty state.
    await expect(log.getByText(/catch my breath/i)).toBeVisible();
    await expect(page.getByText("Ask the patient a question to begin the conversation.")).toHaveCount(0);

    // Free-text conversation, not a predefined-question picker.
    const input = page.locator("#patient-question-input");
    await input.fill("When did the shortness of breath start?");
    await page.getByRole("button", { name: "Send" }).click();

    await expect(log.getByText("When did the shortness of breath start?")).toBeVisible();
    // The patient's onset answer for this case — grounded in its own
    // authored content, not invented.
    await expect(log.getByText(/30 minutes ago/i)).toBeVisible();

    // Persistence across a reload.
    await page.reload();
    await expect(log.getByText(/catch my breath/i)).toBeVisible();
    await expect(log.getByText("When did the shortness of breath start?")).toBeVisible();
    await expect(log.getByText(/30 minutes ago/i)).toBeVisible();

    // End Interview requires confirmation (Phase VR-1 addition).
    const endButton = page.getByRole("button", { name: "End Interview" });
    await endButton.click();
    await expect(page.getByText(/are you sure you want to end the interview/i)).toBeVisible();

    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByText(/are you sure you want to end the interview/i)).toHaveCount(0);

    await page.getByRole("button", { name: "End Interview" }).click();
    await page.getByRole("button", { name: "End Interview" }).click();
    await expect(page.getByText("Interview Summary")).toBeVisible();
  });

  test("patient reacts when an assessment is requested before any interview question", async ({ page }) => {
    await loginAndStartAttempt(page, user.email, user.password, "en");

    await page.getByRole("button", { name: "Vital Signs", exact: true }).click();

    await expect(page.getByText(/could you explain what you're going to check first/i)).toBeVisible();
  });
});

test.describe("Clinical case conversation — Arabic / RTL", () => {
  let user: Awaited<ReturnType<typeof createTestUser>>;

  test.beforeEach(async () => {
    user = await createTestUser();
  });

  test.afterEach(async () => {
    await deleteTestUser(user.userId);
  });

  test("patient's opening line and free-text replies render correctly in Arabic with RTL", async ({ page }) => {
    await loginAndStartAttempt(page, user.email, user.password, "ar");

    const log = page.getByRole("log");

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(log.getByText(/التقاط أنفاسي/)).toBeVisible();

    const input = page.locator("#patient-question-input");
    await input.fill("متى بدأ ضيق التنفس؟");
    await page.getByRole("button", { name: "إرسال", exact: true }).click();

    await expect(log.getByText("متى بدأ ضيق التنفس؟")).toBeVisible();
    await expect(log.getByText(/منذ حوالي 30 دقيقة/)).toBeVisible();
  });
});
