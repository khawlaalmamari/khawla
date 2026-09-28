"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { ANATOMY_MODEL_URL } from "@/lib/anatomy-3d/model-config";
import { ANATOMICAL_STRUCTURES } from "@/lib/anatomy-3d/structures";

type ViewerState = "loading" | "ready" | "placeholder" | "error";

// Derived once from the single source of truth (structures.ts) — never a
// second, hand-maintained copy of the model-to-structure mapping.
const NODE_NAME_TO_STRUCTURE_ID = new Map(
  ANATOMICAL_STRUCTURES.filter((s) => s.modelNodeName).map((s) => [s.modelNodeName as string, s.id]),
);
const STRUCTURE_ID_TO_NODE_NAME = new Map(
  ANATOMICAL_STRUCTURES.filter((s) => s.modelNodeName).map((s) => [s.id, s.modelNodeName as string]),
);

// Subtle emissive tint applied to the selected structure's meshes — no
// glow/bloom/animation, just a modest color shift on the existing material.
const HIGHLIGHT_EMISSIVE = 0x2f6f68;

/**
 * Renders the curated production model (public/models/anatomy/human-body.glb,
 * see lib/anatomy-3d/model-config.ts) via GLTFLoader, with click-to-select
 * and a subtle per-structure highlight wired to structures.ts. If that file
 * is ever missing or fails to load, the loader's own error path renders a
 * clearly-labeled procedural placeholder instead of crashing. A genuine
 * WebGL failure (unsupported browser, context creation error) is a separate
 * "error" state that never crashes the page.
 */
export function AnatomyViewer({
  dict,
  selectedStructureId,
  onSelectStructure,
}: {
  dict: Dictionary;
  selectedStructureId?: string | null;
  onSelectStructure?: (structureId: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ViewerState>("loading");
  const actionsRef = useRef<{
    reset: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    highlightStructure: (structureId: string | null | undefined) => void;
  } | null>(null);
  const onSelectStructureRef = useRef(onSelectStructure);
  const selectedStructureIdRef = useRef(selectedStructureId);
  useEffect(() => {
    onSelectStructureRef.current = onSelectStructure;
    selectedStructureIdRef.current = selectedStructureId;
  }, [onSelectStructure, selectedStructureId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer: THREE.WebGLRenderer;
    let modelRoot: THREE.Object3D | null = null;
    let highlightedMeshes: THREE.Mesh[] = [];

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      // Deferred so this doesn't call setState synchronously inside the
      // effect body itself (WebGL context creation genuinely failing —
      // e.g. an unsupported browser — is rare, but must still not crash
      // the page; see Step 3).
      queueMicrotask(() => setState("error"));
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeef2f7);

    // Two framings: the curated model is a torso-height organ cluster
    // (~0.9m tall, centered around y≈1.29 — measured directly from
    // human-body.glb, not guessed), quite different in scale from the
    // older full-body (~2m) procedural placeholder used as a fallback.
    const MODEL_CAMERA = {
      position: new THREE.Vector3(0, 1.55, 1.15),
      target: new THREE.Vector3(0, 1.29, 0),
      minDistance: 0.3,
      maxDistance: 6,
    };
    const PLACEHOLDER_CAMERA = {
      position: new THREE.Vector3(0, 1.3, 4),
      target: new THREE.Vector3(0, 1, 0),
      minDistance: 1.5,
      maxDistance: 9,
    };

    let initialPosition = MODEL_CAMERA.position.clone();
    let initialTarget = MODEL_CAMERA.target.clone();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.copy(initialPosition);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.copy(MODEL_CAMERA.target);
    controls.minDistance = MODEL_CAMERA.minDistance;
    controls.maxDistance = MODEL_CAMERA.maxDistance;
    // Basic keyboard accessibility (Step 11): arrow keys pan once the
    // viewer has focus, built into OrbitControls itself.
    controls.listenToKeyEvents(container);

    function applyCameraPreset(preset: typeof MODEL_CAMERA) {
      initialPosition = preset.position.clone();
      initialTarget = preset.target.clone();
      camera.position.copy(initialPosition);
      controls.target.copy(initialTarget);
      controls.minDistance = preset.minDistance;
      controls.maxDistance = preset.maxDistance;
      controls.update();
    }

    function zoomBy(factor: number) {
      const offset = camera.position.clone().sub(controls.target);
      const length = THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance);
      offset.setLength(length);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }

    function clearHighlight() {
      for (const mesh of highlightedMeshes) {
        if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.emissive.setHex(0x000000);
        }
      }
      highlightedMeshes = [];
    }

    function highlightStructure(structureId: string | null | undefined) {
      clearHighlight();
      if (!structureId || !modelRoot) return;
      const nodeName = STRUCTURE_ID_TO_NODE_NAME.get(structureId);
      if (!nodeName) return;
      const target = modelRoot.getObjectByName(nodeName);
      if (!target) return;
      target.traverse((obj) => {
        if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
          obj.material.emissive.setHex(HIGHLIGHT_EMISSIVE);
          highlightedMeshes.push(obj);
        }
      });
    }

    actionsRef.current = {
      reset: () => {
        camera.position.copy(initialPosition);
        controls.target.copy(initialTarget);
        controls.update();
      },
      zoomIn: () => zoomBy(0.8),
      zoomOut: () => zoomBy(1.25),
      highlightStructure,
    };

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 5, 3);
    scene.add(dirLight);

    // A deliberately simple, clearly-not-medical placeholder body made
    // of primitive shapes — never presented as a real anatomical model.
    function addPlaceholderBody() {
      const material = new THREE.MeshStandardMaterial({ color: 0x7fa8c9 });
      const group = new THREE.Group();
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 24, 24), material);
      head.position.set(0, 2.05, 0);
      const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.9, 8, 16), material);
      torso.position.set(0, 1.3, 0);
      const legL = new THREE.Mesh(new THREE.CapsuleGeometry(0.15, 1.1, 6, 12), material);
      legL.position.set(-0.2, 0.4, 0);
      const legR = legL.clone();
      legR.position.x = 0.2;
      const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.8, 6, 12), material);
      armL.position.set(-0.56, 1.35, 0);
      const armR = armL.clone();
      armR.position.x = 0.56;
      group.add(head, torso, legL, legR, armL, armR);
      group.position.y = -1;
      scene.add(group);
    }

    function resize() {
      if (!container) return;
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    }
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    function animate() {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    const loader = new GLTFLoader();
    loader.load(
      ANATOMY_MODEL_URL,
      (gltf) => {
        if (disposed) return;
        // Every curated mesh shares one exported material instance; give
        // each its own clone so one structure can be highlighted without
        // tinting the whole model.
        gltf.scene.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
            obj.material = obj.material.clone();
          }
        });
        scene.add(gltf.scene);
        modelRoot = gltf.scene;
        highlightStructure(selectedStructureIdRef.current);
        setState("ready");
      },
      undefined,
      () => {
        if (disposed) return;
        applyCameraPreset(PLACEHOLDER_CAMERA);
        addPlaceholderBody();
        setState("placeholder");
      },
    );

    // Click/tap-to-select (Step: structure selection + highlight). A small
    // movement threshold tells a tap apart from an OrbitControls drag;
    // OrbitControls' own listeners on the same element are unaffected.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDown: { x: number; y: number; type: string } | null = null;

    function onPointerDown(e: PointerEvent) {
      pointerDown = { x: e.clientX, y: e.clientY, type: e.pointerType };
    }

    function onPointerUp(e: PointerEvent) {
      const down = pointerDown;
      pointerDown = null;
      if (!down || !modelRoot) return;
      const threshold = down.type === "touch" ? 12 : 6;
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > threshold) return;

      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(modelRoot, true);
      if (hits.length === 0) return;

      let node: THREE.Object3D | null = hits[0].object;
      while (node && node !== modelRoot) {
        const structureId = NODE_NAME_TO_STRUCTURE_ID.get(node.name);
        if (structureId) {
          onSelectStructureRef.current?.(structureId);
          return;
        }
        node = node.parent;
      }
    }

    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      controls.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const material = obj.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Keeps the 3D highlight in sync when a structure is selected from
  // outside the viewer (e.g. the existing body-system structure list),
  // not just from a click on the model itself.
  useEffect(() => {
    actionsRef.current?.highlightStructure(selectedStructureId);
  }, [selectedStructureId]);

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-border bg-surface sm:h-[520px]">
      {state !== "error" && (
        <div
          ref={containerRef}
          tabIndex={0}
          aria-label={dict.anatomy3D.viewerAriaLabel}
          className="h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      )}

      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface/90">
          <div className="flex items-center gap-2 text-sm text-muted" role="status" aria-live="polite">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
            {dict.anatomy3D.viewerLoading}
          </div>
        </div>
      )}

      {state === "error" && (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-1 p-6 text-center"
          role="alert"
        >
          <p className="font-semibold">{dict.anatomy3D.viewerErrorTitle}</p>
          <p className="text-sm text-muted">{dict.anatomy3D.viewerErrorBody}</p>
        </div>
      )}

      {state === "placeholder" && (
        <p
          className="absolute bottom-2 start-2 end-2 rounded-lg bg-accent-100 px-3 py-2 text-xs text-accent-800"
          role="status"
        >
          {dict.anatomy3D.placeholderNotice}
        </p>
      )}

      {state !== "error" && (
        <div className="absolute top-2 end-2 flex gap-1.5">
          <button
            type="button"
            onClick={() => actionsRef.current?.zoomOut()}
            aria-label={dict.anatomy3D.zoomOutButton}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-sm font-medium shadow-sm hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => actionsRef.current?.zoomIn()}
            aria-label={dict.anatomy3D.zoomInButton}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 text-sm font-medium shadow-sm hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => actionsRef.current?.reset()}
            className="rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {dict.anatomy3D.resetViewButton}
          </button>
        </div>
      )}
    </div>
  );
}
