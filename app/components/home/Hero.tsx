"use client";

import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-center bg-black text-white px-6 md:px-12 py-24 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
            />

            <div className="max-w-7xl mx-auto w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* LEFT: content */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-[12vw] lg:text-[6vw] leading-[0.9] font-bold tracking-tighter mb-8">
                            <span className="block text-zinc-500">We build</span>
                            <span className="block text-white">digital reality.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-md mb-10">
                            ANARVA is a digital architecture studio. We craft high-performance websites, applications, and brand identities for the future.
                        </p>

                        <div className="flex gap-4">
                            <Link href="/contact" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors inline-block text-center min-w-[160px]">
                                Start a Project
                            </Link>
                            <Link href="/work" className="border border-white/20 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-2 min-w-[160px]">
                                <Play className="w-3 h-3 fill-current" /> Showreel
                            </Link>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT: Video */}
                <motion.div
                    className="relative w-full aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                >
                    {/* Placeholder Video / Image */}
                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                        <span className="text-zinc-700 font-mono text-sm uppercase tracking-widest">Introduction Video</span>
                    </div>
                    {/* 
                     Uncomment and replace 'src' when you have the video file.
                     <video 
                        src="/hero-video.mp4" 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                     />
                     */}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <span>Scroll to explore</span>
                <ArrowDown className="w-4 h-4 animate-bounce text-white/50" />
            </motion.div>
        </section>
    );
}
