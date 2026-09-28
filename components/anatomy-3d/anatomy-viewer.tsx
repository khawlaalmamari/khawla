"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { ANATOMY_MODEL_URL } from "@/lib/anatomy-3d/model-config";

type ViewerState = "loading" | "ready" | "placeholder" | "error";

/**
 * Phase 3A foundation viewer. Renders the real production model
 * (public/models/anatomy/human-body.glb, see lib/anatomy-3d/model-config.ts)
 * when present; today that file doesn't exist, so the loader's own error
 * path renders a clearly-labeled procedural placeholder instead — this is
 * the actual fallback behavior Step 3/4 asks for, not a simulated one.
 * A genuine WebGL failure (unsupported browser, context creation error)
 * is a separate "error" state that never crashes the page.
 */
export function AnatomyViewer({ dict }: { dict: Dictionary }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ViewerState>("loading");
  const actionsRef = useRef<{ reset: () => void; zoomIn: () => void; zoomOut: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frameId = 0;
    let renderer: THREE.WebGLRenderer;

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

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const initialPosition = new THREE.Vector3(0, 1.3, 4);
    camera.position.copy(initialPosition);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(0, 1, 0);
    controls.minDistance = 1.5;
    controls.maxDistance = 9;
    // Basic keyboard accessibility (Step 11): arrow keys pan once the
    // viewer has focus, built into OrbitControls itself.
    controls.listenToKeyEvents(container);

    function zoomBy(factor: number) {
      const offset = camera.position.clone().sub(controls.target);
      const length = THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance);
      offset.setLength(length);
      camera.position.copy(controls.target).add(offset);
      controls.update();
    }

    actionsRef.current = {
      reset: () => {
        camera.position.copy(initialPosition);
        controls.target.set(0, 1, 0);
        controls.update();
      },
      zoomIn: () => zoomBy(0.8),
      zoomOut: () => zoomBy(1.25),
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
        scene.add(gltf.scene);
        setState("ready");
      },
      undefined,
      () => {
        if (disposed) return;
        addPlaceholderBody();
        setState("placeholder");
      },
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
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
