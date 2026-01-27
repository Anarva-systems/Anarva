"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

export type ShapeType = "cube" | "star" | "code";

interface ParticleProps {
    activeId?: string; // Changed from shape to activeId to match page.tsx
    color?: string;
    speed?: number;
    paused?: boolean;
    count?: number;
    scrollProgress?: any; // Accepted but we might not strictly need it for logic yet
}

// --- MATH UTILITIES FOR CLEANER SHAPES ---

const getCubePositions = (count: number) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        // WIREFRAME CUBE LOGIC
        // We want particles concentrated on the edges to look like a structure
        const r = Math.random();

        // 70% on edges, 30% on faces (cleaner look)
        if (r < 0.7) {
            // Pick an axis for the "long" part of the edge
            const axis = Math.floor(Math.random() * 3);
            // Pick which specific edge (positive or negative positions for other two axes)
            const s1 = Math.random() > 0.5 ? 1.5 : -1.5;
            const s2 = Math.random() > 0.5 ? 1.5 : -1.5;
            const spread = (Math.random() - 0.5) * 3; // Length of edge

            points[i3] = axis === 0 ? spread : (axis === 1 ? s1 : s2);
            points[i3 + 1] = axis === 1 ? spread : (axis === 2 ? s1 : s2);
            points[i3 + 2] = axis === 2 ? spread : (axis === 0 ? s1 : s2);
        } else {
            // Sparse particles on faces
            const face = Math.floor(Math.random() * 3);
            const side = Math.random() > 0.5 ? 1.5 : -1.5;
            const u = (Math.random() - 0.5) * 3;
            const v = (Math.random() - 0.5) * 3;

            points[i3] = face === 0 ? side : u;
            points[i3 + 1] = face === 1 ? side : (face === 0 ? u : v);
            points[i3 + 2] = face === 2 ? side : v;
        }
    }
    return points;
};

const getStarPositions = (count: number) => {
    const points = new Float32Array(count * 3);

    // Create distinct "clusters" for multiple stars
    // 1 Main Star (Center-Left), 2 Smaller Stars (Top-Right, Bottom-Right)
    const centers = [
        { x: -0.5, y: 0, z: 0, scale: 2.2, countRatio: 0.6 },   // Main Star
        { x: 1.8, y: 1.5, z: -0.5, scale: 1.0, countRatio: 0.2 }, // Small Top
        { x: 1.2, y: -1.8, z: 0.5, scale: 0.8, countRatio: 0.2 }  // Small Bottom
    ];

    let offset = 0;

    centers.forEach((star) => {
        const starCount = Math.floor(count * star.countRatio);

        for (let i = 0; i < starCount; i++) {
            if (offset + i >= count) break;

            const i3 = (offset + i) * 3;

            // 3D Astroid Logic (same as before, just applied per-cluster)
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI;

            let sx = Math.sin(v) * Math.cos(u);
            let sy = Math.sin(v) * Math.sin(u);
            let sz = Math.cos(v);

            // Astroid Pinch
            sx = Math.sign(sx) * Math.pow(Math.abs(sx), 3);
            sy = Math.sign(sy) * Math.pow(Math.abs(sy), 3);
            sz = Math.sign(sz) * Math.pow(Math.abs(sz), 3);

            // Apply scale and position offset
            const r = star.scale + (Math.random() * 0.2); // slight fuzz

            points[i3] = (sx * r) + star.x;
            points[i3 + 1] = (sy * r) + star.y;
            points[i3 + 2] = (sz * r) + star.z;
        }
        offset += starCount;
    });

    // Fill remaining if any due to rounding
    while (offset < count) {
        // Just dump them in the main star
        const i3 = offset * 3;
        points[i3] = (Math.random() - 0.5) * 2;
        points[i3 + 1] = (Math.random() - 0.5) * 2;
        points[i3 + 2] = (Math.random() - 0.5) * 2;
        offset++;
    }

    return points;
};

const getCodePositions = (count: number) => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Keep existing "Brackets" logic but clean it up
        const side = Math.random() > 0.5 ? 1 : -1;
        const t = (Math.random() - 0.5) * 3;

        // Crisp "V" lines
        const xBase = side * 1.8;
        const width = 0.8;
        const xOffset = -side * (Math.abs(t) * 0.5); // 0.5 makes it a wider angle check

        // Add random scatter for "glitch" effect
        const scatter = (Math.random() - 0.5) * 0.1;

        points[i3] = xBase + xOffset + scatter;
        points[i3 + 1] = t;
        points[i3 + 2] = (Math.random() - 0.5) * 0.5; // Flattened depth
    }
    return points;
};

// --- CONNECTOR COMPONENTS ---

// 1. NEURAL LINKS (AI): Random connections for a brain/network look
function NeuralLinks({ positions, active, color }: { positions: Float32Array, active: boolean, color: string }) {
    const lineRef = useRef<THREE.BufferGeometry>(null);

    useFrame(() => {
        if (!lineRef.current || !active) return;
        const linePositions = [];
        const maxDist = 1.2;
        const limit = 200; // Check connections for subset

        for (let i = 0; i < limit; i++) {
            for (let j = i + 1; j < limit; j++) {
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                if (dist < maxDist) {
                    linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                    linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                }
            }
        }
        lineRef.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return active ? (
        <lineSegments>
            <bufferGeometry ref={lineRef} />
            <lineBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </lineSegments>
    ) : null;
}

// 2. DESIGN WIREFRAME (CUBE): Structured grid connections
function DesignWireframe({ positions, active, color }: { positions: Float32Array, active: boolean, color: string }) {
    const lineRef = useRef<THREE.BufferGeometry>(null);

    useFrame(() => {
        if (!lineRef.current || !active) return;
        const linePositions = [];
        const maxDist = 0.8; // Shorter distance for tighter grid
        const limit = 300;

        for (let i = 0; i < limit; i++) {
            for (let j = i + 1; j < limit; j++) {
                // Only connect if they are on same plane roughly (optimization or visual style)
                // For now, simple proximity creates a nice mesh on the cube surface
                const dx = positions[i * 3] - positions[j * 3];
                const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
                const dz = positions[i * 3 + 2] - positions[j * 3 + 2];

                // Manhattan distance might look more "engineered" but Euclidean is smoother
                if (Math.abs(dx) < maxDist && Math.abs(dy) < maxDist && Math.abs(dz) < maxDist) {
                    // Ensure they are close enough to form a grid, avoiding cross-cube diagonals if possible
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                    if (dist < maxDist) {
                        linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                        linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                    }
                }
            }
        }
        lineRef.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return active ? (
        <lineSegments>
            <bufferGeometry ref={lineRef} />
            <lineBasicMaterial color={color} transparent opacity={0.15} blending={THREE.AdditiveBlending} />
        </lineSegments>
    ) : null;
}

// 3. DEV STRUCTURE (CODE): Vertical lines connecting the brackets
function DevConnections({ positions, active, color }: { positions: Float32Array, active: boolean, color: string }) {
    const lineRef = useRef<THREE.BufferGeometry>(null);

    useFrame(() => {
        if (!lineRef.current || !active) return;
        const linePositions = [];
        const maxDistY = 0.5; // Connect vertically
        const maxDistX = 0.2; // Tight horizontal limit
        const limit = 400;

        for (let i = 0; i < limit; i++) {
            for (let j = i + 1; j < limit; j++) {
                const dx = Math.abs(positions[i * 3] - positions[j * 3]);
                const dy = Math.abs(positions[i * 3 + 1] - positions[j * 3 + 1]);
                const dz = Math.abs(positions[i * 3 + 2] - positions[j * 3 + 2]);

                // Connect points that form the line of the bracket (mostly vertical neighbors)
                if (dx < maxDistX && dy < maxDistY && dz < 0.5) {
                    linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                    linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
                }
            }
        }
        lineRef.current.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    });

    return active ? (
        <lineSegments>
            <bufferGeometry ref={lineRef} />
            <lineBasicMaterial color={color} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
        </lineSegments>
    ) : null;
}

function ParticleShape({ activeId = "design", color = "#6366f1", speed = 1, paused = false, count = 3000 }: ParticleProps) {
    const ref = useRef<THREE.Points>(null);
    const geoRef = useRef<THREE.BufferGeometry>(null);

    // Map activeId to Shape
    const shape = useMemo(() => {
        if (activeId === "ai") return "star";
        if (activeId === "dev") return "code";
        return "cube";
    }, [activeId]);

    // Smooth Color Lerping
    const currentColor = useRef(new THREE.Color(color));
    const targetColor = useMemo(() => new THREE.Color(color), [color]);

    // Initial Positions
    const positions = useMemo(() => getCubePositions(count), [count]);

    // Memoize Targets
    const targets = useMemo(() => {
        if (shape === "star") return getStarPositions(count);
        if (shape === "code") return getCodePositions(count);
        return getCubePositions(count);
    }, [shape, count]);

    useFrame((state, delta) => {
        if (!geoRef.current || paused) return;

        const posAttr = geoRef.current.attributes.position;
        const array = posAttr.array as Float32Array;
        const time = state.clock.getElapsedTime();

        // 1. Color Lerp
        currentColor.current.lerp(targetColor, delta * 3);
        // Force update material color if ref exists
        if (ref.current && ref.current.material) {
            (ref.current.material as THREE.PointsMaterial).color.copy(currentColor.current);
        }

        // 2. Mouse Parallax (Apply to whole group for performance)
        const targetRotationX = state.pointer.y * 0.2;
        const targetRotationY = state.pointer.x * 0.2;
        if (ref.current) {
            ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.1;
            ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.1;
            ref.current.rotation.z += delta * 0.05 * speed; // Ambient spin
        }

        // 3. Optimized Lerp loop
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            // Morphing Logic
            array[i3] += (targets[i3] - array[i3]) * 0.1;
            array[i3 + 1] += (targets[i3 + 1] - array[i3 + 1]) * 0.1;
            array[i3 + 2] += (targets[i3 + 2] - array[i3 + 2]) * 0.1;

            // Small Sine-wave floating effect (Floating "Organic" feel)
            array[i3 + 1] += Math.sin(time + array[i3]) * 0.002;
        }

        posAttr.needsUpdate = true;
    });

    return (
        <group>
            <Points ref={ref} stride={3} frustumCulled={false}>
                <bufferGeometry ref={geoRef}>
                    <bufferAttribute
                        attach="attributes-position"
                        count={count}
                        array={positions}
                        itemSize={3}
                        usage={THREE.DynamicDrawUsage}
                    />
                </bufferGeometry>
                <PointMaterial
                    transparent
                    size={0.018}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>

            {/* Structural Visualizations */}
            <NeuralLinks positions={positions} active={activeId === "ai"} color={color} />
            <DesignWireframe positions={positions} active={activeId === "design"} color={color} />
            <DevConnections positions={positions} active={activeId === "dev"} color={color} />
        </group>
    );
}

export default function ServiceParticles(props: ParticleProps) {
    return (
        <div className="w-full h-full bg-slate-950">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                {/* Subtle Float makes the whole scene feel "liquid" */}
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <ParticleShape {...props} />
                </Float>
            </Canvas>
        </div>
    );
}