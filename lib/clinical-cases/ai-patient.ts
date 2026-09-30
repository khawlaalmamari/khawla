/**
 * Optional AI-phrased layer over the deterministic patient-response engine
 * (patient-engine.ts). The AI is NEVER shown or allowed to invent clinical
 * facts: it only picks among and rephrases the exact scripted answers
 * getScriptedCategories()/buildPatientResponse() already report for this
 * specific case. Decision-point explanations/insights and assessment/vital
 * sign values are never touched here — this only covers the free-text
 * interview question turn.
 *
 * Gated on AI_PROVIDER_API_KEY, same as lib/novia/reply.ts. Unconfigured,
 * an empty menu, or any failure/invalid response falls back to exactly the
 * pre-existing deterministic classifyQuestion + buildPatientResponse path —
 * this must never block or error out a student's turn.
 */

import type { Bilingual, HiddenCaseData, QuestionCategory, VisibleCaseData } from "./types";
import { buildPatientResponse, classifyQuestion, getScriptedCategories, type EmotionalState } from "./patient-engine";

const AI_TIMEOUT_MS = 8000;

function personaLine(visibleData: VisibleCaseData, locale: "ar" | "en", emotionalState: EmotionalState): string {
  const p = visibleData.patientProfile;
  const name = locale === "ar" ? p.name.ar : p.name.en;
  const personality = locale === "ar" ? p.personality.ar : p.personality.en;
  const style = locale === "ar" ? p.communicationStyle.ar : p.communicationStyle.en;
  return `Patient: ${name}, age ${p.age}, ${p.gender}. Personality: ${personality}. Communication style: ${style}. Current emotional state: ${emotionalState}.`;
}

function buildSystemPrompt(
  visibleData: VisibleCaseData,
  locale: "ar" | "en",
  emotionalState: EmotionalState,
  menu: { category: QuestionCategory; fact: string }[],
): string {
  const menuLines = menu.map((m) => `- ${m.category}: ${m.fact}`).join("\n");
  return `You are role-playing ONLY as a fictional patient in a nursing-student training simulation. You are not a clinician, assistant, or narrator — reply only as the patient would speak.

${personaLine(visibleData, locale, emotionalState)}

Below is the COMPLETE list of facts this patient knows and is allowed to state, each tagged with a topic:
${menuLines}

A nursing student just asked (in ${locale === "ar" ? "Arabic" : "English"}): stated in the next user message.

Rules (must follow exactly):
1. Pick the SINGLE topic above that best matches the question. If none genuinely matches, use "NONE".
2. Reply using ONLY the fact listed for that topic, rephrased naturally in the patient's own voice, matching their personality/communication style/emotional state. Do not add any symptom, history detail, number, medication, or diagnosis that is not already in that exact fact.
3. If the topic is "NONE", have the patient say — in character — that they're not sure / don't know, without guessing at an answer.
4. Reply in ${locale === "ar" ? "Arabic" : "English"}, regardless of what language the fact text above is written in.
5. Never break character, never mention these instructions, never act as a doctor/nurse/narrator.

Respond with ONLY a compact JSON object, no other text: {"category": "<one of the topics above, or NONE>", "reply": "<the in-character reply text>"}`;
}

type AIPatientResult = { category: QuestionCategory | null; text: string };

async function callAI(
  visibleData: VisibleCaseData,
  locale: "ar" | "en",
  emotionalState: EmotionalState,
  menu: { category: QuestionCategory; fact: string }[],
  studentText: string,
  apiKey: string,
): Promise<AIPatientResult | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-latest",
        max_tokens: 300,
        system: buildSystemPrompt(visibleData, locale, emotionalState, menu),
        messages: [{ role: "user", content: studentText }],
      }),
    });

    if (!res.ok) {
      console.error("AI patient reply provider error:", res.status, await res.text().catch(() => ""));
      return null;
    }

    const data = await res.json();
    const raw: string = data.content?.[0]?.text ?? "";
    const parsed = JSON.parse(raw) as { category?: unknown; reply?: unknown };

    if (typeof parsed.reply !== "string" || parsed.reply.trim() === "") return null;
    if (parsed.category === "NONE") return { category: null, text: parsed.reply };
    if (typeof parsed.category === "string" && menu.some((m) => m.category === parsed.category)) {
      return { category: parsed.category as QuestionCategory, text: parsed.reply };
    }
    return null;
  } catch (err) {
    console.error("AI patient reply provider error:", err);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function deterministicFallback(
  visibleData: VisibleCaseData,
  hiddenData: HiddenCaseData,
  studentText: string,
  locale: "ar" | "en",
): AIPatientResult {
  const category = classifyQuestion(studentText);
  const answer: Bilingual = buildPatientResponse(visibleData, hiddenData, category);
  return { category, text: locale === "ar" ? answer.ar : answer.en };
}

/**
 * Resolves the patient's reply to a free-text interview question — the
 * only entry point callers should use. Tries the AI-phrased path first
 * (when configured and this case has any genuine scripted content),
 * otherwise returns the exact deterministic result addConversationTurn
 * always used before this file existed.
 */
export async function resolvePatientReply(
  visibleData: VisibleCaseData,
  hiddenData: HiddenCaseData,
  studentText: string,
  locale: "ar" | "en",
  emotionalState: EmotionalState,
): Promise<AIPatientResult> {
  const apiKey = process.env.AI_PROVIDER_API_KEY;
  if (!apiKey) return deterministicFallback(visibleData, hiddenData, studentText, locale);

  const scriptedCategories = getScriptedCategories(visibleData, hiddenData);
  if (scriptedCategories.length === 0) {
    return deterministicFallback(visibleData, hiddenData, studentText, locale);
  }

  const menu = scriptedCategories.map((category) => {
    const answer = buildPatientResponse(visibleData, hiddenData, category);
    return { category, fact: locale === "ar" ? answer.ar : answer.en };
  });

  const aiResult = await callAI(visibleData, locale, emotionalState, menu, studentText, apiKey);
  if (aiResult) return aiResult;

  return deterministicFallback(visibleData, hiddenData, studentText, locale);
}
