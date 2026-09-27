"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function StartSimulationButton({
  slug,
  label,
  errorLabel,
}: {
  slug: string;
  label: string;
  errorLabel: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function onClick() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(`/api/clinical-cases/${slug}/attempts`, { method: "POST" });
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await res.json();
      router.push(`/clinical-cases/${slug}/attempt/${data.attemptId}`);
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div>
      <Button onClick={onClick} disabled={loading}>
        {label}
      </Button>
      {error && <p className="mt-2 text-sm text-danger">{errorLabel}</p>}
    </div>
  );
}
