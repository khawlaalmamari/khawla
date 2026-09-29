"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { Locale } from "@/lib/i18n/config";
import type { NursingSkill, RelatedCasePreview } from "@/lib/nursing-lab/types";
import { getStructureById } from "@/lib/anatomy-3d/structures";
import { systemLabel } from "@/components/anatomy-3d/body-system-selector";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";

type Stage = "intro" | "preparation" | "procedure" | "reflection" | "completion";

type ReflectionAnswers = {
  observed: string;
  mostImportant: string;
  nextAssessment: string;
};

const EMPTY_REFLECTION: ReflectionAnswers = { observed: "", mostImportant: "", nextAssessment: "" };

const textareaClass =
  "mt-1 w-full rounded-lg border border-border bg-surface p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50";

/** Relevant-anatomy links reused at both the intro and completion steps —
 * always via existing structure ids and existing Anatomy routes (a real
 * lesson via studyHref when one exists, otherwise the general 3D
 * explorer). Never duplicates or modifies the Anatomy viewer itself. */
function RelevantAnatomyLinks({
  dict,
  locale,
  structureIds,
}: {
  dict: Dictionary;
  locale: Locale;
  structureIds: string[];
}) {
  const structures = structureIds.map((id) => getStructureById(id)).filter((s) => !!s);
  if (structures.length === 0) return null;

  return (
    <div>
      <p className="text-xs font-semibold text-muted">{dict.nursingLab.relevantAnatomyLabel}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {structures.map((structure) => (
          <div key={structure.id} className="flex items-center gap-2 rounded-lg border border-border bg-background p-2">
            <span className="text-sm font-medium">{locale === "ar" ? structure.nameAr : structure.nameEn}</span>
            {structure.studyHref ? (
              <ButtonLink href={structure.studyHref} variant="outline" className="!px-3 !py-1 text-xs">
                {dict.anatomy3D.studyThisStructureButton}
              </ButtonLink>
            ) : (
              <ButtonLink href="/anatomy/3d-explorer" variant="outline" className="!px-3 !py-1 text-xs">
                {dict.nursingLab.open3DExplorerButton}
              </ButtonLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkillPractice({
  dict,
  locale,
  skill,
  relatedCase,
}: {
  dict: Dictionary;
  locale: Locale;
  skill: NursingSkill;
  /** Phase 3C-1 — safe, already-resolved preview of a related Clinical
   * Case, or null when the skill has no mapping or that case isn't
   * currently available to this student. Never contains hidden data. */
  relatedCase: RelatedCasePreview | null;
}) {
  const [stage, setStage] = useState<Stage>("intro");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedStepNumbers, setCompletedStepNumbers] = useState<Set<number>>(new Set());
  const [recordedObservationIds, setRecordedObservationIds] = useState<Set<string>>(new Set());
  const [reflection, setReflection] = useState<ReflectionAnswers>(EMPTY_REFLECTION);
  const [startedAt] = useState(() => Date.now());
  const [completedAt, setCompletedAt] = useState<number | null>(null);

  const currentStep = skill.procedureSteps[currentStepIndex];
  const isLastStep = currentStepIndex === skill.procedureSteps.length - 1;
  const currentStepDone = completedStepNumbers.has(currentStep.stepNumber);
  const allObservationsRecorded = recordedObservationIds.size === skill.observations.length;

  const reflectionComplete = useMemo(
    () =>
      reflection.observed.trim().length > 0 &&
      reflection.mostImportant.trim().length > 0 &&
      reflection.nextAssessment.trim().length > 0,
    [reflection],
  );

  function resetAll() {
    setStage("intro");
    setCurrentStepIndex(0);
    setCompletedStepNumbers(new Set());
    setRecordedObservationIds(new Set());
    setReflection(EMPTY_REFLECTION);
    setCompletedAt(null);
  }

  function recordObservation(id: string) {
    setRecordedObservationIds((prev) => {
      const next = new Set(prev).add(id);
      if (currentStep.isObservationStep && next.size === skill.observations.length) {
        setCompletedStepNumbers((s) => new Set(s).add(currentStep.stepNumber));
      }
      return next;
    });
  }

  function markStepComplete() {
    setCompletedStepNumbers((s) => new Set(s).add(currentStep.stepNumber));
  }

  function goToNextStep() {
    if (isLastStep) {
      setStage("reflection");
    } else {
      setCurrentStepIndex((i) => i + 1);
    }
  }

  function finishSkill() {
    setCompletedAt(Date.now());
    setStage("completion");
  }

  const timeSpentMinutes = completedAt ? Math.max(1, Math.round((completedAt - startedAt) / 60000)) : 0;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={skill.difficulty === "BEGINNER" ? "success" : "accent"}>
            {skill.difficulty === "BEGINNER" ? dict.clinicalCases.difficultyBeginner : dict.clinicalCases.difficultyIntermediate}
          </Badge>
          <Badge tone="neutral">
            {dict.clinicalCases.durationMinutes.replace("{minutes}", String(skill.estimatedMinutes))}
          </Badge>
        </div>
        <h1 className="mt-2 text-2xl font-bold">{locale === "ar" ? skill.titleAr : skill.titleEn}</h1>
      </div>

      {stage === "intro" && (
        <>
          <Card className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.purposeLabel}</p>
              <p className="mt-1 text-sm">{locale === "ar" ? skill.descriptionAr : skill.descriptionEn}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.relevantSystemsLabel}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {skill.relevantSystems.map((system) => (
                  <Badge key={system} tone="primary">
                    {systemLabel(dict, system)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.learningObjectivesLabel}</p>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
                {(locale === "ar" ? skill.learningObjectivesAr : skill.learningObjectivesEn).map((objective, i) => (
                  <li key={i}>{objective}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.requiredEquipmentLabel}</p>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
                {(locale === "ar" ? skill.requiredEquipmentAr : skill.requiredEquipmentEn).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.prerequisitesLabel}</p>
              {(locale === "ar" ? skill.prerequisitesAr : skill.prerequisitesEn).length === 0 ? (
                <p className="mt-1 text-sm text-muted">{dict.nursingLab.noPrerequisites}</p>
              ) : (
                <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
                  {(locale === "ar" ? skill.prerequisitesAr : skill.prerequisitesEn).map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            <RelevantAnatomyLinks dict={dict} locale={locale} structureIds={skill.relevantStructureIds} />
          </Card>

          <Button onClick={() => setStage("preparation")}>{dict.nursingLab.startPreparationButton}</Button>
        </>
      )}

      {stage === "preparation" && (
        <>
          <Card className="space-y-4">
            <h2 className="text-lg font-bold">{dict.nursingLab.preparationSectionTitle}</h2>

            <div className="rounded-lg bg-background p-3">
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.patientSafetyTitle}</p>
              <p className="mt-1 text-sm">{dict.nursingLab.patientSafetyNote}</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.requiredEquipmentLabel}</p>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
                {(locale === "ar" ? skill.requiredEquipmentAr : skill.requiredEquipmentEn).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.preparationStepsLabel}</p>
              <ul className="mt-1 list-inside list-disc space-y-1 text-sm">
                {(locale === "ar" ? skill.preparationStepsAr : skill.preparationStepsEn).map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ul>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-bold">{dict.clinicalCases.virtualPatientTitle}</h2>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-muted">{dict.clinicalCases.ageLabel}</dt>
                <dd className="font-medium">{skill.patient.age}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{dict.clinicalCases.genderLabel}</dt>
                <dd className="font-medium">
                  {skill.patient.gender === "male" ? dict.clinicalCases.genderMale : dict.clinicalCases.genderFemale}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">{dict.nursingLab.patientCommunicationLabel}</dt>
                <dd className="font-medium">
                  {locale === "ar" ? skill.patient.communicationStateAr : skill.patient.communicationStateEn}
                </dd>
              </div>
            </dl>
            <div className="mt-4 rounded-lg bg-surface p-3">
              <p className="text-xs text-muted">{dict.nursingLab.patientScenarioLabel}</p>
              <p className="mt-1 text-sm font-medium">
                {locale === "ar" ? skill.patient.scenarioAr : skill.patient.scenarioEn}
              </p>
            </div>
          </Card>

          <Card>
            <p className="text-sm text-muted">{dict.clinicalCases.fictionalDisclaimer}</p>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setStage("intro")}>
              {dict.nursingLab.backButton}
            </Button>
            <Button onClick={() => setStage("procedure")}>{dict.nursingLab.proceedToProcedureButton}</Button>
          </div>
        </>
      )}

      {stage === "procedure" && (
        <>
          <Card className="space-y-4">
            <div>
              <h2 className="text-lg font-bold">{dict.nursingLab.procedureSectionTitle}</h2>
              <p className="mt-1 text-sm font-medium text-primary-700">
                {dict.nursingLab.stepLabelTemplate
                  .replace("{current}", String(currentStepIndex + 1))
                  .replace("{total}", String(skill.procedureSteps.length))}
              </p>
              <div
                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-surface"
                role="progressbar"
                aria-valuenow={currentStepIndex + 1}
                aria-valuemin={1}
                aria-valuemax={skill.procedureSteps.length}
                aria-label={dict.nursingLab.procedureSectionTitle}
              >
                <div
                  className="h-full rounded-full bg-primary-600 transition-all duration-500 ease-out"
                  style={{ width: `${((currentStepIndex + 1) / skill.procedureSteps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="rounded-lg bg-background p-4">
              <p className="text-sm font-medium">
                {locale === "ar" ? currentStep.instructionAr : currentStep.instructionEn}
              </p>
              <p className="mt-2 text-xs text-muted">
                <span className="font-semibold">{dict.nursingLab.requiredActionLabel}: </span>
                {locale === "ar" ? currentStep.requiredActionAr : currentStep.requiredActionEn}
              </p>
            </div>

            {currentStep.isObservationStep ? (
              <div>
                <p className="text-sm font-semibold">{dict.nursingLab.recordObservationsTitle}</p>
                <p className="mt-1 text-xs text-muted">{dict.nursingLab.recordObservationsHint}</p>
                <ul className="mt-3 space-y-2">
                  {skill.observations.map((obs) => {
                    const recorded = recordedObservationIds.has(obs.id);
                    return (
                      <li
                        key={obs.id}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface p-3"
                      >
                        <span className="text-sm font-medium">{locale === "ar" ? obs.labelAr : obs.labelEn}</span>
                        {recorded ? (
                          <span className="flex items-center gap-1 text-sm font-semibold text-green-800">
                            <span aria-hidden="true">✓</span>
                            {locale === "ar" ? obs.valueAr : obs.valueEn}
                          </span>
                        ) : (
                          <Button variant="outline" className="!px-3 !py-1.5 text-xs" onClick={() => recordObservation(obs.id)}>
                            {dict.nursingLab.recordButtonLabel}
                          </Button>
                        )}
                      </li>
                    );
                  })}
                </ul>
                <p className="mt-3 text-sm" role="status" aria-live="polite">
                  {allObservationsRecorded ? dict.nursingLab.allObservationsRecordedNotice : ""}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-sm" role="status" aria-live="polite">
                  {currentStepDone ? `✓ ${dict.nursingLab.stepCompletedLabel}` : ""}
                </p>
                {!currentStepDone && <Button onClick={markStepComplete}>{dict.nursingLab.markStepCompleteButton}</Button>}
              </div>
            )}
          </Card>

          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={() => setStage("preparation")}>
              {dict.nursingLab.exitSkillButton}
            </Button>
            <Button
              onClick={goToNextStep}
              disabled={currentStep.isObservationStep ? !allObservationsRecorded : !currentStepDone}
            >
              {dict.nursingLab.nextButton}
            </Button>
          </div>
        </>
      )}

      {stage === "reflection" && (
        <>
          <Card className="space-y-4">
            <h2 className="text-lg font-bold">{dict.clinicalCases.clinicalReasoningTitle}</h2>
            <p className="text-sm text-muted">{dict.nursingLab.reflectionIntro}</p>

            <div>
              <label htmlFor="reflection-observed" className="text-sm font-medium">
                {dict.nursingLab.reflectionQuestionObserved}
              </label>
              <textarea
                id="reflection-observed"
                value={reflection.observed}
                onChange={(e) => setReflection((r) => ({ ...r, observed: e.target.value }))}
                placeholder={dict.nursingLab.reflectionPlaceholder}
                rows={3}
                className={textareaClass}
              />
            </div>

            <div>
              <label htmlFor="reflection-most-important" className="text-sm font-medium">
                {dict.nursingLab.reflectionQuestionMostImportant}
              </label>
              <textarea
                id="reflection-most-important"
                value={reflection.mostImportant}
                onChange={(e) => setReflection((r) => ({ ...r, mostImportant: e.target.value }))}
                placeholder={dict.nursingLab.reflectionPlaceholder}
                rows={3}
                className={textareaClass}
              />
            </div>

            <div>
              <label htmlFor="reflection-next-assessment" className="text-sm font-medium">
                {dict.nursingLab.reflectionQuestionNextAssessment}
              </label>
              <textarea
                id="reflection-next-assessment"
                value={reflection.nextAssessment}
                onChange={(e) => setReflection((r) => ({ ...r, nextAssessment: e.target.value }))}
                placeholder={dict.nursingLab.reflectionPlaceholder}
                rows={3}
                className={textareaClass}
              />
            </div>
          </Card>

          <Button onClick={finishSkill} disabled={!reflectionComplete}>
            {dict.nursingLab.finishSkillButton}
          </Button>
        </>
      )}

      {stage === "completion" && (
        <>
          <Card className="space-y-4">
            <h2 className="text-lg font-bold text-green-800">✓ {dict.nursingLab.completionTitle}</h2>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.completedStepsLabel}</p>
              <p className="mt-1 text-sm">
                {dict.nursingLab.completedStepsTemplate
                  .replace("{completed}", String(completedStepNumbers.size))
                  .replace("{total}", String(skill.procedureSteps.length))}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.observationsRecordedLabel}</p>
              <ul className="mt-1 space-y-1 text-sm">
                {skill.observations.map((obs) => (
                  <li key={obs.id}>
                    {locale === "ar" ? obs.labelAr : obs.labelEn}: <span className="font-medium">{locale === "ar" ? obs.valueAr : obs.valueEn}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.reflectionResponsesLabel}</p>
              <dl className="mt-1 space-y-2 text-sm">
                <div>
                  <dt className="text-muted">{dict.nursingLab.reflectionQuestionObserved}</dt>
                  <dd>{reflection.observed}</dd>
                </div>
                <div>
                  <dt className="text-muted">{dict.nursingLab.reflectionQuestionMostImportant}</dt>
                  <dd>{reflection.mostImportant}</dd>
                </div>
                <div>
                  <dt className="text-muted">{dict.nursingLab.reflectionQuestionNextAssessment}</dt>
                  <dd>{reflection.nextAssessment}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="text-xs font-semibold text-muted">{dict.nursingLab.timeSpentLabel}</p>
              <p className="mt-1 text-sm">{dict.clinicalCases.durationMinutes.replace("{minutes}", String(timeSpentMinutes))}</p>
            </div>
          </Card>

          <Card className="space-y-3">
            <p className="text-xs font-semibold text-muted">{dict.nursingLab.nextRecommendedActionLabel}</p>
            <p className="text-sm">{dict.nursingLab.nextRecommendedActionText}</p>
            <RelevantAnatomyLinks dict={dict} locale={locale} structureIds={skill.relevantStructureIds} />
          </Card>

          <Card className="space-y-3">
            <h2 className="text-lg font-bold">{dict.nursingLab.continuePracticeTitle}</h2>
            <p className="text-sm text-muted">{dict.nursingLab.continuePracticeBody}</p>
            {relatedCase ? (
              <div className="rounded-lg border border-border bg-background p-4">
                <p className="text-xs font-semibold text-muted">{dict.nursingLab.relatedClinicalCaseLabel}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <Badge tone="primary">{relatedCase.categoryLabel}</Badge>
                  <Badge tone="neutral">{relatedCase.difficultyLabel}</Badge>
                </div>
                <h3 className="mt-2 font-bold">{relatedCase.title}</h3>
                <p className="mt-1 text-sm text-muted">{relatedCase.description}</p>
                <ButtonLink href={`/clinical-cases/${relatedCase.slug}`} className="mt-3 !px-4 !py-2 text-sm">
                  {dict.nursingLab.practiceClinicalCaseButton}
                </ButtonLink>
              </div>
            ) : (
              <p className="text-sm text-muted">{dict.nursingLab.noRelatedCaseAvailable}</p>
            )}
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={resetAll}>
              {dict.nursingLab.restartSkillButton}
            </Button>
            <Link
              href="/nursing-lab"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-transparent px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-surface"
            >
              {dict.nursingLab.backToSkillListButton}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
