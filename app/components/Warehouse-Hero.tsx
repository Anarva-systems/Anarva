"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, Box, Move3d, Layers } from 'lucide-react';
import { HexagonBackground } from '@/app/components/animate-ui/components/backgrounds/hexagon';
import Link from 'next/link';
import Warehouse from './Warehouse';

export default function ZeroGravityHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

    // Magnetic Button Logic
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) * 0.25);
        mouseY.set((e.clientY - centerY) * 0.25);
    };

    const resetMouse = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-[#121212] text-white overflow-hidden flex items-center selection:bg-blue-500/30">

            {/* --- Background Layers --- */}
            {/* Matte Dark Grey Background */}
            <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
                <HexagonBackground />
            </div>
            {/* Soft Ambient Glows */}
            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 h-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* --- LEFT: Typography & Content (Span 6) --- */}
                <motion.div
                    style={{ y }}
                    className="lg:col-span-6 flex flex-col justify-center relative pt-20 lg:pt-0"
                >
                    {/* Decor: Primitive Badge */}
                    <div className="absolute top-[-2rem] left-0 flex items-center gap-2 opacity-60 font-mono text-xs tracking-widest text-blue-400">
                        <Box className="w-3 h-3" />
                        <span className="uppercase">SECTOR: 0-G</span>
                    </div>

                    {/* Headline - Floating Center Style */}
                    <motion.div
                        className="relative z-20 mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                    >
                        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tighter text-white">
                            Organized <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                Chaos
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subtext */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="max-w-lg text-lg text-gray-400 leading-relaxed mb-10 font-light"
                    >
                        We bring structure to the void. Navigating the complexity of modern software with effortless precision and antigravity architecture.
                    </motion.p>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-6">
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            style={{ x: dx, y: dy }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={resetMouse}
                            className="relative group h-14 px-8 bg-blue-600 text-white rounded-md flex items-center gap-3 overflow-hidden shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(37,99,235,0.5)]"
                        >
                            <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 font-medium tracking-wide">Enter the Vault</span>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="h-14 px-8 rounded-md border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-3 text-white"
                        >
                            <Play className="w-4 h-4 fill-current" />
                            <span className="font-medium">Watch Physics</span>
                        </motion.button>
                    </div>

                    {/* Stats / Metadata */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-16 pt-8 border-t border-white/5 grid grid-cols-3 gap-6 font-mono text-xs text-gray-500"
                    >
                        <div className="flex items-center gap-2">
                            <Move3d className="w-4 h-4 text-blue-500" />
                            <span>GRAVITY: 0.0</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-blue-500" />
                            <span>OBJECTS: 5</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* --- RIGHT: Visual (Span 6) --- */}
                <div className="lg:col-span-6 relative h-[600px] w-full flex items-center justify-center perspective-1000">
                    <div className="relative w-full h-[600px]">
                        {/* The Sculpture - Warehouse */}
                        <div className="absolute inset-0 z-20">
                            <Warehouse />
                        </div>

                        {/* Background Elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-gray-900/50 to-blue-900/20 rounded-full blur-[80px] -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
}
