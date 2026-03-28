"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Crosshair from "../ui/Crosshair";
import KineticSectionTitle from "../ui/KineticSectionTitle";
import { ExternalLink } from "lucide-react";

const PROJECTS = [
    {
        title: "AURUM — Restaurant",
        category: "Restaurant Management System",
        video: "/Work/Food.mp4",
        thumbnail: "/images/Food.png",
        id: "01",
        url: "https://aurum-restaurants.vercel.app/"
    },
    {
        title: "GYMFLOW — FITNESS",
        category: "FITNESS APP",
        video: "/Work/gymflow.mp4",
        thumbnail: "/images/gymflow.png",
        id: "02",
        url: "https://gymflow-swart.vercel.app/"
    },
    {
        title: "ELEVATE — salon",
        category: "SALON MANAGEMENT SYSTEM",
        video: "/Work/salon.mp4",
        thumbnail: "/images/salon.png",
        id: "03",
        url: "https://elevate-salon.vercel.app/"
    },
    {
        title: "VENDORSYNC",
        category: "INTELLIGENCE GRID",
        video: "/Work/Vendorsync.mp4",
        thumbnail: "/images/Vendorsync.png",
        id: "04",
        url: "#" // Link not provided for 4th project
    },
];

// Individual card — manages its own hover/video state
function ProjectCard({ project, idx }: { project: typeof PROJECTS[0]; idx: number }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(ref, { once: true, margin: "200px" });

    const [isHovered, setIsHovered] = useState(false);
    const [videoReady, setVideoReady] = useState(false);
    // Once the user first hovers, we mount the video element permanently
    const [videoMounted, setVideoMounted] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        if (!videoMounted) setVideoMounted(true);
        // Give the video a tick to mount, then play
        setTimeout(() => {
            videoRef.current?.play().catch(() => { });
        }, 50);
    }, [videoMounted]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
        setVideoReady(false);
    }, []);

    return (
        <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            ref={ref}
            className="group relative cursor-pointer block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Media Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-[#080808] border border-white/5 mb-6 transition-all duration-500 group-hover:border-white/20">
                <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Crosshair className="bottom-0 right-0 translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[2] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />

                {/* Schema.org VideoObject metadata */}
                <div itemScope itemType="https://schema.org/VideoObject" className="w-full h-full">
                    <meta itemProp="name" content={`${project.title} Demonstration`} />
                    <meta itemProp="description" content={`Video showcasing the ${project.title} project by Anarva.`} />
                    <meta itemProp="thumbnailUrl" content={`https://www.anarva.online${project.thumbnail}`} />
                    <meta itemProp="contentUrl" content={`https://www.anarva.online${project.video}`} />
                    <meta itemProp="uploadDate" content="2024-01-01T08:00:00+08:00" />

                    {/* Static thumbnail — always visible, fades out when video is ready */}
                    {isInView && (
                        <Image
                            src={project.thumbnail}
                            alt={project.title}
                            fill
                            className={`object-cover transition-all duration-700 ease-out scale-105 group-hover:scale-100
                                ${isHovered && videoReady
                                    ? "opacity-0 grayscale-0"
                                    : "opacity-60 grayscale group-hover:opacity-80"
                                }`}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority={idx < 2}
                        />
                    )}

                    {/* Video — mounted on first hover, fades in when ready */}
                    {videoMounted && (
                        <video
                            ref={videoRef}
                            src={project.video}
                            loop
                            muted
                            playsInline
                            preload="none"
                            onCanPlay={() => setVideoReady(true)}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out
                                ${isHovered && videoReady ? "opacity-100" : "opacity-0"}`}
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
        </motion.a>
    );
}

export default function WorkGrid() {
    return (
        <section className="w-full py-24 md:py-32 px-4 md:px-12 bg-black text-white border-t border-white/5 relative">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="max-w-[1400px] mx-auto mb-20 flex items-end justify-between relative z-10">
                <div>
                    <span className="text-xs font-mono text-zinc-500 tracking-widest block mb-8">/// SELECTED WORKS</span>
                    <KineticSectionTitle title="SYSTEM DEPLOYMENTS" className="text-4xl md:text-6xl font-light tracking-[-0.02em] text-white" />
                </div>
                <Link href="/work" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors group">
                    <span className="w-8 h-[1px] bg-zinc-700 group-hover:bg-white transition-colors" />
                    Full Index
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-16 max-w-[1400px] mx-auto relative z-10">
                {PROJECTS.map((project, idx) => (
                    <ProjectCard key={idx} project={project} idx={idx} />
                ))}
            </div>

            <div className="mt-16 md:hidden text-center">
                <Link href="/work" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors border-b border-white/20 pb-1">
                    View Complete Index
                </Link>
            </div>
        </section>
    );
}
