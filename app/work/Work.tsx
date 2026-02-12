"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
    { id: 1, title: "EduMatrix", label: "EDTECH", color: "from-blue-600", bg: "https://images.unsplash.com/photo-1501504905953-f87550b1111a?q=80&w=2000" },
    { id: 2, title: "VehicleAid", label: "LOGISTICS", color: "from-red-600", bg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000" },
    { id: 3, title: "eCard", label: "DIGITAL", color: "from-purple-600", bg: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000" },
    { id: 4, title: "Project 4", label: "UI/UX", color: "from-yellow-600", bg: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000" },
    { id: 5, title: "Project 5", label: "MERN", color: "from-green-600", bg: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000" },
];

export default function PortfolioSection() {
    const [index, setIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const lastScrollTime = useRef(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const wrap = (idx: number) => ((idx % projects.length) + projects.length) % projects.length;
    const activeIdx = wrap(index);

    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        if (now - lastScrollTime.current < 300) return;
        if (Math.abs(e.deltaY) > 5) {
            setIndex(prev => (e.deltaY > 0 ? prev + 1 : prev - 1));
            lastScrollTime.current = now;
        }
    };

    return (
        <div
            onWheel={handleWheel}
            className="relative h-screen w-full bg-[#020205] overflow-hidden flex flex-col items-center justify-between py-10 touch-none select-none"
        >
            {/* 1. DYNAMIC BACKGROUND */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.25 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at center, transparent, #020205), url(${projects[activeIdx].bg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(80px)'
                    }}
                />
            </AnimatePresence>

            {/* 2. HEADER */}
            <header className="relative z-50 text-center space-y-2">
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase"
                >
                    Portfolio
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white text-4xl md:text-6xl font-black tracking-tighter italic"
                >
                    OUR WORK
                </motion.h1>
            </header>

            {/* 3. THE ARC (MAIN CONTENT) */}
            <div className="relative w-full flex-1 flex items-center justify-center">
                {projects.map((_, i) => {
                    let relativeIndex = i - activeIdx;
                    if (relativeIndex > 2) relativeIndex -= projects.length;
                    if (relativeIndex < -2) relativeIndex += projects.length;

                    const isActive = relativeIndex === 0;
                    const xFactor = isMobile ? 160 : 340;
                    const yFactor = isMobile ? 25 : 55;
                    const rotationFactor = isMobile ? 18 : 28;

                    return (
                        <motion.div
                            key={projects[i].id}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            onDragEnd={(_, info) => {
                                if (info.offset.x > 50) setIndex(prev => prev - 1);
                                if (info.offset.x < -50) setIndex(prev => prev + 1);
                            }}
                            animate={{
                                x: relativeIndex * xFactor,
                                y: Math.pow(Math.abs(relativeIndex), 2) * yFactor,
                                rotate: relativeIndex * rotationFactor,
                                opacity: isMobile && Math.abs(relativeIndex) > 1 ? 0 : 1 - Math.abs(relativeIndex) * 0.25,
                                scale: isActive ? 1.05 : 0.8,
                                zIndex: isActive ? 50 : 20 - Math.abs(relativeIndex),
                            }}
                            transition={{ type: "spring", stiffness: 180, damping: 25 }}
                            onClick={() => setIndex(i)}
                            className={`absolute ${isMobile ? 'w-[260px] h-[380px]' : 'w-[340px] h-[480px]'} bg-[#0c0c14]/90 border border-white/10 rounded-[3rem] p-8 backdrop-blur-3xl cursor-grab active:cursor-grabbing flex flex-col`}
                        >
                            <div className={`w-full h-40 md:h-44 rounded-[2rem] bg-gradient-to-br ${projects[i].color} to-transparent opacity-40 mb-8 overflow-hidden`}>
                                <img src={projects[i].bg} alt="" className="w-full h-full object-cover mix-blend-overlay" />
                            </div>
                            <p className="text-blue-500 text-[10px] font-black tracking-[0.2em] uppercase mb-1">{projects[i].label}</p>
                            <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-auto leading-none">{projects[i].title}</h3>
                            <div className="mt-4 flex items-center gap-2 text-slate-500 text-xs font-medium uppercase tracking-widest">
                                view project <span>→</span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 4. FOOTER CONTROLS & PROGRESS */}
            <footer className="relative z-50 w-full px-6 md:px-20 flex flex-col items-center gap-8">
                {/* Progress Dots */}
                <div className="flex gap-3">
                    {projects.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 transition-all duration-500 rounded-full ${activeIdx === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>

                <div className="w-full flex justify-between items-center">
                    <button onClick={() => setIndex(index - 1)} className="p-4 rounded-full border border-white/5 bg-white/5 text-white hover:bg-white/10 active:scale-90 transition-all">
                        <ChevronLeft size={24} />
                    </button>

                    <div className="hidden md:block text-white/20 font-mono text-[9px] tracking-[1.2em] uppercase">
                        Scroll • Swipe • Loop
                    </div>

                    <button onClick={() => setIndex(index + 1)} className="p-4 rounded-full border border-white/5 bg-white/5 text-white hover:bg-white/10 active:scale-90 transition-all">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </footer>
        </div>
    );
}