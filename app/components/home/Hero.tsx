"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowRight, CornerRightDown, Plus } from "lucide-react";
import Link from "next/link";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    MeshTransmissionMaterial,
    Float,
    Environment,
} from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

/* ─────────────────────────────────────────────
   TECHNICAL MARKERS
   ───────────────────────────────────────────── */
function Crosshair({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute w-3 h-3 flex items-center justify-center opacity-40 ${className}`}>
            <div className="absolute w-full h-[1px] bg-white/50" />
            <div className="absolute h-full w-[1px] bg-white/50" />
        </div>
    );
}

function SectionIndex({ num, label }: { num: string; label: string }) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-white/40 tracking-widest">{num}</span>
            <div className="h-[1px] w-8 bg-white/20" />
            <span className="font-mono text-xs text-zinc-500 tracking-[0.2em] uppercase">{label}</span>
        </div>
    );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────────────── */
function AnimatedCounter({
    target,
    suffix = "",
    duration = 2,
}: {
    target: number;
    suffix?: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const obj = { val: 0 };
        gsap.to(obj, {
            val: target,
            duration,
            ease: "expo.out",
            onUpdate: () => setCount(Math.round(obj.val)),
        });
    }, [target, duration]);

    return (
        <span className="tabular-nums tracking-tight">
            {count}
            {suffix}
        </span>
    );
}

/* ─────────────────────────────────────────────
   STATS TICKER - PRECISION STYLE
   ───────────────────────────────────────────── */
const STATS = [
    { value: 99, suffix: "%", label: "SYSTEM STABILITY" },
    { value: 15, suffix: "+", label: "DEPLOYED UNITS" },
    { value: 12, suffix: "+", label: "ACTIVE PARTNERS" },
];

function StatsTicker() {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setActiveIdx((i) => (i + 1) % STATS.length),
            4000
        );
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-full flex flex-col justify-between">
            <SectionIndex num="02" label="METRICS" />

            <div className="relative h-20">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIdx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="text-4xl md:text-5xl font-light text-white tracking-tight">
                            <AnimatedCounter
                                target={STATS[activeIdx].value}
                                suffix={STATS[activeIdx].suffix}
                                duration={1.5}
                            />
                        </div>
                        <div className="mt-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            {STATS[activeIdx].label}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Lines */}
            <div className="flex gap-1 mt-auto pt-8">
                {STATS.map((_, i) => (
                    <div
                        key={i}
                        className={`h-[1px] transition-all duration-500 ${i === activeIdx ? "w-8 bg-white" : "w-4 bg-white/20"}`}
                    />
                ))}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   THREE.JS - DARK CHROME CORE
   ───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   THREE.JS - DARK CHROME CORE (INTERACTIVE)
   ───────────────────────────────────────────── */
function ChromeCore() {
    const meshRef = useRef<THREE.Mesh>(null!);
    const { pointer } = useThree();
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        // Dynamic rotation speed based on interaction
        const speed = active ? 2.0 : (hovered ? 0.5 : 0.1);
        meshRef.current.rotation.x += delta * speed;
        meshRef.current.rotation.y += delta * (speed * 1.2);

        // Subtle precise tilt following mouse
        meshRef.current.rotation.z = THREE.MathUtils.lerp(
            meshRef.current.rotation.z,
            pointer.x * 0.2,
            0.05
        );

        // Pulse effect when active
        if (active) {
            const scale = 2 + Math.sin(state.clock.elapsedTime * 10) * 0.1;
            meshRef.current.scale.setScalar(scale);
        } else {
            meshRef.current.scale.lerp(new THREE.Vector3(2, 2, 2), 0.1);
        }
    });

    return (
        <Float speed={hovered ? 2 : 1.2} rotationIntensity={hovered ? 0.5 : 0.2} floatIntensity={0.4}>
            {/* Main Dark Chrome Core */}
            <mesh
                ref={meshRef}
                scale={2}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
                onClick={() => setActive(!active)}
            >
                <icosahedronGeometry args={[1, 0]} />
                <MeshTransmissionMaterial
                    backside
                    samples={8}
                    resolution={512}
                    transmission={0.6}
                    roughness={0.2}
                    thickness={0.5}
                    ior={1.5}
                    chromaticAberration={hovered || active ? 0.2 : 0.05} // Glitch on interaction
                    anisotropy={0.1}
                    color={active ? "#222" : "#1a1a1a"} // Slight color shift on click
                    metalness={0.8}
                />
            </mesh>

            {/* Wireframe Shell */}
            <mesh scale={2.05} rotation={[0.5, 0.5, 0]}>
                <icosahedronGeometry args={[1, 0]} />
                <meshBasicMaterial
                    wireframe
                    color={hovered ? "#fff" : "#444"} // Brighten wireframe on hover
                    transparent
                    opacity={hovered ? 0.3 : 0.15}
                />
            </mesh>
        </Float>
    );
}

function Scene3D() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 40 }}
            gl={{ antialias: true, alpha: true }}
            style={{ background: "transparent" }}
            dpr={[1, 1.5]}
        >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#444" />
            <Suspense fallback={null}>
                <ChromeCore />
                <Environment preset="studio" />
            </Suspense>
        </Canvas>
    );
}

/* ─────────────────────────────────────────────
   KINETIC TYPOGRAPHY
   ───────────────────────────────────────────── */
function KineticHeadline() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const words = containerRef.current.querySelectorAll(".word");
        gsap.fromTo(words,
            { y: 50, opacity: 0, rotationX: 20 },
            { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
        );
    }, []);

    return (
        <div ref={containerRef} className="perspective-text">
            <h1 className="text-[11vw] sm:text-[8vw] md:text-[6vw] leading-[0.9] font-light tracking-[-0.03em] mb-8 text-white">
                <div className="overflow-hidden"><span className="word block">PRECISION</span></div>
                <div className="overflow-hidden"><span className="word block text-white/50">ENGINEERED</span></div>
                <div className="overflow-hidden"><span className="word block text-gradient-chrome">DIGITAL CRAFT</span></div>
            </h1>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MAIN HERO
   ───────────────────────────────────────────── */
export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Mouse Spotlight Logic
    const containerRef = useRef<HTMLElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current || !spotlightRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            spotlightRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center bg-[var(--obsidian)] text-white px-4 md:px-8 lg:px-12 py-24 overflow-hidden">

            {/* Spotlight Effect */}
            <div ref={spotlightRef} className="spotlight fixed top-0 left-0 hidden md:block" />

            {/* Grid Lines Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}
            />

            {/* Main Content Grid */}
            <div className="max-w-[1400px] mx-auto w-full z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 auto-rows-[minmax(100px,auto)]">

                {/* ────────── 01: HERO TEXT (Span 7) ────────── */}
                <motion.div
                    className="col-span-1 md:col-span-2 lg:col-span-7 row-span-2 relative p-8 md:p-12 border-l border-white/5 border-t md:border-t-0"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                >
                    <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />

                    <SectionIndex num="01" label="PHILOSOPHY" />
                    <KineticHeadline />

                    <div className="md:flex items-end gap-12 mt-12">
                        <p className="text-sm md:text-base text-zinc-500 font-mono leading-relaxed max-w-md tracking-wide">
                            ANARVA ARCHITECTS THE UNSEEN. <br />
                            WE BUILD HIGH-PERFORMANCE DIGITAL INFRASTRUCTURE FOR BRANDS THAT DEMAND PERFECTION.
                        </p>

                        <Link href="/work" className="hidden md:flex items-center gap-4 group mt-6 md:mt-0">
                            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <ArrowRight className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-mono tracking-widest text-zinc-400 group-hover:text-white transition-colors">EXPLORE WORK</span>
                        </Link>
                    </div>
                </motion.div>

                {/* ────────── 02: 3D CORE (Span 5) ────────── */}
                <motion.div
                    className="col-span-1 md:col-span-1 lg:col-span-5 row-span-2 relative min-h-[400px] bg-[#080808] border border-white/5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
                >
                    <Crosshair className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                    <Crosshair className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />

                    <div className="absolute top-6 right-6 z-20">
                        <span className="font-mono text-[10px] text-zinc-600 tracking-[0.2em]">FIG. 001 — CORE</span>
                    </div>

                    <Scene3D />
                </motion.div>

                {/* ────────── 03: METRICS (Span 4) ────────── */}
                <motion.div
                    className="col-span-1 md:col-span-1 lg:col-span-4 p-8 border-t border-b border-white/5 bg-[#0a0a0a]"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                >
                    <StatsTicker />
                </motion.div>

                {/* ────────── 04: STATUS (Span 4) ────────── */}
                <motion.div
                    className="col-span-1 md:col-span-1 lg:col-span-4 p-8 border border-white/5 relative group hover:bg-[#0c0c0c] transition-colors"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                >
                    <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />
                    <SectionIndex num="03" label="STATUS" />

                    <div className="flex items-center justify-between mt-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="pulse-status" />
                                <span className="text-sm font-medium text-white tracking-wide">OPERATIONAL</span>
                            </div>
                            <span className="text-xs text-zinc-600 font-mono block">BOOKING Q3 2026</span>
                        </div>
                        <Link href="/contact" className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-white/40 transition-colors">
                            <Plus className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                        </Link>
                    </div>
                </motion.div>

                {/* ────────── 05: SERVICES (Span 4) ────────── */}
                <motion.div
                    className="col-span-1 md:col-span-2 lg:col-span-4 p-8 border-t border-r border-white/5 flex flex-col justify-between"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                >
                    <SectionIndex num="04" label="CAPABILITIES" />
                    <div className="space-y-4">
                        {['STRATEGY', 'DESIGN', 'ENGINEERING'].map((item, i) => (
                            <div key={item} className="flex items-center justify-between border-b border-white/5 pb-2 group cursor-pointer">
                                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors tracking-widest">{item}</span>
                                <CornerRightDown className="w-3 h-3 text-zinc-700 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-8 flex items-center gap-4 opacity-30">
                <ArrowDown className="w-4 h-4" />
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll to Init</span>
            </div>
        </section>
    );
}
