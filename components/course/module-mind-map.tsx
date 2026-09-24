"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  BaseEdge,
  Position,
  getBezierPath,
  getViewportForBounds,
  useInternalNode,
  useReactFlow,
  ReactFlowProvider,
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
import { Button } from "@/components/ui/button";

const HUB_COLOR = "#0d9488";
const BOX_BG = "#121824";

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function styleForKind(kind: MindMapNodeKind, branchColor: string): React.CSSProperties {
  const shared: React.CSSProperties = {
    whiteSpace: "normal",
    wordBreak: "break-word",
    lineHeight: 1.35,
    textAlign: "center",
  };
  if (kind === "module") {
    return {
      ...shared,
      background: `linear-gradient(135deg, ${HUB_COLOR}, #0f766e)`,
      color: "#ffffff",
      fontWeight: 800,
      fontSize: 16,
      borderRadius: 24,
      padding: "20px 30px",
      minWidth: 200,
      maxWidth: 260,
      border: "3px solid rgba(255,255,255,0.3)",
      boxShadow: `0 0 0 8px ${hexToRgba(HUB_COLOR, 0.15)}, 0 10px 28px ${hexToRgba(HUB_COLOR, 0.5)}`,
    };
  }
  if (kind === "lesson") {
    return {
      ...shared,
      background: branchColor,
      color: "#ffffff",
      fontWeight: 700,
      fontSize: 14,
      borderRadius: 18,
      padding: "14px 18px",
      minWidth: 150,
      maxWidth: 190,
      border: "3px solid rgba(255,255,255,0.2)",
      boxShadow: `0 6px 18px ${hexToRgba(branchColor, 0.5)}`,
      cursor: "pointer",
    };
  }
  return {
    ...shared,
    background: "#1e2636",
    color: "#f1f5f9",
    fontWeight: 600,
    fontSize: 13,
    borderRadius: 14,
    padding: "10px 14px",
    minWidth: 130,
    maxWidth: 175,
    border: `2.5px solid ${branchColor}`,
    boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
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

  return <BaseEdge id={id} path={edgePath} style={{ strokeLinecap: "round", ...style }} markerEnd={markerEnd} />;
}

const edgeTypes = { floating: FloatingEdge };

function findRootId(data: MindMapData): string | undefined {
  return data.nodes.find((n) => n.parentId === null)?.id;
}

function computeCollapsibleIds(data: MindMapData, rootId: string | undefined): Set<string> {
  const set = new Set<string>();
  for (const edge of data.edges) if (edge.source !== rootId) set.add(edge.source);
  return set;
}

function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/[^\p{L}\p{N}]+/gu, "-")
      .replace(/(^-|-$)/g, "") || "mind-map"
  );
}

// Approximate on-screen card sizes, matching styleForKind's min/max widths.
// Used only to compute the fit viewport analytically from our own layout
// positions — React Flow's asynchronous per-node DOM measurement isn't
// reliable enough here (a card's real size can lag behind a collapse
// toggle), so we don't wait on it at all for this fixed, non-interactive
// canvas.
// Generous on height in particular: Arabic lesson/term titles often wrap to
// 3-4 lines, and undershooting here is what clips a card at the box edge.
const FIT_NODE_SIZE: Record<MindMapNodeKind, { width: number; height: number }> = {
  module: { width: 240, height: 130 },
  lesson: { width: 180, height: 210 },
  term: { width: 165, height: 180 },
};

function ModuleMindMapInner({ data }: { data: MindMapData }) {
  const { locale, dict } = useLocale();
  const { setViewport, getNodesBounds } = useReactFlow();
  const rootId = useMemo(() => findRootId(data), [data]);
  const collapsible = useMemo(() => computeCollapsibleIds(data, rootId), [data, rootId]);
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(collapsible));
  const [busy, setBusy] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const positions = useMemo(() => computeMindMapLayout(data), [data]);
  const branchColors = useMemo(() => assignBranchColors(data), [data]);
  const parentOf = useMemo(() => new Map(data.nodes.map((n) => [n.id, n.parentId])), [data.nodes]);
  const nodeById = useMemo(() => new Map(data.nodes.map((n) => [n.id, n])), [data.nodes]);

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

  const visibleIds = useMemo(
    () => data.nodes.filter((n) => !hiddenIds.has(n.id)).map((n) => n.id),
    [data.nodes, hiddenIds],
  );

  // Keeps the fixed (non-pannable, non-zoomable) viewport auto-centered and
  // scaled to whatever set of cards is currently visible, computed purely
  // from our own layout positions and approximate card sizes rather than
  // React Flow's asynchronous DOM measurement of each node.
  useEffect(() => {
    function recomputeFit() {
      const el = containerRef.current;
      if (!el || visibleIds.length === 0) return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const boundsNodes = visibleIds.map((id) => {
        const size = FIT_NODE_SIZE[nodeById.get(id)?.kind ?? "term"];
        return { id, position: positions.get(id) ?? { x: 0, y: 0 }, data: {}, ...size };
      });
      const bounds = getNodesBounds(boundsNodes);
      const viewport = getViewportForBounds(bounds, rect.width, rect.height, 0.15, 1.3, 0.3);
      setViewport(viewport, { duration: 300 });
    }
    recomputeFit();
    window.addEventListener("resize", recomputeFit);
    return () => window.removeEventListener("resize", recomputeFit);
  }, [visibleIds, positions, nodeById, setViewport, getNodesBounds]);

  const nodes: Node[] = useMemo(
    () =>
      data.nodes.map((n) => {
        const isHidden = hiddenIds.has(n.id);
        const branchColor = branchColors.get(n.id) ?? HUB_COLOR;
        const pos = positions.get(n.id) ?? { x: 0, y: 0 };
        return {
          id: n.id,
          position: pos,
          data: {
            label: `${locale === "ar" ? n.labelAr : n.labelEn}${
              collapsible.has(n.id) ? (collapsed.has(n.id) ? " ＋" : " −") : ""
            }`,
          },
          className: "transition-all duration-300 ease-out",
          style: {
            ...styleForKind(n.kind, branchColor),
            opacity: isHidden ? 0 : 1,
            // React Flow positions each node via its own `transform:
            // translate(...)` on this same style object, so our scale
            // animation must be composed onto it here rather than set
            // alone — a bare `scale(...)` would replace (not add to)
            // React Flow's translate and collapse every card to (0,0).
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${isHidden ? 0.4 : 1})`,
            pointerEvents: isHidden ? "none" : "auto",
          },
          draggable: false,
          selectable: false,
        };
      }),
    [data.nodes, positions, branchColors, hiddenIds, collapsible, locale, collapsed],
  );

  const edges: Edge[] = useMemo(
    () =>
      data.edges.map((e) => {
        const isHidden = hiddenIds.has(e.target);
        const color = branchColors.get(e.target) ?? HUB_COLOR;
        const fromRoot = parentOf.get(e.source) === null;
        return {
          id: e.id,
          source: e.source,
          target: e.target,
          type: "floating",
          className: "transition-all duration-300 ease-out",
          style: {
            stroke: color,
            strokeWidth: fromRoot ? 6 : 4,
            opacity: isHidden ? 0 : 0.95,
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

  async function handleExportPdf() {
    if (busy) return;
    setBusy(true);
    const previousCollapsed = collapsed;
    setCollapsed(new Set());
    await new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const el = containerRef.current;
      if (!el) return;
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);
      const canvas = await html2canvas(el, { backgroundColor: BOX_BG, scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const orientation = canvas.width >= canvas.height ? "landscape" : "portrait";
      const pdf = new jsPDF({ orientation, unit: "px", format: [canvas.width, canvas.height] });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      // English label, regardless of UI locale: a plain ASCII filename
      // downloads reliably across browsers/OSes, unlike Arabic text.
      const rootLabel = nodeById.get(rootId ?? "")?.labelEn ?? "";
      pdf.save(`${slugify(rootLabel || "module")}-mindmap.pdf`);
    } finally {
      setCollapsed(previousCollapsed);
      setBusy(false);
    }
  }

  return (
    <div>
      <div
        ref={containerRef}
        className="relative h-[620px] w-full overflow-hidden rounded-xl border border-border"
        style={{ background: BOX_BG }}
      >
        <Button
          type="button"
          variant="primary"
          onClick={handleExportPdf}
          disabled={busy}
          className="absolute end-3 top-3 z-10 !px-3 !py-1.5 text-xs shadow-lg"
        >
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
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          {busy ? dict.course.mindMapExporting : dict.course.mindMapDownloadPdf}
        </Button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          edgeTypes={edgeTypes}
          onNodeClick={onNodeClick}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnDrag={false}
          panOnScroll={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#334155" gap={22} />
        </ReactFlow>
      </div>
      <p className="mt-2 text-xs text-muted">{dict.course.mindMapHint}</p>
    </div>
  );
}

export function ModuleMindMap({ data }: { data: MindMapData }) {
  return (
    <ReactFlowProvider>
      <ModuleMindMapInner data={data} />
    </ReactFlowProvider>
  );
}
