'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import {
  createAgentCharacter,
  updateSuitColor,
  setWireframeMode,
  CharacterMeshBuild,
} from '@/lib/3d/characterModel';

export interface CharacterExporters {
  exportObj: () => void;
  exportGltf: () => void;
  resetCamera: () => void;
}

export interface CharacterCanvasProps {
  suitColor: number;
  explosionProgress: number; // 0.0 (assembled) to 1.0 (modular kit)
  wireframe: boolean;
  showSunglasses: boolean;
  autoRotate: boolean;
  selectedPart: string | null;
  onSelectPart: (partId: string | null) => void;
  onExportersReady?: (exporters: CharacterExporters) => void;
}

export function CharacterCanvas({
  suitColor,
  explosionProgress,
  wireframe,
  showSunglasses,
  autoRotate,
  selectedPart,
  onSelectPart,
  onExportersReady,
}: CharacterCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const characterRef = useRef<CharacterMeshBuild | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const hoveredPartRef = useRef<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const explosionRef = useRef(explosionProgress);
  explosionRef.current = explosionProgress;

  const autoRotateRef = useRef(autoRotate);
  autoRotateRef.current = autoRotate;

  const selectedPartRef = useRef(selectedPart);
  selectedPartRef.current = selectedPart;

  useEffect(() => {
    const mount = mountRef.current;
    const canvas = canvasRef.current;
    if (!mount || !canvas) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(
      36,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.1, 3.6);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.target.set(0, 1.0, 0);
    controls.minDistance = 1.4;
    controls.maxDistance = 6.0;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controlsRef.current = controls;

    // 5. Studio Lighting
    const ambientLight = new THREE.HemisphereLight(0xffffff, 0x141824, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5eb, 2.4);
    keyLight.position.set(2.5, 3.5, 3.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x60a5fa, 1.2);
    fillLight.position.set(-2.5, 2.0, 1.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc7d2fe, 3.2);
    rimLight.position.set(0, 2.8, -2.5);
    scene.add(rimLight);

    // 6. Luxury Circular Studio Pedestal
    const pedestalGroup = new THREE.Group();
    const pedestalGeo = new THREE.CylinderGeometry(0.78, 0.84, 0.04, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x0c0f18,
      roughness: 0.35,
      metalness: 0.7,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.02;
    pedestal.receiveShadow = true;
    pedestalGroup.add(pedestal);

    const ringGeo = new THREE.TorusGeometry(0.81, 0.008, 16, 64);
    ringGeo.rotateX(Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.y = -0.002;
    pedestalGroup.add(ring);

    const shadowGeo = new THREE.PlaneGeometry(2.0, 2.0);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.position.y = 0.002;
    shadowPlane.receiveShadow = true;
    pedestalGroup.add(shadowPlane);

    scene.add(pedestalGroup);

    // 7. Build Character Model
    const character = createAgentCharacter({ suitColor });
    characterRef.current = character;
    scene.add(character.root);
    setIsLoaded(true);

    // 8. Raycaster for Hover & Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(character.root.children, true);

      let foundPartId: string | null = null;
      if (intersects.length > 0) {
        let curr: THREE.Object3D | null = intersects[0].object;
        while (curr && curr !== character.root) {
          if (curr.userData && curr.userData.partId) {
            foundPartId = curr.userData.partId;
            break;
          }
          curr = curr.parent;
        }
      }

      hoveredPartRef.current = foundPartId;
      canvas.style.cursor = foundPartId ? 'pointer' : 'grab';
    };

    const handleClick = () => {
      if (hoveredPartRef.current) {
        onSelectPart(hoveredPartRef.current);
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mount);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let currentExplosion = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      const targetExplosion = explosionRef.current;
      currentExplosion += (targetExplosion - currentExplosion) * Math.min(delta * 6.5, 1);

      Object.entries(character.parts).forEach(([partKey, partGroup]) => {
        const assembled = character.assembledPositions[partKey];
        const exploded = character.explodedPositions[partKey];

        if (assembled && exploded) {
          partGroup.position.lerpVectors(assembled, exploded, currentExplosion);

          if (currentExplosion > 0.05) {
            const floatOffset = Math.sin(elapsedTime * 2.2 + partGroup.id) * 0.012 * currentExplosion;
            partGroup.position.y += floatOffset;
          }
        }
      });

      if (currentExplosion < 0.1) {
        const breath = Math.sin(elapsedTime * 1.8) * 0.003;
        character.parts.jacketTorso.scale.set(1 + breath, 1 + breath * 0.5, 1 + breath);
      } else {
        character.parts.jacketTorso.scale.set(1, 1, 1);
      }

      if (autoRotateRef.current) {
        character.root.rotation.y += delta * 0.45;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    if (onExportersReady) {
      onExportersReady({
        exportObj: () => {
          const exporter = new OBJExporter();
          let result = exporter.parse(character.root);
          result = '# Bespoke Tailored Suit Character 3D Model\n# Exported from Ayush Portfolio 3D Studio\n\n' + result;
          const blob = new Blob([result], { type: 'text/plain' });
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'bespoke-suit-character.obj';
          link.click();
          URL.revokeObjectURL(link.href);
        },
        exportGltf: () => {
          const exporter = new GLTFExporter();
          exporter.parse(
            character.root,
            (gltf) => {
              const output = JSON.stringify(gltf, null, 2);
              const blob = new Blob([output], { type: 'application/json' });
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'bespoke-suit-character.gltf';
              link.click();
              URL.revokeObjectURL(link.href);
            },
            (err) => console.error('Export GLTF error:', err),
            { binary: false }
          );
        },
        resetCamera: () => {
          controls.reset();
          camera.position.set(0, 1.1, 3.6);
          controls.target.set(0, 1.0, 0);
          character.root.rotation.set(0, 0, 0);
        },
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('click', handleClick);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  useEffect(() => {
    if (characterRef.current) {
      updateSuitColor(characterRef.current.materials, suitColor);
    }
  }, [suitColor]);

  useEffect(() => {
    if (characterRef.current) {
      setWireframeMode(characterRef.current.materials, wireframe);
    }
  }, [wireframe]);

  useEffect(() => {
    if (characterRef.current) {
      characterRef.current.parts.sunglasses.visible = showSunglasses;
    }
  }, [showSunglasses]);

  return (
    <div ref={mountRef} className="relative w-full h-full min-h-[480px] lg:min-h-[580px] overflow-hidden select-none">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#090b12]/80 backdrop-blur-md z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-cyan-300 font-semibold tracking-wider">
              INITIALIZING 3D ENGINE...
            </span>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="w-full h-full block focus:outline-none" />

      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md pointer-events-none">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[11px] font-mono text-slate-300">
          Left Drag: Rotate 360° • Scroll: Zoom • Click Parts to Inspect
        </span>
      </div>
    </div>
  );
}
