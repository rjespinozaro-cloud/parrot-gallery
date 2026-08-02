"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useDna } from "@/components/dna-provider";
import { useMotionValueEvent } from "framer-motion";

function Helix({ progress }: { progressRef: { current: number } | null; progress?: number }) {
  const groupRef = useRef<THREE.Group | null>(null);
  const local = useRef({ p: 0 });

  useFrame(() => {
    const p = typeof progress === "number" ? progress : local.current.p;
    if (groupRef.current) {
      // rotate the whole helix based on progress
      groupRef.current.rotation.y = p * Math.PI * 2 * 0.6;
      groupRef.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.05;
    }
  });

  const nodes = 18;
  const radius = 1.6;
  const height = 6;

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {Array.from({ length: nodes }).map((_, i) => {
        const t = i / nodes;
        const angle = t * Math.PI * 2 * 3; // turns
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (t - 0.5) * height;
        const color = i % 2 === 0 ? "#3b6fd4" : "#0ea5e9";

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[0.2, 16, 12]} />
            <meshStandardMaterial emissive={color} color={color} metalness={0.2} roughness={0.3} />
          </mesh>
        );
      })}

      {/* connecting tubes (simple latched lines) */}
      {Array.from({ length: nodes - 1 }).map((_, i) => {
        const t = i / nodes;
        const angle = t * Math.PI * 2 * 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = (t - 0.5) * height;

        const t2 = (i + 1) / nodes;
        const angle2 = t2 * Math.PI * 2 * 3;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;
        const y2 = (t2 - 0.5) * height;

        return (
          <line key={`l-${i}`}>
            <bufferGeometry attach="geometry">
              <bufferAttribute
                attachObject={['attributes', 'position']}
                count={2}
                array={new Float32Array([x, y, z, x2, y2, z2])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={i % 2 === 0 ? "#2b5fd0" : "#08b7ef"} linewidth={2} />
          </line>
        );
      })}
    </group>
  );
}

export default function Dna3DScene() {
  const { progress } = useDna();
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    try {
      mq.addEventListener('change', handler);
    } catch {
      mq.addListener(handler);
    }
    return () => {
      try {
        mq.removeEventListener('change', handler);
      } catch {
        mq.removeListener(handler);
      }
    };
  }, []);

  useMotionValueEvent(progress as any, "change", (v: number) => {
    setP(v);
  });

  // if user prefers reduced motion, show static preview
  const enable3D = !reduced;

  return (
    <div className="w-[320px] h-[640px]">
      {enable3D ? (
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Helix progress={p} progressRef={null} />
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm text-slate-400">
          Animación reducida (prefers-reduced-motion)
        </div>
      )}
    </div>
  );
}
