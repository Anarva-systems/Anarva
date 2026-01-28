"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Plus, Minus, MoveUpRight, Zap, Radio, Globe, Cpu } from 'lucide-react';
import { HexagonBackground } from '@/app/components/animate-ui/components/backgrounds/hexagon';
import Link from 'next/link';
import GlassSculpture from './GlassSculpture';
import Warehouse from './Warehouse';
import TechGrid from './ui/TechGrid';
import HeroSchematic from './ui/HeroSchematic';

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
        <section ref={containerRef} className="relative min-h-screen w-full bg-[#FAFAFA] text-slate-900 overflow-hidden flex items-center">

            {/* --- GLOBALS: Grid & Texture --- */}
            <div className="absolute inset-0 z-0">
                <HexagonBackground />
            </div>

            {/* Decorative Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-indigo-100/40 to-purple-100/40 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/40 to-teal-100/40 rounded-full blur-[80px] pointer-events-none" />


            <div className="container mx-auto max-w-[calc(100vw-8rem)] px-6 h-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 pt-24 lg:pt-0 min-h-screen items-center">

                {/* --- LEFT SECTOR: Content (Span 7) --- */}
                <div className="lg:col-span-7 flex flex-col justify-center relative pr-0 lg:pr-12">

                    {/* Decor: Crosshairs & Coordinates */}
                    <div className="absolute top-[-40px] left-0 flex items-center gap-4 opacity-40 font-mono text-[10px] tracking-widest text-slate-500">
                        <div className="flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            <span>GRID: A-7</span>
                        </div>
                        <div className="h-3 w-[1px] bg-slate-400" />
                        <span>COORD: 18.237° N, 83.695° W</span>
                    </div>

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8 inline-flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200/50 w-fit shadow-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span className="font-mono text-xs font-bold tracking-[0.15em] text-indigo-900 uppercase">
                            Next-Gen Ecology
                        </span>
                    </motion.div>

                    {/* MASSIVE Typography */}
                    <div className="relative mb-8 select-none">
                        <motion.h1
                            className="text-[12vw] lg:text-[6.5rem] xl:text-[7.5rem] font-bold leading-[0.85] tracking-tighter text-slate-900"
                            style={{ fontFamily: "'Syne', sans-serif" }}
                            initial={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)", y: 50 }}
                            animate={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0%, 0 0%)", y: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            ANARVA
                        </motion.h1>
                        <motion.div
                            className="flex items-center gap-4 mt-[-1vw]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                        >
                            <h1
                                className="text-[5vw] lg:text-[4rem] font-light tracking-tight text-slate-400"
                            >
                                SYSTEMS
                            </h1>
                            <div className="h-[2px] flex-grow bg-gradient-to-r from-slate-200 to-transparent max-w-[200px]" />
                        </motion.div>
                    </div>

                    {/* Subtitle / Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="max-w-xl text-lg md:text-xl text-slate-600 leading-relaxed mb-12 font-medium"
                    >
                        We engineer <span className="text-indigo-600 bg-indigo-50 px-1 rounded">digital realities</span> that defy gravity.
                        High-velocity web experiences built on weightless, scalable architecture.
                    </motion.p>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-10 relative z-20">

                        {/* Magnetic Button */}
                        <motion.button
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            style={{ x: dx, y: dy }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                            className="relative group h-14 px-8 bg-slate-900 text-white rounded-none flex items-center gap-4 overflow-hidden shadow-xl shadow-indigo-900/10"
                        >
                            <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                            <Link href='/submit-requirements' className="relative z-10 font-mono text-sm tracking-widest uppercase font-bold">Start Engine</Link>
                            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        {/* Side Stats */}
                        <div className="hidden md:flex gap-8 border-l border-slate-200 pl-8">
                            <div>
                                <div className="text-2xl font-bold font-syne text-slate-900">4.0</div>
                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Version</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold font-syne text-slate-900">99+</div>
                                <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">NPS Score</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT SECTOR: Anarva Visual System --- */}
                <div className="hidden lg:block lg:col-span-5 relative h-full w-full flex items-center justify-center perspective-1000">

                    {/* The Grid Layout on the Right */}
                    <div className="relative w-full h-full flex flex-col items-center justify-center">

                        {/* Centered 3D Element (Warehouse) */}
                        <div className="absolute inset-0 z-20 flex items-center justify-center scale-90 lg:scale-100">
                            <Warehouse />
                        </div>

                        {/* Schematic Overlay (Lines & Connectors) - BEHIND the 3D element but in front of background */}
                        <div className="absolute inset-0 z-10 w-full h-full">
                            <HeroSchematic />
                        </div>

                        {/* Floating Tech Grid Elements - Positioned absolutely around the center */}
                        <div className="absolute z-30 w-full h-full pointer-events-none">
                            <div className="absolute top-[10%] right-[10%] lg:right-[0%] w-64">
                                <TechGrid />
                            </div>

                            {/* Additional Floating Element (Bottom Left of Right Sector) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="absolute bottom-[20%] left-[5%] lg:left-[-10%] bg-white/80 backdrop-blur border border-slate-100 p-4 rounded-lg shadow-lg flex flex-col gap-2 max-w-[180px]"
                            >
                                <div className="text-[10px] uppercase tracking-widest text-indigo-500 font-bold">Latency Check</div>
                                <div className="flex items-end gap-1 h-8">
                                    {[30, 50, 40, 70, 50, 80, 40, 60].map((h, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-2 bg-slate-800 rounded-sm"
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 0.5, delay: 1.5 + (i * 0.1) }}
                                        />
                                    ))}
                                </div>
                                <div className="text-xs font-mono text-slate-600">12ms <span className="text-slate-400">avg</span></div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Rail Decor */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-end opacity-10 pointer-events-none z-0 px-6 pb-6">
                {/* <span className="font-mono text-[8rem] lg:text-[12rem] leading-none -mb-8 lg:-mb-12 text-slate-900 tracking-tighter">01</span> */}
                <div className="hidden md:flex items-center gap-12 mb-8 font-mono text-xs">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> SERVER: US-EAST</span>
                    <span>BUILD: v2.4.9</span>
                </div>
            </div>
        </section>
    );
}
