import type { MindMapData, MindMapNode } from "./types";

const NODE_SLOT_WIDTH = 200;
const LEVEL_HEIGHT = 130;

/**
 * A simple tiered-tree layout (module → lessons → terms), computed purely
 * from parent/child relationships — no external layout library needed for
 * a tree this shallow.
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

  function subtreeWidth(node: MindMapNode): number {
    const children = childrenOf.get(node.id) ?? [];
    if (children.length === 0) return 1;
    return children.reduce((sum, child) => sum + subtreeWidth(child), 0);
  }

  function place(node: MindMapNode, depth: number, leftEdge: number): void {
    const children = childrenOf.get(node.id) ?? [];
    const width = subtreeWidth(node);
    positions.set(node.id, {
      x: leftEdge + (width * NODE_SLOT_WIDTH) / 2,
      y: depth * LEVEL_HEIGHT,
    });

    let cursor = leftEdge;
    for (const child of children) {
      place(child, depth + 1, cursor);
      cursor += subtreeWidth(child) * NODE_SLOT_WIDTH;
    }
  }

  place(root, 0, 0);
  return positions;
}
