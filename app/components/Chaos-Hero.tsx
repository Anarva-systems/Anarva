"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import Chaos from './Chaos';

export default function ChaosHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-[#FAFAFA] text-slate-900 overflow-hidden flex flex-col items-center justify-center">

            {/* --- Fullscreen Visual Layer (Behind/Around) --- */}
            <div className="absolute inset-0 z-0">
                <Chaos />
            </div>

            {/* --- Typography Layer (Floating on top) --- */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center pointer-events-none">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2 mb-6"
                >
                    <span className="px-3 py-1 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                        EST. 2026
                    </span>
                    <span className="px-3 py-1 rounded-full border border-slate-200 bg-white/50 backdrop-blur-md text-[10px] font-mono tracking-widest text-indigo-500 uppercase">
                        AVAILABLE FOR NEW PROJECTS
                    </span>
                </motion.div>

                {/* Massive Headline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[5rem] md:text-[7rem] lg:text-[8rem] font-bold leading-[0.9] tracking-tighter text-slate-900"
                >
                    BUILDING <br />
                    <span className="text-slate-400">THE UNSEEN.</span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-8 max-w-2xl text-xl text-slate-600 font-medium leading-relaxed"
                >
                    We craft high-performance digital ecosystems. <br className="hidden md:block" />
                    From <span className="text-indigo-600 font-semibold">AI Architectures</span> to <span className="text-indigo-600 font-semibold">Web & Mobile Apps</span>, we turn complex logic into weightless experiences.
                </motion.p>

                {/* Services Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-12 flex flex-wrap justify-center gap-3"
                >
                    {['Web Development', 'Mobile Engineering', 'AI & Machine Learning', 'Cloud Systems'].map((service, i) => (
                        <span key={i} className="px-4 py-2 bg-white/80 backdrop-blur-sm shadow-sm border border-slate-100 rounded-lg text-sm font-semibold text-slate-700">
                            {service}
                        </span>
                    ))}
                </motion.div>

            </div>

            {/* Bottom Controls / Decor */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 w-full px-12 flex justify-between items-end pointer-events-auto"
            >
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">System Status: Optimal</span>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">Latency: &lt;12ms</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                        <ArrowDown className="w-4 h-4 animate-bounce" />
                    </div>
                </div>
            </motion.div>

        </section>
    );
}
