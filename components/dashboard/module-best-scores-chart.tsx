"use client";

import { useState } from "react";

const BAR_HEIGHT = 20;
const ROW_HEIGHT = 34;
const TRACK_COLOR = "#f1f5f9"; // neutral-100
const PASS_COLOR = "#0d9488"; // primary-600
const FAIL_COLOR = "#dc2626"; // danger
const TEXT_COLOR = "#334155"; // neutral-700
const MUTED_TEXT = "#64748b"; // neutral-500

export function ModuleBestScoresChart({
  data,
  emptyLabel,
  passedLabel,
  notYetLabel,
}: {
  data: { title: string; bestScore: number; passThreshold: number }[];
  emptyLabel: string;
  passedLabel: string;
  notYetLabel: string;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  const width = 520;
  const labelWidth = 148;
  const trackWidth = width - labelWidth - 44;
  const height = data.length * ROW_HEIGHT + 8;

  return (
    <div dir="ltr" className="relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img">
        {data.map((m, i) => {
          const y = i * ROW_HEIGHT + 8;
          const barW = Math.max(2, (m.bestScore / 100) * trackWidth);
          const passed = m.bestScore >= m.passThreshold;
          const color = passed ? PASS_COLOR : FAIL_COLOR;
          const isHovered = hoverIndex === i;
          return (
            <g key={m.title} onPointerEnter={() => setHoverIndex(i)} onPointerLeave={() => setHoverIndex(null)}>
              <text x={labelWidth - 10} y={y + BAR_HEIGHT / 2 + 4} fontSize={11} fill={TEXT_COLOR} textAnchor="end">
                {m.title.length > 20 ? `${m.title.slice(0, 19)}…` : m.title}
              </text>
              <rect x={labelWidth} y={y} width={trackWidth} height={BAR_HEIGHT} rx={4} fill={TRACK_COLOR} />
              <rect
                x={labelWidth}
                y={y}
                width={barW}
                height={BAR_HEIGHT}
                rx={4}
                fill={color}
                opacity={isHovered ? 0.85 : 1}
              />
              <text x={labelWidth + barW + 8} y={y + BAR_HEIGHT / 2 + 4} fontSize={11} fontWeight={600} fill={MUTED_TEXT}>
                {m.bestScore}%
              </text>
              <rect x={0} y={y - 4} width={width} height={ROW_HEIGHT} fill="transparent" />
            </g>
          );
        })}
      </svg>

      {hoverIndex != null && (
        <div className="pointer-events-none absolute end-2 top-0 rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-md">
          <div className="font-semibold">{data[hoverIndex].title}</div>
          <div className="text-muted">
            {data[hoverIndex].bestScore >= data[hoverIndex].passThreshold ? passedLabel : notYetLabel}
          </div>
        </div>
      )}
    </div>
  );
}
