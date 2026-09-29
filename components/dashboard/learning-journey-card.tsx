import type { Dictionary } from "@/lib/i18n/dictionaries";
import type { LearningJourney, LearningStageId, LearningStageStatus } from "@/lib/dashboard/queries";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";

// Phase 3C-3 — reuses the exact status-tone/label convention already used
// for module status elsewhere (see components/course/course-overview.tsx)
// rather than inventing a new one.
function statusTone(status: LearningStageStatus): "success" | "primary" | "neutral" {
  if (status === "COMPLETED") return "success";
  if (status === "IN_PROGRESS") return "primary";
  return "neutral";
}

function statusLabel(dict: Dictionary, status: LearningStageStatus): string {
  if (status === "COMPLETED") return dict.course.completed;
  if (status === "IN_PROGRESS") return dict.course.inProgress;
  return dict.course.notStarted;
}

function statusGlyph(status: LearningStageStatus): string {
  if (status === "COMPLETED") return "✓";
  if (status === "IN_PROGRESS") return "…";
  return "○";
}

function stageLabel(dict: Dictionary, id: LearningStageId): string {
  switch (id) {
    case "ANATOMY":
      return dict.dashboard.stageAnatomy;
    case "NURSING_SKILL":
      return dict.dashboard.stageNursingSkill;
    case "CLINICAL_CASE":
      return dict.dashboard.stageClinicalCase;
    case "CLINICAL_REASONING":
      return dict.dashboard.stageClinicalReasoning;
    case "DEBRIEFING":
      return dict.dashboard.stageDebriefing;
  }
}

export function LearningJourneyCard({ dict, journey }: { dict: Dictionary; journey: LearningJourney }) {
  const { stages, currentStageId, stagesCompletedCount, nextAction } = journey;

  let ctaLabel: string;
  let ctaHref: string;
  switch (nextAction.kind) {
    case "ANATOMY":
      ctaLabel = dict.dashboard.continueAnatomyButton;
      ctaHref = "/anatomy";
      break;
    case "NURSING_SKILL":
      ctaLabel = dict.dashboard.practiceNursingSkillButton;
      ctaHref = "/nursing-lab";
      break;
    case "CLINICAL_CASE":
      ctaLabel = dict.nursingLab.practiceClinicalCaseButton;
      ctaHref = "/clinical-cases";
      break;
    case "CLINICAL_REASONING":
      ctaLabel = dict.clinicalCases.continueToReasoningButton;
      ctaHref = `/clinical-cases/${nextAction.caseSlug}/attempt/${nextAction.attemptId}`;
      break;
    case "DEBRIEFING":
      ctaLabel = dict.clinicalCases.continueToDebriefButton;
      ctaHref = `/clinical-cases/${nextAction.caseSlug}/attempt/${nextAction.attemptId}`;
      break;
    case "JOURNEY_COMPLETE":
      ctaLabel = dict.dashboard.reviewYourLearningButton;
      ctaHref = "/clinical-cases";
      break;
  }

  return (
    <Card>
      <h2 className="text-lg font-bold">{dict.dashboard.learningJourneyTitle}</h2>

      <ol className="mt-4 space-y-2">
        {stages.map((stage) => {
          const isCurrent = stage.id === currentStageId;
          return (
            <li
              key={stage.id}
              className={`flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm ${
                isCurrent ? "border border-primary-300 bg-primary-50" : "bg-surface"
              }`}
            >
              <span className="flex items-center gap-2 font-medium">
                <span aria-hidden="true">{statusGlyph(stage.status)}</span>
                {stageLabel(dict, stage.id)}
                {isCurrent && <Badge tone="accent">{dict.dashboard.currentStageLabel}</Badge>}
              </span>
              <Badge tone={statusTone(stage.status)}>{statusLabel(dict, stage.status)}</Badge>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 border-t border-border pt-4">
        {/* Always shown, even once "complete": Nursing Skill can never be
            verified as completed (no persistence exists for it — see
            getLearningJourney), so this count is never 5 of 5 in
            practice. Showing it here alongside "Learning Journey
            Complete" keeps that honest rather than implying full
            completion the app cannot actually verify. */}
        <p className="text-sm text-muted">
          {dict.dashboard.stagesCompletedTemplate
            .replace("{count}", String(stagesCompletedCount))
            .replace("{total}", String(stages.length))}
        </p>
        {currentStageId === null ? (
          <>
            <p className="mt-1 font-semibold text-success">{dict.dashboard.journeyCompleteTitle}</p>
            <p className="mt-1 text-sm text-muted">{dict.dashboard.journeyCompleteBody}</p>
          </>
        ) : (
          <p className="mt-1 text-sm font-medium">
            {dict.dashboard.currentStageTemplate.replace("{stage}", stageLabel(dict, currentStageId))}
          </p>
        )}

        <div className="mt-3">
          <p className="text-xs font-semibold text-muted">{dict.dashboard.nextLabel}</p>
          <ButtonLink href={ctaHref} variant="outline" className="mt-1 !px-4 !py-2 text-sm">
            {ctaLabel}
          </ButtonLink>
        </div>
      </div>
    </Card>
  );
}
