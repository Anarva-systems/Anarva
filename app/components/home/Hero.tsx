"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* =============================================
   CYCLING WORDS for "Designed to Mean ___"
   ============================================= */
const CYCLING_WORDS = ["more.", "everything.", "impact.", "growth.", "momentum."];

/* =============================================
   ANIMATION VARIANTS
   ============================================= */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* =============================================
   HERO COMPONENT
   ============================================= */
export default function Hero() {
    const [wordIndex, setWordIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0a0a0f] px-6 md:px-12 lg:px-16 pt-28 pb-16">
            {/* ── Background Video Layer (Hero.mp4) ── */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                >
                    <source src="/Hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 z-[1] bg-black/50" />
            </div>

            {/* ── Main Content Container ── */}
            <div className="relative z-10 max-w-[1400px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* ── LEFT COLUMN: Title, Description, Two CTAs ── */}
                    <div className="lg:col-span-8 flex flex-col gap-6">

                        {/* Hero Section Title */}
                        <motion.h1
                            className="flex flex-col text-[clamp(2.5rem,6vw,5.2rem)] leading-[1.02] tracking-tight"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.1}
                        >
                            <span className="font-light text-white/90">
                                Designed to
                            </span>
                            <span className="font-black flex flex-wrap items-baseline gap-x-3.5">
                                <span className="text-white">Mean</span>
                                <span className="relative inline-flex items-baseline overflow-hidden py-1 align-baseline">
                                    <AnimatePresence mode="wait">
                                        <motion.span
                                            key={wordIndex}
                                            className="inline-block whitespace-nowrap font-black text-zinc-400"
                                            initial={{ y: "110%", opacity: 0 }}
                                            animate={{ y: "0%", opacity: 1 }}
                                            exit={{ y: "-110%", opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            {CYCLING_WORDS[wordIndex]}
                                        </motion.span>
                                    </AnimatePresence>
                                </span>
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            className="text-sm md:text-base text-zinc-300/80 font-light leading-relaxed max-w-lg"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.2}
                        >
                            Built for designers, agencies, and creatives who want to showcase
                            their best work, make a strong first impression, and create real
                            impact without bloated workflows.
                        </motion.p>

                        {/* Two CTAs */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4 pt-2"
                            variants={fadeUp}
                            initial="hidden"
                            animate="visible"
                            custom={0.3}
                        >
                            <Link
                                href="/contact"
                                className="px-7 py-3.5 bg-white text-black text-sm md:text-base font-bold flex items-center gap-2.5 transition-all hover:bg-zinc-200 active:scale-95 group shadow-[4px_4px_0px_rgba(255,255,255,0.15)] hover:shadow-none"
                            >
                                <span>Book a call</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/work"
                                className="px-7 py-3.5 border border-white/20 text-white hover:border-white text-sm md:text-base font-medium transition-all hover:bg-white/[0.05] active:scale-95"
                            >
                                View Work
                            </Link>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN: EST. 2025 Box ── */}
                    <motion.div
                        className="lg:col-span-4 flex lg:justify-end items-center"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.25}
                    >
                        <div className="flex items-stretch border border-white/12 w-full max-w-xs bg-white/[0.02] backdrop-blur-sm">
                            <div className="flex flex-col items-center justify-center gap-1 px-5 py-3.5 border-r border-white/12">
                                <svg className="w-5 h-5 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z" />
                                </svg>
                                <span className="text-white text-[10px] font-bold tracking-wider">EST. 2025</span>
                            </div>
                            <div className="flex items-center px-4 py-3.5">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 leading-relaxed">
                                    5+ Years shaping
                                    <br />
                                    digital direction.
                                </span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
