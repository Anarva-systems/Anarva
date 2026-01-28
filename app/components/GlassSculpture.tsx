"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    Float,
    MeshTransmissionMaterial,
    Environment,
    PresentationControls,
    ContactShadows,
    TorusKnot,
    Sphere,
    Torus,
    Lightformer
} from '@react-three/drei';
import * as THREE from 'three';

const GlassShape = ({ ...props }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
        meshRef.current.rotation.y = Math.sin(t * 0.15) * 0.2;
    });

    return (
        <group {...props}>
            {/* Main Organic Shape */}
            <mesh ref={meshRef} scale={1.2}>
                <torusKnotGeometry args={[1, 0.35, 128, 32, 2, 3]} />
                <MeshTransmissionMaterial
                    backside
                    samples={16}
                    resolution={512}
                    transmission={1}
                    roughness={0.2}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    thickness={1.5}
                    ior={1.5}
                    chromaticAberration={0.1}
                    anisotropy={0.3}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    color="#e0e7ff" // Very light indigo tint
                    attenuationDistance={0.5}
                    attenuationColor="#ffffff"
                />
            </mesh>

            {/* Floating Satellites - Blue Accent */}
            <Float speed={2} rotationIntensity={1} floatIntensity={1} floatingRange={[-0.5, 0.5]}>
                <mesh position={[1.5, 1.5, -1]} scale={0.4}>
                    <icosahedronGeometry args={[1, 0]} />
                    <MeshTransmissionMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1}
                        color="#818cf8" // Indigio 400
                        ior={1.2}
                    />
                </mesh>
            </Float>

            {/* Floating Satellites - Purple Accent */}
            <Float speed={1.5} rotationIntensity={1.5} floatIntensity={0.8} floatingRange={[-0.3, 0.3]}>
                <mesh position={[-1.5, -1, 0.5]} scale={0.3}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <MeshTransmissionMaterial
                        transmission={0.9}
                        roughness={0.1}
                        thickness={1}
                        color="#c084fc" // Purple 400
                        ior={1.2}
                    />
                </mesh>
            </Float>
        </group>
    );
};

const StudioScene = () => {
    return (
        <>
            <GlassShape />

            {/* Dynamic Lighting Environment */}
            <Environment resolution={512}>
                {/* Ceiling Lights (Stripes for nice reflections) */}
                <group rotation={[-Math.PI / 3, 0, 1]}>
                    <Lightformer form="ring" intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                    <Lightformer form="rect" intensity={5} position={[-5, 0, -10]} scale={[10, 10, 1]} target={[0, 0, 0]} />
                    <Lightformer form="rect" intensity={2} position={[5, 0, -10]} scale={[10, 10, 1]} target={[0, 0, 0]} />
                    <Lightformer form="circle" intensity={2} position={[0, 10, 0]} scale={[5, 5, 1]} />
                </group>
            </Environment>

            <spotLight position={[10, 10, 10]} intensity={2} angle={0.15} penumbra={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={1.5} color="#e0e7ff" />

            {/* Soft Shadow Base */}
            <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.25} far={10} color="#000000" />
        </>
    );
};

export default function GlassSculpture() {
    return (
        <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
                <PresentationControls
                    global
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 300 }}
                    rotation={[0, 0.3, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                    <Float rotationIntensity={0.4} floatIntensity={0.5} speed={1.5}>
                        <StudioScene />
                    </Float>
                </PresentationControls>
            </Canvas>
        </div>
    );
}
