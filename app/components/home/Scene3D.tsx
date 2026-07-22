"use client";

import { useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    MeshTransmissionMaterial,
    Float,
    Environment,
    Html
} from "@react-three/drei";
import * as THREE from "three";

function CanvasLoader() {
    return (
        <Html center>
            <div className="flex flex-col items-center gap-4 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] whitespace-nowrap">
                <div className="w-16 h-[1px] bg-white/5 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-zinc-400"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-zinc-500 animate-pulse" />
                    Initializing System
                </div>
            </div>
        </Html>
    );
}

function GlassShape({
    geometry,
    position,
    rotation = [0, 0, 0],
    scale = 1,
    speed = 1,
    floatIntensity = 0.5,
    rotationIntensity = 0.5
}: {
    geometry: THREE.BufferGeometry;
    position: [number, number, number];
    rotation?: [number, number, number];
    scale?: number;
    speed?: number;
    floatIntensity?: number;
    rotationIntensity?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (!meshRef.current) return;
        const s = hovered ? 1.0 : 0.2;
        meshRef.current.rotation.x += delta * s;
        meshRef.current.rotation.y += delta * (s * 0.8);
    });

    return (
        <Float speed={speed} rotationIntensity={rotationIntensity} floatIntensity={floatIntensity}>
            <mesh
                ref={meshRef}
                position={position}
                rotation={rotation}
                scale={scale}
                geometry={geometry}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    resolution={128}
                    transmission={1}
                    roughness={0.05}
                    thickness={0.6}
                    ior={1.5}
                    chromaticAberration={0.15}
                    anisotropy={0.3}
                    color="#000000"
                    metalness={0.1}
                    distortion={0.1}
                    distortionScale={0.1}
                    temporalDistortion={0.1}
                />
            </mesh>
            <mesh
                position={position}
                rotation={rotation}
                scale={scale * 1.02}
                geometry={geometry}
            >
                <meshBasicMaterial
                    wireframe
                    color="#ffffff"
                    transparent
                    opacity={hovered ? 0.15 : 0.05}
                />
            </mesh>
        </Float>
    );
}

export default function Scene3D() {
    const triangleGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 3);
    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 0);

    const lightningShape = new THREE.Shape();
    lightningShape.moveTo(0, 1.2);
    lightningShape.lineTo(0.6, 0.1);
    lightningShape.lineTo(0.2, 0.1);
    lightningShape.lineTo(0.5, -1.2);
    lightningShape.lineTo(-0.3, 0);
    lightningShape.lineTo(0.1, 0);
    lightningShape.lineTo(0, 1.2);

    const lightningGeo = new THREE.ExtrudeGeometry(lightningShape, {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelOffset: 0,
        bevelSegments: 3
    });

    return (
        <Canvas
            camera={{ position: [0, 0, 7], fov: 40 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent" }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
            <Suspense fallback={<CanvasLoader />}>
                <GlassShape
                    geometry={triangleGeo}
                    position={[-1.4, 1.2, 0]}
                    rotation={[Math.PI / 2, 0, Math.PI / 6]}
                    scale={0.7}
                    speed={1.2}
                />
                <GlassShape
                    geometry={sphereGeo}
                    position={[1.4, 1.0, 0]}
                    scale={0.8}
                    speed={1.5}
                />
                <GlassShape
                    geometry={lightningGeo}
                    position={[0, -1.0, 0]}
                    scale={0.8}
                    speed={1.3}
                    rotation={[0, 0, Math.PI / 8]}
                />
                <Environment preset="city" />
            </Suspense>
        </Canvas>
    );
}
