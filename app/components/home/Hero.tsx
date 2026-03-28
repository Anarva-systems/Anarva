"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    MeshTransmissionMaterial,
    Float,
    Environment,
    Html
} from "@react-three/drei";
import * as THREE from "three";

/* =============================================
   THREE.JS - COMPONENTS
   ============================================= */
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
                    samples={10}
                    resolution={256}
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
            {/* White Rim Highlight */}
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

function Scene3D() {
    // Triangle Geometry
    const triangleGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 3);

    // Faceted Sphere (Icosahedron)
    const sphereGeo = new THREE.IcosahedronGeometry(1.1, 0);

    // Lightning Bolt Geometry
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
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
            dpr={[1, 2]}
        >
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
            <Suspense fallback={<CanvasLoader />}>
                {/* Triangle */}
                <GlassShape
                    geometry={triangleGeo}
                    position={[-1.4, 1.2, 0]}
                    rotation={[Math.PI / 2, 0, Math.PI / 6]}
                    scale={0.7}
                    speed={1.2}
                />

                {/* sphere */}
                <GlassShape
                    geometry={sphereGeo}
                    position={[1.4, 1.0, 0]}
                    scale={0.8}
                    speed={1.5}
                />

                {/* Lightning */}
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

/* =============================================
   MAIN HERO
   ============================================= */
export default function Hero() {
    const { scrollY } = useScroll();

    // Layered Parallax Offsets
    const yHeadline = useTransform(scrollY, [0, 500], [0, -100]);
    const ySubtext = useTransform(scrollY, [0, 500], [0, -50]);
    const yScene = useTransform(scrollY, [0, 500], [0, 50]);

    return (
        <section className="relative min-h-screen flex flex-col justify-center text-white px-6 md:px-12 lg:px-20 py-24 overflow-hidden"
            style={{
                background: "radial-gradient(circle at 50% 50%, #0a0a0f 0%, #030303 100%)"
            }}
        >
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center z-10">

                {/* Left Content - Text & Stats */}
                <motion.div
                    className="flex flex-col gap-10 lg:gap-12"
                    style={{ y: yHeadline }}
                >
                    <div className="flex flex-col">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white uppercase mb-4">
                            WE HELP <br />
                            <span className="text-zinc-500">Businesses</span> <br />
                            <span className="text-white">TO GROW.</span>
                        </h1>
                        <p className="text-lg md:text-xl lg:text-2xl text-zinc-400 font-medium max-w-lg leading-relaxed mb-8">
                            Convert more visitors into users, leads, or booked calls—with zero fluff.
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="/contact" className="px-8 py-4 bg-white text-black text-lg lg:text-xl font-black flex items-center gap-3 transition-all hover:bg-zinc-200 active:scale-95 group shadow-[6px_6px_0px_rgba(255,255,255,0.1)] hover:shadow-none">
                                Book a call <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/work" className="text-lg lg:text-xl font-black text-zinc-400 hover:text-white transition-colors border-b-2 border-transparent hover:border-white py-1">
                                View Work
                            </Link>
                        </div>
                    </div>

                    {/* Stats List */}
                    <motion.div
                        className="flex gap-10 md:gap-16 mt-8 pt-8 border-t border-white/5 w-full max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        style={{ y: ySubtext }}
                    >
                        <div className="flex flex-col">
                            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-1">97+</div>
                            <div className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Designs delivered</div>
                        </div>
                        <div className="flex flex-col">
                            <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-1">99%</div>
                            <div className="text-[9px] md:text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em]">Client satisfaction</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Content - 3D Scene */}
                <motion.div
                    className="relative w-full h-[400px] md:h-[600px] lg:h-[700px]"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 1.5 }}
                    style={{ y: yScene }}
                >
                    <Scene3D />
                </motion.div>
            </div>
        </section>
    );
}
