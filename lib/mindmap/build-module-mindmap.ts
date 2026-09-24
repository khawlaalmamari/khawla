import type { MindMapData } from "./types";

type LessonInput = {
  id: string;
  titleAr: string;
  titleEn: string;
  termsJson: string; // JSON-encoded {en, ar}[]
};

type ModuleInput = {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: LessonInput[];
};

/**
 * Builds the mind map's node/edge JSON straight from the module's own
 * lesson titles and medical-term glossary — today's data source. A future
 * AI endpoint can replace this function entirely as long as it returns the
 * same MindMapData shape; <ModuleMindMap> doesn't change either way.
 */
export function buildModuleMindMap(mod: ModuleInput): MindMapData {
  const nodes: MindMapData["nodes"] = [
    { id: mod.id, kind: "module", labelAr: mod.titleAr, labelEn: mod.titleEn, parentId: null },
  ];
  const edges: MindMapData["edges"] = [];

  for (const lesson of mod.lessons) {
    nodes.push({
      id: lesson.id,
      kind: "lesson",
      labelAr: lesson.titleAr,
      labelEn: lesson.titleEn,
      parentId: mod.id,
    });
    edges.push({ id: `e-${mod.id}-${lesson.id}`, source: mod.id, target: lesson.id });

    let terms: { en: string; ar: string }[] = [];
    try {
      const parsed = JSON.parse(lesson.termsJson);
      if (Array.isArray(parsed)) terms = parsed;
    } catch {
      terms = [];
    }

    terms.forEach((term, i) => {
      const termId = `${lesson.id}-term-${i}`;
      nodes.push({
        id: termId,
        kind: "term",
        labelAr: term.ar,
        labelEn: term.en,
        parentId: lesson.id,
      });
      edges.push({ id: `e-${lesson.id}-${termId}`, source: lesson.id, target: termId });
    });
  }

  return { nodes, edges };
}
