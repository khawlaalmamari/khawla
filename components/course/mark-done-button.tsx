"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";

type Status = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export function MarkDoneButton({
  moduleSlug,
  initialStatus,
  lockedByQuiz,
}: {
  moduleSlug: string;
  initialStatus: Status;
  lockedByQuiz: boolean;
}) {
  const { dict } = useLocale();
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [pending, setPending] = useState(false);

  const isCompleted = status === "COMPLETED";

  async function toggle() {
    setPending(true);
    try {
      const res = await fetch(`/api/modules/${moduleSlug}/complete`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !isCompleted }),
      });
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status as Status);
        router.refresh();
      }
    } finally {
      setPending(false);
    }
  }

  return (
    <Button
      type="button"
      variant={isCompleted ? "outline" : "primary"}
      onClick={toggle}
      disabled={pending || (isCompleted && lockedByQuiz)}
      className={isCompleted ? "!border-green-300 !text-green-700 hover:!bg-green-50" : ""}
    >
      {isCompleted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      )}
      {isCompleted ? dict.course.markedDone : dict.course.markAsDone}
    </Button>
  );
}
