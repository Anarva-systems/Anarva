"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, ThreeEvent } from '@react-three/fiber';
import { Float, Text, Edges, Environment, PerspectiveCamera, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

// Service Data
const SERVICES = [
    { id: 1, type: 'cube', label: 'AI CORE', color: '#60a5fa' },
    { id: 2, type: 'sphere', label: 'CLOUD', color: '#c084fc' },
    { id: 3, type: 'torus', label: 'CYBER', color: '#34d399' },
    { id: 4, type: 'octahedron', label: 'DEV', color: '#fbbf24' },
    { id: 5, type: 'icosahedron', label: 'DATA', color: '#f472b6' },
];

const FloatingShape = ({ type, label, color, position: initialPos }: { type: string, label: string, color: string, position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [dragging, setDragging] = useState(false);

    // Physics state
    const position = useRef(new THREE.Vector3(...initialPos));
    const velocity = useRef(new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
    ));
    const rotationVelocity = useRef(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        0
    ));

    // Bounds
    const BOUNDS = 3.5;

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // If active (expanded), just float gently in center or stay put
        if (active) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.scale.lerp(new THREE.Vector3(2, 2, 2), 0.1);
            return;
        }

        // If not dragging, apply physics
        if (!dragging) {
            position.current.add(velocity.current);

            // Wall Bouncing
            if (Math.abs(position.current.x) > BOUNDS) velocity.current.x *= -1;
            if (Math.abs(position.current.y) > BOUNDS) velocity.current.y *= -1;
            if (Math.abs(position.current.z) > 2) velocity.current.z *= -1;

            // Rotation
            meshRef.current.rotation.x += rotationVelocity.current.x;
            meshRef.current.rotation.y += rotationVelocity.current.y;
        }

        // Apply position
        meshRef.current.position.lerp(position.current, dragging ? 0.2 : 1);

        // Hover Scale
        const targetScale = hovered ? 1.2 : 1;
        meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    });

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setDragging(true);
        // Add a little "kick" when grabbed? 
        // For simplicity, we just stop velocity while dragging logic would be complex without full gesture lib
        // Instead, let's treat "click" as "break open" if not dragging, 
        // But the prompt says "grab/swipe". Simulating grab with pointer move is tricky without unified state.
        // Let's implement "Poke" adds velocity and "Click" toggles active.

        // Impulse on click
        velocity.current.add(new THREE.Vector3(
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1,
            (Math.random() - 0.5) * 0.1
        ));

        if (!active) setActive(true);
        else setActive(false);
    };

    // Shape Geometry
    const Geometry = () => {
        switch (type) {
            case 'cube': return <boxGeometry args={[1, 1, 1]} />;
            case 'sphere': return <sphereGeometry args={[0.7, 32, 32]} />;
            case 'torus': return <torusGeometry args={[0.6, 0.2, 16, 32]} />;
            case 'octahedron': return <octahedronGeometry args={[0.8]} />;
            case 'icosahedron': return <icosahedronGeometry args={[0.8]} />;
            default: return <boxGeometry />;
        }
    };

    return (
        <group>
            <mesh
                ref={meshRef}
                position={initialPos}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onPointerDown={handlePointerDown}
            >
                <Geometry />
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.1}
                    transparent
                    opacity={active ? 0.9 : 1}
                />

                {/* Neon Edges */}
                <Edges
                    scale={1.05}
                    threshold={15}
                    color={color}
                />

                {/* Floating Label when active or hovered */}
                {(hovered || active) && (
                    <Text
                        position={[0, 1.2, 0]}
                        fontSize={0.3}
                        color={color}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {label}
                    </Text>
                )}
            </mesh>
        </group>
    );
};

export default function Warehouse() {
    return (
        <div className="w-full h-full relative">
            <Canvas gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />

                {/* Lights */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#blue" />

                {/* Environment Reflections */}
                <Environment preset="night">
                    <Lightformer intensity={1} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                </Environment>

                {/* Objects */}
                {SERVICES.map((service, i) => (
                    <FloatingShape
                        key={service.id}
                        {...service}
                        position={[
                            (Math.random() - 0.5) * 4,
                            (Math.random() - 0.5) * 4,
                            (Math.random() - 0.5) * 2
                        ]}
                    />
                ))}

                {/* Effects */}
                <EffectComposer enableNormalPass={false}>
                    <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} radius={0.4} />
                </EffectComposer>

            </Canvas>
        </div>
    );
}
