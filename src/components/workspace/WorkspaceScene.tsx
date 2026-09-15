"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import styles from "./WorkspaceScene.module.css";
import type { PanelId } from "@/lib/workspace/scene";
import type { WorkspaceState } from "@/lib/workspace/types";

type WorkspaceSceneProps = {
  state?: WorkspaceState;
  onOpen?: (panel: PanelId) => void;
  interactive?: boolean;
  locked?: boolean;
  paused?: boolean;
  preview?: boolean;
};

type RewardType =
  | "book"
  | "folder"
  | "badge"
  | "trophy"
  | "certificate"
  | "article"
  | "plant1"
  | "plant2"
  | "plant3"
  | "activity"
  | "furniture";

const REWARD_NAMES: Record<RewardType, string> = {
  book: "case_study_book",
  folder: "project_folder",
  badge: "achievement_badge",
  trophy: "achievement_trophy",
  certificate: "achievement_certificate",
  article: "corkboard_article",
  plant1: "streak_plant_stage_01",
  plant2: "streak_plant_stage_02",
  plant3: "streak_plant_stage_03",
  activity: "calendar_activity_marker",
  furniture: "unlock_side_table",
};

const NAVIGATION: { panel: PanelId; label: string }[] = [
  { panel: "mentor", label: "Laptop and next lesson" },
  { panel: "calendar", label: "Learning calendar" },
  { panel: "cases", label: "Case study shelf" },
  { panel: "projects", label: "Project folders" },
  { panel: "published", label: "Published work" },
  { panel: "badges", label: "Achievements" },
  { panel: "streak", label: "Streak plant" },
  { panel: "explore", label: "Explore the curriculum" },
];

const NOOP = () => undefined;

function panelForObject(name: string, privateRoom: boolean): PanelId | undefined {
  if (name === "desk_laptop" || name.startsWith("laptop_")) return privateRoom ? "mentor" : "calendar";
  if (name.startsWith("calendar_")) return "calendar";
  if (name.startsWith("corkboard_")) return "published";
  if (name.startsWith("shelf_")) return "cases";
  if (name.startsWith("door_")) return privateRoom ? "explore" : undefined;
  return undefined;
}

function disposeGraph(root: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  root.traverse((object) => {
    const mesh = object as THREE.Mesh;
    if (mesh.geometry) geometries.add(mesh.geometry);
    const list = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
    for (const material of list) {
      materials.add(material);
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) textures.add(value);
      }
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) texture.dispose();
}

export default function WorkspaceScene({
  state,
  onOpen = NOOP,
  interactive = true,
  locked = false,
  paused = false,
  preview = false,
}: WorkspaceSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState("");

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  const setup = useMemo(() => {
    const full = preview || !state;
    const activeDays = state?.streak.days.filter((day) => day.count > 0).slice(-35).length ?? 0;
    return {
      mode: state?.environment.timeOfDay === "night" || state?.environment.timeOfDay === "evening" ? "night" : "day",
      books: full ? 10 : Math.min(10, state.caseStudies.length),
      folders: full ? 4 : Math.min(4, state.projects.length),
      trophies: full ? 3 : Math.min(3, state.badges.length),
      articles: full ? 6 : Math.min(6, state.published.length),
      activity: full ? 26 : Math.min(35, activeDays),
      certificate: full || (state?.progress.levelsCompleted ?? 0) > 0,
      badge: full || (state?.badges.length ?? 0) > 0,
      plant: full ? "plant3" : state && state.streak.longest >= 30 ? "plant3" : state && state.streak.longest >= 14 ? "plant2" : state && state.streak.longest >= 7 ? "plant1" : null,
      furniture: full || (state?.environment.stage ?? 0) >= 4,
    } as const;
  }, [preview, state]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    setLoading(true);
    setError("");

    let disposed = false;
    let animationFrame = 0;
    let pointerStart = { x: 0, y: 0 };
    const animated: THREE.Object3D[] = [];
    const clickable: THREE.Object3D[] = [];
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(setup.mode === "night" ? 0x111a1e : 0xe9e5d9);
    const camera = new THREE.PerspectiveCamera(44, 1, 0.05, 40);
    camera.position.set(3.6, 2.9, 6.7);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    } catch {
      setLoading(false);
      setError("This browser could not open the 3D room.");
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = setup.mode === "night" ? 1.1 : 1.02;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.domElement.className = styles.canvas;
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute("aria-label", locked ? "A 3D preview of a fully furnished learner workspace" : "Your interactive 3D learner workspace");
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 1.2, 0.55);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.minDistance = 4.5;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.55;
    controls.minAzimuthAngle = -0.62;
    controls.maxAzimuthAngle = 0.62;
    controls.autoRotate = preview && !pausedRef.current;
    controls.autoRotateSpeed = 0.22;
    controls.update();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const loader = new GLTFLoader();
    const hemisphere = new THREE.HemisphereLight(
      setup.mode === "night" ? 0x9ab7df : 0xd6e4ea,
      0x3a2c1f,
      setup.mode === "night" ? 0.32 : 0.95,
    );
    scene.add(hemisphere);

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const markPanel = (object: THREE.Object3D, panel: PanelId, label: string) => {
      object.traverse((child) => {
        child.userData.workspacePanel = panel;
        child.userData.workspaceLabel = label;
        if ((child as THREE.Mesh).isMesh) clickable.push(child);
      });
    };

    const addReward = (
      room: THREE.Object3D,
      kit: THREE.Object3D,
      slotName: string,
      type: RewardType,
      panel: PanelId,
      label: string,
      animate = false,
    ) => {
      const slot = room.getObjectByName(slotName);
      const source = kit.getObjectByName(REWARD_NAMES[type]);
      if (!slot || !source) return;
      const reward = source.clone(true);
      reward.name = `${slotName}_reward`;
      if (type === "badge") reward.rotation.x = Math.PI / 2;
      slot.add(reward);
      markPanel(reward, panel, label);
      if (animate) {
        reward.userData.restY = reward.position.y;
        animated.push(reward);
      }
    };

    Promise.all([
      loader.loadAsync(`/models/workspace/workspace-${setup.mode}.glb`),
      loader.loadAsync("/models/workspace/reward-kit.glb"),
    ])
      .then(([roomFile, kitFile]) => {
        if (disposed) {
          disposeGraph(roomFile.scene);
          disposeGraph(kitFile.scene);
          return;
        }
        const room = roomFile.scene;
        scene.add(room);
        room.traverse((object) => {
          const panel = panelForObject(object.name, interactive);
          if (!panel || locked) return;
          object.userData.workspacePanel = panel;
          object.userData.workspaceLabel = NAVIGATION.find((item) => item.panel === panel)?.label ?? panel;
          if ((object as THREE.Mesh).isMesh) clickable.push(object);
        });
        for (let index = 1; index <= setup.books; index += 1) {
          addReward(room, kitFile.scene, `shelf_book_slot_${String(index).padStart(2, "0")}`, "book", "cases", "Case study book");
        }
        for (let index = 1; index <= setup.folders; index += 1) {
          addReward(room, kitFile.scene, `project_folder_slot_${String(index).padStart(2, "0")}`, "folder", "projects", "Project folder");
        }
        for (let index = 1; index <= setup.trophies; index += 1) {
          addReward(room, kitFile.scene, `trophy_slot_${String(index).padStart(2, "0")}`, "trophy", "badges", "Achievement trophy", true);
        }
        for (let index = 1; index <= setup.articles; index += 1) {
          addReward(room, kitFile.scene, `corkboard_article_slot_${String(index).padStart(2, "0")}`, "article", "published", "Published article");
        }
        for (let index = 1; index <= setup.activity; index += 1) {
          addReward(room, kitFile.scene, `calendar_day_${String(index).padStart(2, "0")}`, "activity", "calendar", "Learning activity");
        }
        if (setup.certificate) addReward(room, kitFile.scene, "certificate_slot_01", "certificate", "badges", "Level certificate");
        if (setup.badge) addReward(room, kitFile.scene, "badge_slot_01", "badge", "badges", "Earned badge", true);
        if (setup.plant) addReward(room, kitFile.scene, "streak_plant_slot_01", setup.plant, "streak", "Streak plant", true);
        if (setup.furniture) addReward(room, kitFile.scene, "furniture_unlock_slot_01", "furniture", "badges", "Unlocked furniture");
        setLoading(false);
      })
      .catch(() => {
        if (!disposed) {
          setLoading(false);
          setError("The 3D room could not be loaded. Check that the model files were copied into public/models/workspace.");
        }
      });

    const resolveHit = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(clickable, false)[0]?.object;
      let current: THREE.Object3D | null = hit ?? null;
      while (current && !current.userData.workspacePanel) current = current.parent;
      return current;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (locked) return;
      const hit = resolveHit(event);
      renderer.domElement.style.cursor = hit ? "pointer" : "grab";
      setHovered(hit?.userData.workspaceLabel ?? "");
    };
    const onPointerDown = (event: PointerEvent) => {
      pointerStart = { x: event.clientX, y: event.clientY };
    };
    const onPointerUp = (event: PointerEvent) => {
      if (locked || Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) return;
      const panel = resolveHit(event)?.userData.workspacePanel as PanelId | undefined;
      if (panel) onOpen(panel);
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      setError("The 3D room paused because the browser graphics context was lost. Reload this page to reopen it.");
    };
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    const clock = new THREE.Clock();
    const render = () => {
      animationFrame = requestAnimationFrame(render);
      const elapsed = clock.getElapsedTime();
      controls.autoRotate = preview && !pausedRef.current;
      if (!pausedRef.current) {
        animated.forEach((object, index) => {
          object.position.y = object.userData.restY + Math.sin(elapsed * 1.15 + index) * 0.006;
          object.rotation.y = Math.sin(elapsed * 0.45 + index) * 0.025;
        });
      }
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      controls.dispose();
      disposeGraph(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [interactive, locked, onOpen, preview, setup]);

  const availableNavigation = NAVIGATION.filter(({ panel }) => {
    if (locked) return false;
    if (!interactive && (panel === "mentor" || panel === "explore")) return false;
    return true;
  });

  return (
    <div className={styles.shell} data-mode={setup.mode} data-locked={locked}>
      <div ref={mountRef} className={styles.viewport}>
        {loading && <div className={styles.loading} role="status"><span />Preparing the room…</div>}
        {error && (
          <div className={styles.fallback} role="alert">
            <Image src="/workspace/study-interior.webp" alt="Illustrated learner workspace" fill sizes="100vw" />
            <p>{error}</p>
          </div>
        )}
        <div className={styles.legend} aria-hidden="true">
          <span>{preview ? "Complete workspace preview" : "Your 3D study"}</span>
          <small>{locked ? "Drag to look around" : "Drag to explore · Scroll to zoom · Select an object"}</small>
        </div>
        {hovered && !locked && <div className={styles.tooltip}>{hovered}</div>}
      </div>
      {!locked && (
        <nav className={styles.objectNav} aria-label="Workspace objects">
          {availableNavigation.map(({ panel, label }) => <button key={panel} type="button" onClick={() => onOpen(panel)}>{label}</button>)}
        </nav>
      )}
    </div>
  );
}
