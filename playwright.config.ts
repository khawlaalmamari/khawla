import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for E-nursing's e2e suite. This project had no
 * automated-test infrastructure before Phase VR-1 — added specifically to
 * cover the new realistic clinical-patient-conversation flow with real
 * regression coverage (desktop + mobile viewport, English + Arabic/RTL).
 *
 * Runs against `npm run dev` (not a prod build) for fast local iteration;
 * reuses an already-running dev server if one exists so repeated local
 * runs don't pay the startup cost each time.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
});
