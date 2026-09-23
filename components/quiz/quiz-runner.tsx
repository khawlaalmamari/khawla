"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Question = {
  id: string;
  type: string;
  text: string;
  choices: { id: string; label: string }[];
};

type QuizData = {
  moduleId: string;
  moduleTitle: string;
  passThreshold: number;
  questions: Question[];
};

export function QuizRunner({ courseSlug, moduleSlug }: { courseSlug: string; moduleSlug: string }) {
  const { dict } = useLocale();
  const router = useRouter();
  const [data, setData] = useState<QuizData | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    fetch(`/api/quiz/${moduleSlug}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError(dict.common.error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moduleSlug]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!data) return <p className="text-muted">{dict.common.loading}</p>;

  const question = data.questions[index];
  const isLast = index === data.questions.length - 1;
  const allAnswered = data.questions.every((q) => answers[q.id]);

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`/api/quiz/${moduleSlug}/attempt`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, selectedChoiceId]) => ({
            questionId,
            selectedChoiceId,
          })),
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(dict.common.error);
        return;
      }
      router.push(`/${courseSlug}/${moduleSlug}/quiz/${result.attemptId}`);
    } catch {
      setError(dict.common.error);
    } finally {
      setSubmitting(false);
    }
  }

  if (reviewing) {
    return (
      <div>
        <h2 className="text-lg font-bold">{dict.quiz.reviewAnswers}</h2>
        <p className="mt-1 text-sm text-muted">{dict.quiz.reviewIntro}</p>

        <div className="mt-4 space-y-2">
          {data.questions.map((q, i) => {
            const chosen = q.choices.find((c) => c.id === answers[q.id]);
            return (
              <Card key={q.id} className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs text-muted">
                    {dict.quiz.question} {i + 1}
                  </p>
                  <p className="truncate text-sm font-medium">{q.text}</p>
                  <p className={`text-sm ${chosen ? "text-foreground" : "text-danger"}`}>
                    {chosen ? chosen.label : dict.quiz.notAnswered}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="!px-3 !py-1.5 text-xs"
                  onClick={() => {
                    setIndex(i);
                    setReviewing(false);
                  }}
                >
                  {dict.quiz.edit}
                </Button>
              </Card>
            );
          })}
        </div>

        {error && <p className="mt-4 text-sm text-danger">{error}</p>}

        <div className="mt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={() => setReviewing(false)}>
            {dict.quiz.backToQuiz}
          </Button>
          <Button type="button" disabled={!allAnswered || submitting} onClick={submit}>
            {dict.quiz.submit}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-muted">
        {dict.quiz.question} {index + 1} {dict.quiz.of} {data.questions.length}
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface">
        <div
          className="h-full bg-primary-600 transition-all"
          style={{ width: `${((index + 1) / data.questions.length) * 100}%` }}
        />
      </div>

      <Card className="mt-6">
        <h2 className="text-lg font-semibold">{question.text}</h2>
        <div className="mt-4 space-y-2">
          {question.choices.map((choice) => (
            <label
              key={choice.id}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                answers[question.id] === choice.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-border hover:bg-surface"
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={choice.id}
                checked={answers[question.id] === choice.id}
                onChange={() => setAnswers((a) => ({ ...a, [question.id]: choice.id }))}
                className="accent-primary-600"
              />
              {choice.label}
            </label>
          ))}
        </div>
      </Card>

      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-6 flex justify-between">
        <Button
          type="button"
          variant="outline"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          {dict.quiz.previous}
        </Button>

        {isLast ? (
          <Button
            type="button"
            disabled={!answers[question.id]}
            onClick={() => setReviewing(true)}
          >
            {dict.quiz.reviewAnswers}
          </Button>
        ) : (
          <Button
            type="button"
            disabled={!answers[question.id]}
            onClick={() => setIndex((i) => Math.min(data.questions.length - 1, i + 1))}
          >
            {dict.quiz.next}
          </Button>
        )}
      </div>
    </div>
  );
}
