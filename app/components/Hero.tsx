"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Plus, Minus, MoveUpRight, Zap, Radio, Globe, Cpu } from 'lucide-react';
import { HexagonBackground } from '@/app/components/animate-ui/components/backgrounds/hexagon';
import dynamic from 'next/dynamic';
import Link from 'next/link';
// const HeroParticles = dynamic(() => import('./HeroParticles'), {
//     ssr: false,
//     loading: () => <div className="w-full h-full bg-transparent" />
// });

export default function DeepTechHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    // Magnetic Button State
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.2);
        mouseY.set((e.clientY - centerY) * 0.2);
    };

    return (
        <section ref={containerRef} className="relative min-h-[80vh] w-full bg-[#FAFAFA] text-slate-900 overflow-hidden flex items-center">

            {/* --- GLOBALS: Grid & Texture --- */}
            <div className="absolute inset-0 z-0">
                <HexagonBackground />
            </div>

            <div className="container mx-auto px-6 h-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 pt-10 lg:pt-0 min-h-screen">

                {/* --- LEFT SECTOR: Content (Span 7) --- */}
                <div className="lg:col-span-6 flex flex-col justify-center relative pr-8 lg:pr-16">

                    {/* Decor: Crosshairs & Coordinates */}
                    <div className="absolute top-10 left-0 flex items-center gap-2 opacity-30 font-mono text-xs tracking-tighter">
                        <Plus className="w-3 h-3" />
                        <span>COORD: 18.2377715° N, 83.6953322° W</span>
                    </div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 flex items-center gap-3"
                    >
                        <div className="h-[1px] w-12 bg-black/20" />
                        <span className="font-mono text-xs font-bold tracking-[0.2em] text-indigo-600 uppercase">
                            Next-Gen Ecology
                        </span>
                    </motion.div>

                    {/* MASSIVE Typography */}
                    <div className="relative mb-8">
                        <motion.h1
                            className="text-[13vw] lg:text-[7rem] xl:text-[8rem] font-bold leading-[0.85] tracking-tighter text-slate-900"
                            style={{ fontFamily: "'Syne', sans-serif" }} // Ensure font is loaded or use default sans
                            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 50 }}
                            animate={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)", y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            ANARVA
                        </motion.h1>
                        <motion.h1
                            className="text-[5vw] lg:text-[4rem] font-light tracking-tight text-slate-400 mt-[-1vw]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                        >
                            SYSTEMS
                        </motion.h1>
                    </div>

                    {/* Subtitle / Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="max-w-md text-lg text-slate-600 leading-relaxed mb-12 font-medium"
                    >
                        We engineer <span className="text-indigo-600 border-b border-indigo-200">digital realities</span> that defy gravity.
                        High-velocity web experiences built on weightless architecture.
                    </motion.p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-12 relative z-20">

                        {/* Magnetic Button */}
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            style={{ x: dx, y: dy }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                            className="relative group h-16 px-8 bg-slate-900 text-white rounded-none flex items-center gap-4 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <Link href='/submit-requirements' className="relative z-10 font-mono text-sm tracking-widest uppercase">Start Engine</Link>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        {/* Spec Sheet (Mini Table) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs text-slate-500"
                        >
                            <div className="flex items-center gap-2">
                                <Radio className="w-3 h-3 text-indigo-500" />
                                <span>LATENCY: &lt;12MS</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Cpu className="w-3 h-3 text-indigo-500" />
                                <span>STATUS: ONLINE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-3 h-3 text-indigo-500" />
                                <span>REGION: GLOBAL</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Zap className="w-3 h-3 text-indigo-500" />
                                <span>PWR: 100%</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom Rail Decor */}
                    <div className="absolute bottom-10 left-0 w-full flex justify-between items-end opacity-20 pointer-events-none -z-10">
                        <span className="font-mono text-[10rem] leading-none -mb-10 text-slate-900 tracking-tighter select-none">01</span>
                        <div className="h-px w-32 bg-black" />
                    </div>

                </div>

                {/* --- RIGHT SECTOR: Anarva Visual System --- */}
                {/* <div className="hidden lg:block lg:col-span-6 relative h-full w-full flex items-center justify-center">
                    <div className="relative w-[550px] h-[550px] bg-[#020617] rounded-full overflow-hidden border border-indigo-500/20 shadow-[0_0_50px_rgba(79,70,229,0.1)]">
                        <div className="absolute inset-0 z-10">
                            <Canvas camera={{ position: [0, 0, 5], fov: 35 }} gl={{ antialias: true, alpha: true }}>
                                <OrbitalGroup />
                            </Canvas>
                        </div>
                        <div className="absolute inset-0 z-20 pointer-events-none border-[20px] border-[#020617] rounded-full shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
                        <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                    </div>
                    <div className="absolute inset-0 bg-indigo-600/10 blur-[120px] z-0 transform scale-90 rounded-full" />
                </div> */}
            </div>
        </section>
    );
}
