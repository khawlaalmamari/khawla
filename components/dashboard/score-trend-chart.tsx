"use client";

import { useState } from "react";

const WIDTH = 560;
const HEIGHT = 200;
const PAD_LEFT = 32;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const LINE_COLOR = "#0d9488"; // primary-600
const GRID_COLOR = "#e2e8f0"; // neutral-200
const AXIS_TEXT = "#64748b"; // neutral-500
const THRESHOLD_COLOR = "#f59e0b"; // accent-500

export function ScoreTrendChart({
  data,
  passThreshold,
  emptyLabel,
  passLineLabel,
}: {
  data: { date: string; score: number; label: string }[];
  passThreshold: number;
  emptyLabel: string;
  passLineLabel: string;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (data.length === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;

  const xAt = (i: number) => PAD_LEFT + i * stepX;
  const yAt = (v: number) => PAD_TOP + plotH - (v / 100) * plotH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(d.score)}`).join(" ");
  const gridTicks = [0, 25, 50, 75, 100];
  const hovered = hoverIndex != null ? data[hoverIndex] : null;

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const i = Math.round((relX - PAD_LEFT) / (stepX || 1));
    setHoverIndex(Math.max(0, Math.min(data.length - 1, i)));
  }

  return (
    <div dir="ltr" className="relative">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img">
        {gridTicks.map((tick) => (
          <g key={tick}>
            <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={yAt(tick)} y2={yAt(tick)} stroke={GRID_COLOR} strokeWidth={1} />
            <text x={PAD_LEFT - 6} y={yAt(tick) + 3} fontSize={10} fill={AXIS_TEXT} textAnchor="end">
              {tick}
            </text>
          </g>
        ))}

        <line
          x1={PAD_LEFT}
          x2={WIDTH - PAD_RIGHT}
          y1={yAt(passThreshold)}
          y2={yAt(passThreshold)}
          stroke={THRESHOLD_COLOR}
          strokeWidth={1.5}
          strokeDasharray="4 3"
        />
        <text x={WIDTH - PAD_RIGHT} y={yAt(passThreshold) - 4} fontSize={9} fill={THRESHOLD_COLOR} textAnchor="end">
          {passLineLabel.replace("{score}", String(passThreshold))}
        </text>

        {data.map(
          (d, i) =>
            (i === 0 || i === data.length - 1) && (
              <text key={d.date} x={xAt(i)} y={HEIGHT - 8} fontSize={10} fill={AXIS_TEXT} textAnchor="middle">
                {d.label}
              </text>
            ),
        )}

        <path d={linePath} fill="none" stroke={LINE_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => (
          <circle key={d.date} cx={xAt(i)} cy={yAt(d.score)} r={4} fill={LINE_COLOR} stroke="#ffffff" strokeWidth={1.5} />
        ))}

        {hovered && (
          <line x1={xAt(hoverIndex!)} x2={xAt(hoverIndex!)} y1={PAD_TOP} y2={PAD_TOP + plotH} stroke={GRID_COLOR} strokeWidth={1} />
        )}

        <rect
          x={PAD_LEFT}
          y={PAD_TOP}
          width={plotW}
          height={plotH}
          fill="transparent"
          onPointerMove={onMove}
          onPointerLeave={() => setHoverIndex(null)}
        />
      </svg>

      {hovered && (
        <div
          className="pointer-events-none absolute rounded-lg border border-border bg-background px-2.5 py-1.5 text-xs shadow-md"
          style={{ left: `${(xAt(hoverIndex!) / WIDTH) * 100}%`, top: 4, transform: "translateX(-50%)" }}
        >
          <div className="font-semibold">{hovered.score}%</div>
          <div className="text-muted">{hovered.label}</div>
        </div>
      )}
    </div>
  );
}
