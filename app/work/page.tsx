"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const projectShowcase = [
    { id: 1, title: "Novus Bank", category: "Fintech", image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7c1f?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Lumina Store", category: "E-Commerce", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Orbital Control", category: "Aerospace", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop" },
    { id: 4, title: "Velox Custom", category: "Automotive", image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1000&auto=format&fit=crop" },
    { id: 5, title: "Nexus Health", category: "Healthcare", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop" },
];

const CARD_WIDTH = 260; // Slightly wider for project visuals
const STRIDE = CARD_WIDTH + 20;

function ProjectRadialCard({ project, index, scrollX, containerRef }: { project: any, index: number, scrollX: MotionValue<number>, containerRef: React.RefObject<HTMLDivElement | null> }) {
    const position = index * STRIDE;
    const range = [position - STRIDE * 1.5, position, position + STRIDE * 1.5];

    // SCALE: Hero expands DOWNWARD to avoid headline
    const scale = useTransform(scrollX, range, [0.75, 1.25, 0.75]);

    // Y-OFFSET: Steepening the curve to 200px
    const y = useTransform(scrollX, range, [200, 0, 200]);

    const rotateZ = useTransform(scrollX, range, [-20, 0, 20]);
    const opacity = useTransform(scrollX, range, [0.5, 1, 0.5]);
    const zIndex = useTransform(scrollX, range, [1, 50, 1]);

    const handleCenterScroll = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ left: position, behavior: "smooth" });
        }
    };

    return (
        <motion.div
            onClick={handleCenterScroll}
            style={{ y, scale, rotateZ, opacity, zIndex, width: CARD_WIDTH }}
            className="flex-shrink-0 h-[420px] relative snap-center cursor-pointer will-change-transform origin-top"
        >
            <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/5 bg-[#0A0A0A] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col group">
                <div className="flex-1 relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
                </div>

                <div className="p-6 bg-[#0A0A0A] border-t border-white/5">
                    <span className="text-zinc-600 text-[9px] uppercase tracking-[0.3em] font-bold">
                        {project.category}
                    </span>
                    <h3 className="text-white text-lg font-bold tracking-tight mt-1 mb-4">
                        {project.title}
                    </h3>
                    <button className="w-full py-3 rounded-xl bg-white text-black text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95">
                        View Case Study
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ProjectShowcase() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollX } = useScroll({ container: containerRef });

    return (
        <section className="relative w-full min-h-screen bg-[var(--obsidian)] flex flex-col overflow-hidden">

            {/* 1. Adjusted Headline Section */}
            <div className="text-center pt-20 z-0 pointer-events-none relative">
                <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.8] mb-6">
                    Selected <br />
                    <span className="text-zinc-800">projects</span>
                </h1>
                <p className="text-zinc-600 text-[10px] uppercase tracking-[0.5em] mt-4">
                    Curated digital experiences for elite brands
                </p>
            </div>

            {/* 2. Project Carousel Section */}
            <div
                ref={containerRef}
                className="mt-36 flex items-start overflow-x-auto snap-x snap-mandatory px-[50vw] pb-48 [&::-webkit-scrollbar]:hidden"
                style={{
                    paddingLeft: `calc(50vw - ${CARD_WIDTH / 2}px)`,
                    paddingRight: `calc(50vw - ${CARD_WIDTH / 2}px)`,
                    perspective: "1800px"
                }}
            >
                {projectShowcase.map((project, index) => (
                    <ProjectRadialCard
                        key={project.id}
                        index={index}
                        project={project}
                        scrollX={scrollX}
                        containerRef={containerRef}
                    />
                ))}
            </div>
        </section>
    );
}