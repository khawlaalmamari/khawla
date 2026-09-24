import type { MindMapData, MindMapNode } from "./types";

// One distinct color per top-level branch coming out of the central hub.
// Every descendant of a branch inherits its color, so the whole limb
// (however deep a future AI-generated map makes it) reads as one unit.
export const BRANCH_COLORS = [
  "#3b82f6", // blue
  "#f97316", // orange
  "#a855f7", // purple
  "#eab308", // yellow
  "#ec4899", // pink
  "#14b8a6", // teal
];

export function assignBranchColors(data: MindMapData): Map<string, string> {
  const childrenOf = new Map<string, MindMapNode[]>();
  for (const node of data.nodes) {
    if (node.parentId) {
      const siblings = childrenOf.get(node.parentId) ?? [];
      siblings.push(node);
      childrenOf.set(node.parentId, siblings);
    }
  }

  const colors = new Map<string, string>();
  const root = data.nodes.find((n) => n.parentId === null);
  if (!root) return colors;

  function paint(node: MindMapNode, color: string): void {
    colors.set(node.id, color);
    for (const child of childrenOf.get(node.id) ?? []) paint(child, color);
  }

  const branches = childrenOf.get(root.id) ?? [];
  branches.forEach((branch, i) => paint(branch, BRANCH_COLORS[i % BRANCH_COLORS.length]));

  return colors;
}
