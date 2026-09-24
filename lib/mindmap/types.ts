// Stable JSON contract for the interactive mind map. Any future generator
// (hand-built today, an AI endpoint later) only needs to produce data
// shaped like this — <ModuleMindMap> never needs to change to consume it.

export type MindMapNodeKind = "module" | "lesson" | "term";

export type MindMapNode = {
  id: string;
  kind: MindMapNodeKind;
  labelAr: string;
  labelEn: string;
  parentId: string | null;
};

export type MindMapEdge = {
  id: string;
  source: string;
  target: string;
};

export type MindMapData = {
  nodes: MindMapNode[];
  edges: MindMapEdge[];
};
