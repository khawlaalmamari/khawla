"use client";

import { useCallback, useMemo, useState } from "react";
import { ReactFlow, Background, Controls, Position, type Node, type Edge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useLocale } from "@/components/locale-provider";
import type { MindMapData, MindMapNodeKind } from "@/lib/mindmap/types";
import { computeMindMapLayout } from "@/lib/mindmap/layout";

const NODE_STYLE: Record<MindMapNodeKind, React.CSSProperties> = {
  module: {
    background: "#0d9488",
    color: "#ffffff",
    fontWeight: 700,
    fontSize: 14,
    borderRadius: 12,
    padding: "10px 18px",
    border: "none",
    boxShadow: "0 4px 14px rgba(13,148,136,0.35)",
  },
  lesson: {
    background: "#1e293b",
    color: "#e2e8f0",
    fontWeight: 600,
    fontSize: 13,
    borderRadius: 10,
    padding: "8px 14px",
    border: "1.5px solid #0d9488",
    cursor: "pointer",
  },
  term: {
    background: "#0f172a",
    color: "#94a3b8",
    fontWeight: 500,
    fontSize: 12,
    borderRadius: 8,
    padding: "6px 12px",
    border: "1px solid #334155",
  },
};

export function ModuleMindMap({ data }: { data: MindMapData }) {
  const { locale, dict } = useLocale();
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const positions = useMemo(() => computeMindMapLayout(data), [data]);
  const parentOf = useMemo(() => new Map(data.nodes.map((n) => [n.id, n.parentId])), [data.nodes]);
  const lessonIds = useMemo(
    () => new Set(data.nodes.filter((n) => n.kind === "lesson").map((n) => n.id)),
    [data.nodes],
  );

  const hiddenIds = useMemo(() => {
    const hidden = new Set<string>();
    for (const node of data.nodes) {
      let cursor = node.parentId;
      while (cursor) {
        if (collapsed.has(cursor)) {
          hidden.add(node.id);
          break;
        }
        cursor = parentOf.get(cursor) ?? null;
      }
    }
    return hidden;
  }, [data.nodes, parentOf, collapsed]);

  const nodes: Node[] = useMemo(
    () =>
      data.nodes
        .filter((n) => !hiddenIds.has(n.id))
        .map((n) => ({
          id: n.id,
          position: positions.get(n.id) ?? { x: 0, y: 0 },
          data: {
            label: `${locale === "ar" ? n.labelAr : n.labelEn}${
              n.kind === "lesson" ? (collapsed.has(n.id) ? " ＋" : " −") : ""
            }`,
          },
          style: NODE_STYLE[n.kind],
          sourcePosition: Position.Bottom,
          targetPosition: Position.Top,
        })),
    [data.nodes, positions, hiddenIds, locale, collapsed],
  );

  const edges: Edge[] = useMemo(
    () =>
      data.edges
        .filter((e) => !hiddenIds.has(e.target))
        .map((e) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          style: { stroke: "#0d9488", strokeWidth: 1.5 },
        })),
    [data.edges, hiddenIds],
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (!lessonIds.has(node.id)) return;
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) next.delete(node.id);
        else next.add(node.id);
        return next;
      });
    },
    [lessonIds],
  );

  return (
    <div>
      <div
        className="h-[420px] w-full overflow-hidden rounded-xl border border-border transition-[height] duration-300"
        style={{ background: "#121824" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.3}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#334155" gap={22} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>
      <p className="mt-2 text-xs text-muted">{dict.course.mindMapHint}</p>
    </div>
  );
}
