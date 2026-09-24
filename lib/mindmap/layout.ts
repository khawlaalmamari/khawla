import type { MindMapData, MindMapNode } from "./types";

const RADIUS_STEP = 220;

/**
 * A radial "sunburst" tree layout: the root sits at the center, and every
 * other node is placed at `depth * RADIUS_STEP` from center, within an
 * angular slice inherited from its parent and split among siblings in
 * proportion to how many leaves each of their subtrees has. This is fully
 * generic over tree shape/depth, so it keeps working unchanged if a future
 * AI-generated map has more (or fewer) levels than today's module → lesson
 * → term data.
 */
export function computeMindMapLayout(data: MindMapData): Map<string, { x: number; y: number }> {
  const childrenOf = new Map<string, MindMapNode[]>();
  for (const node of data.nodes) {
    if (node.parentId) {
      const siblings = childrenOf.get(node.parentId) ?? [];
      siblings.push(node);
      childrenOf.set(node.parentId, siblings);
    }
  }

  const root = data.nodes.find((n) => n.parentId === null);
  const positions = new Map<string, { x: number; y: number }>();
  if (!root) return positions;

  function leafCount(node: MindMapNode): number {
    const children = childrenOf.get(node.id) ?? [];
    if (children.length === 0) return 1;
    return children.reduce((sum, child) => sum + leafCount(child), 0);
  }

  function place(node: MindMapNode, depth: number, angleStart: number, angleEnd: number): void {
    const angle = (angleStart + angleEnd) / 2;
    const radius = depth * RADIUS_STEP;
    positions.set(node.id, { x: radius * Math.cos(angle), y: radius * Math.sin(angle) });

    const children = childrenOf.get(node.id) ?? [];
    if (children.length === 0) return;

    const totalLeaves = children.reduce((sum, child) => sum + leafCount(child), 0);
    let cursor = angleStart;
    const span = angleEnd - angleStart;
    for (const child of children) {
      const share = (leafCount(child) / totalLeaves) * span;
      place(child, depth + 1, cursor, cursor + share);
      cursor += share;
    }
  }

  // Start the first branch at the top (-90deg) and sweep a full circle.
  place(root, 0, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI);
  return positions;
}
