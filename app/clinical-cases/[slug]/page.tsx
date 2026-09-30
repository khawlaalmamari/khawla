import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { getServerLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getCaseMetadataBySlug } from "@/lib/clinical-cases/queries";
import { difficultyLabel, categoryLabel } from "@/lib/clinical-cases/labels";
import { Navbar } from "@/components/navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StartSimulationButton } from "@/components/clinical-cases/start-simulation-button";

export default async function ClinicalCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { slug } = await params;
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const c = await getCaseMetadataBySlug(slug, { isAdmin: user.role === "admin" });

  if (!c) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6">
          <Card>
            <p className="text-sm text-muted">{dict.clinicalCases.caseNotAvailable}</p>
            <Link href="/clinical-cases" className="mt-4 inline-block text-sm text-primary-600 hover:underline">
              {dict.clinicalCases.backToCases}
            </Link>
          </Card>
        </main>
      </div>
    );
  }

  const { patientProfile } = c.visibleData;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-10 sm:px-6">
        <Link href="/clinical-cases" className="text-sm text-primary-600 hover:underline">
          &larr; {dict.clinicalCases.backToCases}
        </Link>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="primary">{categoryLabel(dict, c.category)}</Badge>
            <Badge tone="neutral">{difficultyLabel(dict, c.difficulty)}</Badge>
          </div>
          <h1 className="mt-2 text-2xl font-bold">{locale === "ar" ? c.titleAr : c.titleEn}</h1>
          <p className="mt-2 text-sm text-muted">{locale === "ar" ? c.descriptionAr : c.descriptionEn}</p>
        </div>

        <Card>
          <h2 className="text-lg font-bold">{dict.clinicalCases.virtualPatientTitle}</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.ageLabel}</dt>
              <dd className="font-medium">{patientProfile.age}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.genderLabel}</dt>
              <dd className="font-medium">
                {patientProfile.gender === "male" ? dict.clinicalCases.genderMale : dict.clinicalCases.genderFemale}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.settingLabel}</dt>
              <dd className="font-medium">
                {locale === "ar" ? patientProfile.setting.ar : patientProfile.setting.en}
              </dd>
            </div>
          </dl>

          <div className="mt-4 rounded-lg bg-surface p-3">
            <p className="text-sm font-medium">
              {locale === "ar" ? c.visibleData.chiefComplaint.ar : c.visibleData.chiefComplaint.en}
            </p>
          </div>

          <ul className="mt-3 space-y-1 text-sm text-muted">
            {c.visibleData.presentingSymptoms.map((s, i) => (
              <li key={i}>• {locale === "ar" ? s.ar : s.en}</li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="text-sm font-semibold">{dict.clinicalCases.normalVitalSignsTitle}</h2>
          <p className="mt-1 text-xs text-muted">{dict.clinicalCases.normalVitalSignsHint}</p>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.temperatureLabel}</dt>
              <dd className="font-medium">{dict.clinicalCases.normalTemperatureRange}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.heartRateLabel}</dt>
              <dd className="font-medium">{dict.clinicalCases.normalHeartRateRange}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.bloodPressureLabel}</dt>
              <dd className="font-medium">{dict.clinicalCases.normalBloodPressureRange}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.respiratoryRateLabel}</dt>
              <dd className="font-medium">{dict.clinicalCases.normalRespiratoryRateRange}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted">{dict.clinicalCases.oxygenSaturationLabel}</dt>
              <dd className="font-medium">{dict.clinicalCases.normalOxygenSaturationRange}</dd>
            </div>
          </dl>
        </Card>

        <Card>
          <p className="text-sm text-muted">{dict.clinicalCases.fictionalDisclaimer}</p>
        </Card>

        <StartSimulationButton
          slug={c.slug}
          label={dict.clinicalCases.startSimulation}
          errorLabel={dict.common.error}
        />
      </main>
    </div>
  );
}
