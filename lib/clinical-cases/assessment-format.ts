// Pure helpers with no server-only imports (no Prisma), so the client
// component can use them too. A VITAL_SIGNS result's `message` column
// holds JSON.stringify(vitals) rather than a locale-formatted string, so
// the exact numbers survive a page reload and can be rendered as
// structured rows (Step 10) rather than parsed out of prose.

import type { VitalSigns } from "./types";

export function encodeVitalSigns(vitals: VitalSigns): string {
  return JSON.stringify(vitals);
}

export function parseVitalSigns(message: string): VitalSigns | null {
  try {
    const parsed = JSON.parse(message);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof parsed.temperatureCelsius === "number" &&
      typeof parsed.heartRate === "number" &&
      typeof parsed.bloodPressureSystolic === "number" &&
      typeof parsed.bloodPressureDiastolic === "number" &&
      typeof parsed.respiratoryRate === "number" &&
      typeof parsed.oxygenSaturation === "number"
    ) {
      return parsed as VitalSigns;
    }
    return null;
  } catch {
    return null;
  }
}
