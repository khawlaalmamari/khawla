"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type ViewerState = "loading" | "ready" | "error";

const WALK_DURATION_MS = 1800;

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * VR-2 — a lightweight, purely-decorative 3D clinical room: procedural
 * primitive geometry only (no GLTF/texture downloads), so there is nothing
 * to lazy-fetch beyond this component's own code (already code-split via
 * next/dynamic ssr:false in virtual-patient-conversation.tsx). The patient
 * avatar is generic (no per-case appearance data) and only ever receives
 * the same visible patient name this page already renders elsewhere — the
 * client never sees hidden case data because of this component at all.
 *
 * This scene is a presentation layer in front of the existing VR-1
 * conversation engine, not a second one: "Start Conversation" below just
 * scrolls to and focuses the existing #patient-question-input rather than
 * holding any message/interview state of its own.
 */
export function ClinicalRoomScene({
  dict,
  patientName,
  settingText,
  skipEntrance,
  onStartConversation,
}: {
  dict: Dictionary;
  patientName: string;
  settingText: string;
  /** True once this attempt already has interview turns beyond the seeded
   * opening line (e.g. the page was reloaded mid-interview) — the patient
   * is already "in the room," so the walk-in plays once per fresh attempt
   * only, not on every reload. */
  skipEntrance: boolean;
  onStartConversation: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<ViewerState>("loading");
  const [arrived, setArrived] = useState(skipEntrance);
  const actionsRef = useRef<{ focusOnPatient: () => void; resetView: () => void } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frameId = 0;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true });
    } catch {
      queueMicrotask(() => setState("error"));
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe7edf3);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);

    const ROOM_VIEW = {
      position: new THREE.Vector3(0.6, 2.1, 4.3),
      target: new THREE.Vector3(-0.6, 1, -0.6),
      minDistance: 2.2,
      maxDistance: 7,
    };
    const FOCUS_VIEW = {
      position: new THREE.Vector3(0.5, 1.5, 0.1),
      target: new THREE.Vector3(-0.55, 1.3, -1.05),
      minDistance: 0.6,
      maxDistance: 3,
    };

    camera.position.copy(ROOM_VIEW.position);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.target.copy(ROOM_VIEW.target);
    controls.minDistance = ROOM_VIEW.minDistance;
    controls.maxDistance = ROOM_VIEW.maxDistance;
    controls.maxPolarAngle = Math.PI * 0.49;
    controls.listenToKeyEvents(container);

    function applyPreset(preset: typeof ROOM_VIEW) {
      camera.position.copy(preset.position);
      controls.target.copy(preset.target);
      controls.minDistance = preset.minDistance;
      controls.maxDistance = preset.maxDistance;
      controls.update();
    }
    applyPreset(ROOM_VIEW);

    actionsRef.current = {
      focusOnPatient: () => applyPreset(FOCUS_VIEW),
      resetView: () => applyPreset(ROOM_VIEW),
    };

    // Lighting — ambient + one "ceiling" point light + a soft directional
    // fill, matching the two/three-light budget the existing 3D Anatomy
    // viewer uses (Step 7: keep it lightweight).
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const ceilingLight = new THREE.PointLight(0xffffff, 1.1, 10);
    ceilingLight.position.set(0, 2.8, 0);
    scene.add(ceilingLight);
    const fill = new THREE.DirectionalLight(0xffffff, 0.4);
    fill.position.set(3, 4, 4);
    scene.add(fill);

    const floorMat = new THREE.MeshStandardMaterial({ color: 0xd7dee6 });
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xf3f6f9, side: THREE.DoubleSide });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0xdfe6ee });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xb9c2cb, metalness: 0.3, roughness: 0.5 });
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x5b7fa6 });
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x2a2f36 });
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x2fae7c,
      emissive: 0x114d34,
      emissiveIntensity: 0.4,
    });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0xc2a46d });

    // Room shell — floor + two walls + ceiling. The third side is
    // deliberately left open as the room's entrance (Step: Door/entrance)
    // rather than modeling a doorway cut into a solid wall, which keeps
    // the geometry trivial (Step 7: avoid unnecessary complexity).
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), floorMat);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(6, 3), wallMat);
    backWall.position.set(0, 1.5, -2.5);
    scene.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(5, 3), wallMat);
    leftWall.position.set(-3, 1.5, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(6, 5), wallMat);
    ceiling.position.set(0, 3, 0);
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    const lightFixture = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 0.05, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.6 }),
    );
    lightFixture.position.set(0, 2.96, 0);
    scene.add(lightFixture);

    // Patient bed
    const bed = new THREE.Group();
    const bedFrame = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.45, 2.0), whiteMat);
    bedFrame.position.y = 0.225;
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.15, 1.9), mattressMat);
    mattress.position.y = 0.52;
    const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.1, 0.3), whiteMat);
    pillow.position.set(0, 0.63, -0.75);
    const headboard = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.7, 0.08), whiteMat);
    headboard.position.set(0, 0.6, -1.0);
    bed.add(bedFrame, mattress, pillow, headboard);
    bed.position.set(-1.3, 0, -1.2);
    scene.add(bed);

    // Chair
    const chair = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.06, 0.42), chairMat);
    seat.position.y = 0.42;
    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.4, 0.06), chairMat);
    chairBack.position.set(0, 0.64, -0.18);
    const chairLegGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.42, 8);
    const chairLegPositions: Array<[number, number, number]> = [
      [-0.17, 0.21, -0.17],
      [0.17, 0.21, -0.17],
      [-0.17, 0.21, 0.17],
      [0.17, 0.21, 0.17],
    ];
    for (const [x, y, z] of chairLegPositions) {
      const leg = new THREE.Mesh(chairLegGeo, metalMat);
      leg.position.set(x, y, z);
      chair.add(leg);
    }
    chair.add(seat, chairBack);
    chair.position.set(0.1, 0, -1.8);
    scene.add(chair);

    // IV stand
    const ivStand = new THREE.Group();
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.5, 8), metalMat);
    pole.position.y = 0.75;
    const ivBase = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 16), metalMat);
    ivBase.position.y = 0.02;
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.012, 8, 16), metalMat);
    hook.position.y = 1.5;
    hook.rotation.x = Math.PI / 2;
    const bag = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.06, 0.14, 4, 8),
      new THREE.MeshStandardMaterial({ color: 0xcfe8f5, transparent: true, opacity: 0.85 }),
    );
    bag.position.y = 1.36;
    ivStand.add(pole, ivBase, hook, bag);
    ivStand.position.set(-1.95, 0, -1.75);
    scene.add(ivStand);

    // Vital-signs monitor
    const monitor = new THREE.Group();
    const monitorBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.04, 16), metalMat);
    const monitorPole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8), metalMat);
    monitorPole.position.y = 0.44;
    const monitorBody = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.26, 0.08), monitorMat);
    monitorBody.position.y = 0.95;
    const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.28, 0.2), screenMat);
    monitorScreen.position.set(0, 0.95, 0.041);
    monitor.add(monitorBase, monitorPole, monitorBody, monitorScreen);
    monitor.position.set(-0.25, 0, -2.05);
    scene.add(monitor);

    // Basic nursing-supply cart
    const cart = new THREE.Group();
    const cartTop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.32), metalMat);
    cartTop.position.y = 0.62;
    const cartLegGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.6, 8);
    const cartLegPositions: Array<[number, number, number]> = [
      [-0.21, 0.3, -0.13],
      [0.21, 0.3, -0.13],
      [-0.21, 0.3, 0.13],
      [0.21, 0.3, 0.13],
    ];
    for (const [x, y, z] of cartLegPositions) {
      const leg = new THREE.Mesh(cartLegGeo, metalMat);
      leg.position.set(x, y, z);
      cart.add(leg);
    }
    const supply1 = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.12, 10), whiteMat);
    supply1.position.set(-0.1, 0.7, 0);
    const supply2 = supply1.clone();
    supply2.position.set(0.08, 0.68, 0.05);
    supply2.scale.set(0.8, 0.8, 0.8);
    cart.add(cartTop, supply1, supply2);
    cart.position.set(-1.7, 0, 0.5);
    scene.add(cart);

    // Door, marking the entrance on the room's open side
    const doorGroup = new THREE.Group();
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.1, 1.0), whiteMat);
    doorFrame.position.set(0, 1.05, 0);
    const doorPanel = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.0, 0.85), doorMat);
    doorPanel.position.set(0, 1.0, -0.4);
    doorPanel.rotation.y = Math.PI * 0.22;
    doorGroup.add(doorFrame, doorPanel);
    doorGroup.position.set(2.85, 0, 1.6);
    doorGroup.rotation.y = -Math.PI / 2;
    scene.add(doorGroup);

    // Patient avatar — generic primitive-geometry figure, carries no
    // per-case or hidden data of any kind, only ever positioned/labeled
    // using the same visible patient name already shown elsewhere on this
    // page.
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xe8b997 });
    const gownMat = new THREE.MeshStandardMaterial({ color: 0x8fb6c9 });
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x3b2a20 });
    const avatar = new THREE.Group();
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 16), skinMat);
    head.position.y = 1.55;
    const hair = new THREE.Mesh(
      new THREE.SphereGeometry(0.115, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55),
      hairMat,
    );
    hair.position.y = 1.58;
    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.45, 8, 16), gownMat);
    torso.position.y = 1.15;
    const legs = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.65, 8, 16), gownMat);
    legs.position.y = 0.5;
    const armL = new THREE.Mesh(new THREE.CapsuleGeometry(0.05, 0.38, 6, 12), skinMat);
    armL.position.set(-0.22, 1.15, 0);
    armL.rotation.z = 0.2;
    const armR = armL.clone();
    armR.position.x = 0.22;
    armR.rotation.z = -0.2;
    avatar.add(head, hair, torso, legs, armL, armR);

    const doorPos = new THREE.Vector3(2.6, 0, 1.3);
    const bedsidePos = new THREE.Vector3(-0.55, 0, -1.1);

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let hasArrived = skipEntrance || !!prefersReducedMotion;
    avatar.position.copy(hasArrived ? bedsidePos : doorPos);
    avatar.lookAt(bedsidePos.x, 0, bedsidePos.z);
    scene.add(avatar);
    if (hasArrived) queueMicrotask(() => setArrived(true));

    const walkStart = performance.now();

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

      if (!hasArrived) {
        const t = Math.min((performance.now() - walkStart) / WALK_DURATION_MS, 1);
        const eased = easeInOutQuad(t);
        avatar.position.lerpVectors(doorPos, bedsidePos, eased);
        avatar.position.y = Math.sin(t * Math.PI * 10) * 0.015;
        const lookTarget = new THREE.Vector3(bedsidePos.x, avatar.position.y, bedsidePos.z);
        if (avatar.position.distanceTo(lookTarget) > 0.01) avatar.lookAt(lookTarget);
        if (t >= 1) {
          hasArrived = true;
          avatar.position.set(bedsidePos.x, 0, bedsidePos.z);
          setArrived(true);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    queueMicrotask(() => setState("ready"));

    // Tapping/clicking the patient also focuses the camera on her, in
    // addition to the explicit "Focus on Patient" button below.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDown: { x: number; y: number } | null = null;

    function onPointerDown(e: PointerEvent) {
      pointerDown = { x: e.clientX, y: e.clientY };
    }
    function onPointerUp(e: PointerEvent) {
      const down = pointerDown;
      pointerDown = null;
      if (!down) return;
      if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 8) return;
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(avatar, true);
      if (hits.length > 0) applyPreset(FOCUS_VIEW);
    }
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);

    return () => {
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
  }, [skipEntrance]);

  const statusText = arrived
    ? dict.clinicalCases.patientReadyTemplate.replace("{name}", patientName)
    : dict.clinicalCases.patientEnteringTemplate.replace("{name}", patientName);

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{dict.clinicalCases.clinicalRoomTitle}</h2>
        <p className="text-xs text-muted">
          {dict.clinicalCases.settingLabel}: {settingText}
        </p>
      </div>

      <div className="relative mt-3 h-[280px] w-full overflow-hidden rounded-xl border border-border bg-surface sm:h-[380px]">
        {state !== "error" && (
          <div
            ref={containerRef}
            tabIndex={0}
            aria-label={dict.clinicalCases.clinicalRoomAriaLabel}
            className="h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        )}

        {state === "error" && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-6 text-center" role="alert">
            <p className="font-semibold">{dict.clinicalCases.clinicalRoomViewerErrorTitle}</p>
            <p className="text-sm text-muted">{dict.clinicalCases.clinicalRoomViewerErrorBody}</p>
          </div>
        )}

        {state === "ready" && (
          <div className="absolute top-2 end-2 flex gap-1.5">
            <button
              type="button"
              onClick={() => actionsRef.current?.focusOnPatient()}
              className="rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {dict.clinicalCases.focusOnPatientButton}
            </button>
            <button
              type="button"
              onClick={() => actionsRef.current?.resetView()}
              className="rounded-full border border-border bg-background/90 px-3 py-1.5 text-xs font-medium shadow-sm hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              {dict.clinicalCases.roomViewButton}
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-sm text-muted" role="status" aria-live="polite">
          {statusText}
        </p>
        <button
          type="button"
          onClick={onStartConversation}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary-900/10 transition-colors hover:bg-primary-700"
        >
          {dict.clinicalCases.startConversationFromRoomButton}
        </button>
      </div>
    </div>
  );
}
