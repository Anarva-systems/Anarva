"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const ROWS = 60;
const COLS = 60;
const COUNT = ROWS * COLS;
const SPACING = 0.25;

const DigitalVeil = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Initial Grid Layout
    const { positions, baseColors } = useMemo(() => {
        const pos = new Float32Array(COUNT * 3);
        const cols = new Float32Array(COUNT * 3);
        const color = new THREE.Color();

        let i = 0;
        for (let x = 0; x < ROWS; x++) {
            for (let y = 0; y < COLS; y++) {
                // Center the grid
                pos[i * 3] = (x - ROWS / 2) * SPACING;
                pos[i * 3 + 1] = (y - COLS / 2) * SPACING;
                pos[i * 3 + 2] = 0; // Flat initially

                // Base Gradient Color
                // x / ROWS gives us a gradient from left to right
                const t = x / ROWS;
                color.setHSL(0.6 + t * 0.1, 0.8, 0.5); // Blue to Purple HSL

                cols[i * 3] = color.r;
                cols[i * 3 + 1] = color.g;
                cols[i * 3 + 2] = color.b;

                i++;
            }
        }
        return { positions: pos, baseColors: cols };
    }, []);

    const colors = useMemo(() => new Float32Array(baseColors), [baseColors]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const mouseX = (state.mouse.x * 15); // Scale mouse to grid coords roughly
        const mouseY = (state.mouse.y * 15);

        // Slow rotation of the whole fabric to show depth
        meshRef.current.rotation.x = -0.5 + Math.sin(time * 0.1) * 0.1;
        meshRef.current.rotation.y = Math.sin(time * 0.15) * 0.2;

        for (let i = 0; i < COUNT; i++) {
            const i3 = i * 3;
            const ix = i % COLS;
            const iy = Math.floor(i / COLS);

            const x = positions[i3];
            const y = positions[i3 + 1]; // Use stored layout

            // --- FLUID WAVE MATH ---
            // Combine multiple sine waves for "complex ocean/cloth" feel
            let z = Math.sin(ix * 0.3 + time) * 0.8;
            z += Math.cos(iy * 0.2 + time * 1.2) * 0.8;
            z += Math.sin((ix + iy) * 0.1 + time * 0.5) * 0.5; // Large roller wave

            // --- INTERACTIVITY ---
            // Calculate distance to mouse
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Ripple effect near mouse
            if (dist < 4) {
                z -= (4 - dist) * 0.8; // Push down
            }

            // --- UPDATE TRANSFORM ---
            dummy.position.set(x, y, z);

            // Visualize "Peak" vs "Trough" with scale
            // Peaks are larger, troughs are smaller
            const scale = 0.8 + (z + 2) * 0.2;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);

            // --- DYNAMIC COLOR ---
            // Map Height (Z) to Brightness

            const rBase = baseColors[i3];
            const gBase = baseColors[i3 + 1];
            const bBase = baseColors[i3 + 2];

            // Mix Base Color with White based on height
            // Z ranges roughly -2 to +2
            const intensity = (z + 3) / 5;

            colors[i3] = rBase * intensity + (z > 1.5 ? 0.5 : 0); // Add white tip
            colors[i3 + 1] = gBase * intensity + (z > 1.5 ? 0.5 : 0);
            colors[i3 + 2] = bBase * intensity + (z > 1.5 ? 0.5 : 0);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
        meshRef.current.geometry.attributes.color.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
            <sphereGeometry args={[0.08, 16, 16]}>
                <instancedBufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </sphereGeometry>
            <meshStandardMaterial
                vertexColors
                roughness={0.2}
                metalness={0.8}
            />
        </instancedMesh>
    );
};

export default function HeroParticles() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full">
            <Canvas
                camera={{ position: [0, 0, 18], fov: 45 }}
                gl={{ antialias: false, alpha: true }}
                dpr={[1, 1.5]}
            >
                <ambientLight intensity={0.2} />
                <directionalLight position={[0, 0, 10]} intensity={2} />
                <pointLight position={[-10, 0, 10]} intensity={5} color="#6366f1" />

                {/* Tilted view of the cloth */}
                <group position={[0, 0, 0]} rotation={[0.4, 0, 0]}>
                    <DigitalVeil />
                </group>

                <EffectComposer disableNormalPass>
                    {/* Soft, silky glow */}
                    <Bloom
                        luminanceThreshold={0.3}
                        mipmapBlur
                        intensity={1.0}
                        radius={0.8}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}