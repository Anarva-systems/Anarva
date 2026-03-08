"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import Crosshair from "../ui/Crosshair";
import KineticSectionTitle from "../ui/KineticSectionTitle";

const PROJECTS = [
    {
        title: "REFINO — AI ARCHITECT",
        category: "GEN-AI PLATFORM",
        image: "/Work/Refino.mp4",
        id: "01"
    },
    {
        title: "DERIVERSE — ANALYTICS",
        category: "FINTECH INFRASTRUCTURE",
        image: "/Work/DeriverseTradingAnalytics.mp4",
        id: "02"
    },
    {
        title: "CYBERSENTINEL",
        category: "SECURITY PROTOCOLS",
        image: "/Work/CyberSentinel.ai.mp4",
        id: "03"
    },
    {
        title: "VENDORSYNC",
        category: "INTELLIGENCE GRID",
        image: "/Work/Vendorsync.mp4",
        id: "04"
    }
];

export default function WorkGrid() {
    return (
        <section className="w-full py-24 md:py-32 px-4 md:px-12 bg-black text-white border-t border-white/5 relative">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="max-w-[1400px] mx-auto mb-20 flex items-end justify-between relative z-10">
                <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-widest block mb-4">/// SELECTED WORKS</span>
                    <KineticSectionTitle title="SYSTEM DEPLOYMENTS" className="text-4xl md:text-6xl font-light tracking-[-0.02em] text-white" />
                </div>
                <Link href="/work" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group">
                    <span className="w-8 h-[1px] bg-zinc-700 group-hover:bg-white transition-colors" />
                    Full Index
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 max-w-[1400px] mx-auto relative z-10">
                {PROJECTS.map((project, idx) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const ref = useRef(null);
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const isInView = useInView(ref, { once: true, margin: "200px" });

                    return (
                        <motion.div
                            key={idx}
                            ref={ref}
                            className="group relative cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            {/* Image Container - Carbon Frame */}
                            <div className="relative aspect-video w-full overflow-hidden bg-[#080808] border border-white/5 mb-6 transition-all duration-500 group-hover:border-white/20">
                                <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Scanline Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                                {/* Schema.org VideoObject Wrapper */}
                                <div itemScope itemType="https://schema.org/VideoObject" className="w-full h-full">
                                    <meta itemProp="name" content={`${project.title} Demonstration`} />
                                    <meta itemProp="description" content={`Video showcasing the ${project.title} project by Anarva.`} />
                                    <meta itemProp="thumbnailUrl" content={`https://www.anarva.online${project.image}`} />
                                    <meta itemProp="contentUrl" content={`https://www.anarva.online${project.image}`} />
                                    <meta itemProp="uploadDate" content="2024-01-01T08:00:00+08:00" />
                                    {isInView && (
                                        <video
                                            src={project.image}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="metadata"
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-100"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Technical Metadata */}
                            <div className="flex justify-between items-start border-t border-white/10 pt-4">
                                <div>
                                    <h3 className="text-lg md:text-xl font-light tracking-wide text-white group-hover:text-white transition-colors">
                                        <span className="text-xs font-mono text-zinc-600 mr-3 align-middle">{project.id}</span>
                                        {project.title}
                                    </h3>
                                </div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border border-white/10 px-2 py-1">
                                    {project.category}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="mt-16 md:hidden text-center">
                <Link href="/work" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border-b border-white/20 pb-1">
                    View Complete Index
                </Link>
            </div>
        </section>
    );
}
