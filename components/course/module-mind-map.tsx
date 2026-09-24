"use client";

import { useCallback, useMemo, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  BaseEdge,
  Position,
  getBezierPath,
  useInternalNode,
  type Node,
  type Edge,
  type EdgeProps,
  type InternalNode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useLocale } from "@/components/locale-provider";
import type { MindMapData, MindMapNodeKind } from "@/lib/mindmap/types";
import { computeMindMapLayout } from "@/lib/mindmap/layout";
import { assignBranchColors } from "@/lib/mindmap/colors";

const HUB_COLOR = "#0d9488";

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function styleForKind(kind: MindMapNodeKind, branchColor: string): React.CSSProperties {
  if (kind === "module") {
    return {
      background: HUB_COLOR,
      color: "#ffffff",
      fontWeight: 700,
      fontSize: 15,
      borderRadius: 999,
      padding: "16px 26px",
      border: "2px solid rgba(255,255,255,0.25)",
      boxShadow: `0 0 0 6px ${hexToRgba(HUB_COLOR, 0.15)}, 0 8px 24px ${hexToRgba(HUB_COLOR, 0.45)}`,
      textAlign: "center",
    };
  }
  if (kind === "lesson") {
    return {
      background: branchColor,
      color: "#ffffff",
      fontWeight: 600,
      fontSize: 13,
      borderRadius: 999,
      padding: "10px 16px",
      border: "none",
      boxShadow: `0 4px 14px ${hexToRgba(branchColor, 0.45)}`,
      cursor: "pointer",
    };
  }
  return {
    background: "#121824",
    color: "#e2e8f0",
    fontWeight: 500,
    fontSize: 12,
    borderRadius: 10,
    padding: "6px 12px",
    border: `1.5px solid ${branchColor}`,
  };
}

// Radial layouts fan out in every direction, so a fixed left/right handle
// pair (as a hierarchical tree can get away with) would make edges loop
// oddly for branches above/below/left of a node. Instead we compute where
// the connecting line actually crosses each node's box, live, from its
// real on-screen position/size — the "floating edge" pattern.
function getNodeIntersection(intersectionNode: InternalNode, targetNode: InternalNode) {
  const { width, height } = intersectionNode.measured;
  const intersectionPos = intersectionNode.internals.positionAbsolute;
  const targetPos = targetNode.internals.positionAbsolute;

  const w = (width ?? 0) / 2;
  const h = (height ?? 0) / 2;
  const x2 = intersectionPos.x + w;
  const y2 = intersectionPos.y + h;
  const x1 = targetPos.x + (targetNode.measured.width ?? 0) / 2;
  const y1 = targetPos.y + (targetNode.measured.height ?? 0) / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1) || 1);
  const xx3 = a * xx1;
  const yy3 = a * yy1;

  return { x: w * (xx3 + yy3) + x2, y: h * (-xx3 + yy3) + y2 };
}

function getEdgePosition(node: InternalNode, intersectionPoint: { x: number; y: number }): Position {
  const nx = Math.round(node.internals.positionAbsolute.x);
  const ny = Math.round(node.internals.positionAbsolute.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);
  const width = node.measured.width ?? 0;
  const height = node.measured.height ?? 0;

  if (px <= nx + 1) return Position.Left;
  if (px >= nx + width - 1) return Position.Right;
  if (py <= ny + 1) return Position.Top;
  if (py >= ny + height - 1) return Position.Bottom;
  return Position.Top;
}

function getFloatingEdgeParams(source: InternalNode, target: InternalNode) {
  const sourceIntersection = getNodeIntersection(source, target);
  const targetIntersection = getNodeIntersection(target, source);
  return {
    sx: sourceIntersection.x,
    sy: sourceIntersection.y,
    tx: targetIntersection.x,
    ty: targetIntersection.y,
    sourcePos: getEdgePosition(source, sourceIntersection),
    targetPos: getEdgePosition(target, targetIntersection),
  };
}

function FloatingEdge({ id, source, target, style, markerEnd }: EdgeProps) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode?.measured.width || !targetNode?.measured.width) return null;

  const { sx, sy, tx, ty, sourcePos, targetPos } = getFloatingEdgeParams(sourceNode, targetNode);
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  });

  return <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />;
}

const edgeTypes = { floating: FloatingEdge };

export function ModuleMindMap({ data }: { data: MindMapData }) {
  const { locale, dict } = useLocale();
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const positions = useMemo(() => computeMindMapLayout(data), [data]);
  const branchColors = useMemo(() => assignBranchColors(data), [data]);
  const parentOf = useMemo(() => new Map(data.nodes.map((n) => [n.id, n.parentId])), [data.nodes]);
  const rootId = useMemo(() => data.nodes.find((n) => n.parentId === null)?.id, [data.nodes]);
  // Collapsible = has children, excluding the central hub itself: clicking
  // "any main branch" should fold that branch, not hide the whole map.
  const collapsible = useMemo(() => {
    const set = new Set<string>();
    for (const edge of data.edges) if (edge.source !== rootId) set.add(edge.source);
    return set;
  }, [data.edges, rootId]);

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
      data.nodes.map((n) => {
        const isHidden = hiddenIds.has(n.id);
        const branchColor = branchColors.get(n.id) ?? HUB_COLOR;
        return {
          id: n.id,
          position: positions.get(n.id) ?? { x: 0, y: 0 },
          data: {
            label: `${locale === "ar" ? n.labelAr : n.labelEn}${
              collapsible.has(n.id) ? (collapsed.has(n.id) ? " ＋" : " −") : ""
            }`,
          },
          className: "transition-all duration-300 ease-out",
          style: {
            ...styleForKind(n.kind, branchColor),
            opacity: isHidden ? 0 : 1,
            transform: isHidden ? "scale(0.4)" : "scale(1)",
            pointerEvents: isHidden ? "none" : "auto",
          },
          draggable: !isHidden,
        };
      }),
    [data.nodes, positions, branchColors, hiddenIds, collapsible, locale, collapsed],
  );

  const edges: Edge[] = useMemo(
    () =>
      data.edges.map((e) => {
        const isHidden = hiddenIds.has(e.target);
        const color = branchColors.get(e.target) ?? HUB_COLOR;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          type: "floating",
          className: "transition-all duration-300 ease-out",
          style: {
            stroke: color,
            strokeWidth: parentOf.get(e.source) === null ? 2.5 : 1.5,
            opacity: isHidden ? 0 : 0.85,
          },
        };
      }),
    [data.edges, hiddenIds, branchColors, parentOf],
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (!collapsible.has(node.id)) return;
      setCollapsed((prev) => {
        const next = new Set(prev);
        if (next.has(node.id)) next.delete(node.id);
        else next.add(node.id);
        return next;
      });
    },
    [collapsible],
  );

  return (
    <div>
      <div
        className="h-[420px] w-full overflow-hidden rounded-xl border border-border"
        style={{ background: "#121824" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.2}
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
