"use client";

import { useState } from "react";

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const LINE_COLOR = "#0d9488"; // primary-600
const AREA_COLOR = "#0d9488";
const GRID_COLOR = "#e2e8f0"; // neutral-200
const AXIS_TEXT = "#64748b"; // neutral-500

function niceMax(value: number): number {
  if (value <= 4) return 4;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const step = value / pow <= 2 ? pow / 2 : value / pow <= 5 ? pow : pow * 2;
  return Math.ceil(value / step) * step;
}

export function SignupsTrendChart({
  data,
  emptyLabel,
  totalLabel,
}: {
  data: { date: string; count: number; label: string }[];
  emptyLabel: string;
  totalLabel: string;
}) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.count, 0);
  if (total === 0) {
    return <p className="text-sm text-muted">{emptyLabel}</p>;
  }

  const maxY = niceMax(Math.max(...data.map((d) => d.count)));
  const plotW = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const stepX = data.length > 1 ? plotW / (data.length - 1) : 0;

  const xAt = (i: number) => PAD_LEFT + i * stepX;
  const yAt = (v: number) => PAD_TOP + plotH - (v / maxY) * plotH;

  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"}${xAt(i)},${yAt(d.count)}`).join(" ");
  const areaPath = `${linePath} L${xAt(data.length - 1)},${PAD_TOP + plotH} L${xAt(0)},${PAD_TOP + plotH} Z`;

  const gridTicks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round(maxY * f));
  // Show a handful of x-axis labels: start, ~thirds, end — never every day.
  const labelIndices = new Set(
    [0, Math.floor((data.length - 1) / 3), Math.floor(((data.length - 1) * 2) / 3), data.length - 1].filter(
      (i, idx, arr) => arr.indexOf(i) === idx,
    ),
  );

  const hovered = hoverIndex != null ? data[hoverIndex] : null;

  function onMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    const i = Math.round((relX - PAD_LEFT) / (stepX || 1));
    setHoverIndex(Math.max(0, Math.min(data.length - 1, i)));
  }

  return (
    <div dir="ltr">
      <p className="mb-2 text-xs text-muted">{totalLabel.replace("{count}", String(total))}</p>
      <div className="relative">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img">
          {gridTicks.map((tick) => (
            <g key={tick}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={yAt(tick)}
                y2={yAt(tick)}
                stroke={GRID_COLOR}
                strokeWidth={1}
              />
              <text x={PAD_LEFT - 8} y={yAt(tick) + 3} fontSize={10} fill={AXIS_TEXT} textAnchor="end">
                {tick}
              </text>
            </g>
          ))}

          {data.map(
            (d, i) =>
              labelIndices.has(i) && (
                <text
                  key={d.date}
                  x={xAt(i)}
                  y={HEIGHT - 8}
                  fontSize={10}
                  fill={AXIS_TEXT}
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              ),
          )}

          <path d={areaPath} fill={AREA_COLOR} opacity={0.1} />
          <path d={linePath} fill="none" stroke={LINE_COLOR} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {hovered && (
            <>
              <line
                x1={xAt(hoverIndex!)}
                x2={xAt(hoverIndex!)}
                y1={PAD_TOP}
                y2={PAD_TOP + plotH}
                stroke={GRID_COLOR}
                strokeWidth={1}
              />
              <circle
                cx={xAt(hoverIndex!)}
                cy={yAt(hovered.count)}
                r={4}
                fill={LINE_COLOR}
                stroke="#ffffff"
                strokeWidth={2}
              />
            </>
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
            style={{
              left: `${(xAt(hoverIndex!) / WIDTH) * 100}%`,
              top: 4,
              transform: "translateX(-50%)",
            }}
          >
            <div className="font-semibold">{hovered.count}</div>
            <div className="text-muted">{hovered.label}</div>
          </div>
        )}
      </div>
    </div>
  );
}
