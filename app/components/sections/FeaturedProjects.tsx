"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: "Nexus Financial",
        category: "FinTech Core",
        year: "2024",
        impact: "+45% Transaction Speed",
        stack: "Rust / WASM / Next.js",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 2,
        title: "Aether Systems",
        category: "AI Infrastructure",
        year: "2023",
        impact: "2.5M Daily Active Nodes",
        stack: "Go / Kubernetes / Python",
        image: "https://images.unsplash.com/photo-1639322537228-ad713d3a6c01?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 3,
        title: "Luminal Health",
        category: "MedTech Interface",
        year: "2024",
        impact: "HIPAA Compliant / Zero Latency",
        stack: "TypeScript / WebGL / Node",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
    },
    {
        id: 4,
        title: "Vortex Logistics",
        category: "Supply Chain",
        year: "2023",
        impact: "Real-time Fleet Tracking",
        stack: "Elixir / Phoenix / React",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
    },
];

export default function FeaturedProjects() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mouse tracking with Spring physics
    const mouse = {
        x: useMotionValue(0),
        y: useMotionValue(0)
    };

    const smoothMouse = {
        x: useSpring(mouse.x, { stiffness: 150, damping: 20, mass: 0.5 }),
        y: useSpring(mouse.y, { stiffness: 150, damping: 20, mass: 0.5 })
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        mouse.x.set(clientX);
        mouse.y.set(clientY);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            ref={containerRef}
            className="py-32 px-6 relative bg-white overflow-hidden"
        >
            <div className='max-w-[1400px] mx-auto z-10 relative'>
                {/* Header */}
                <div className="mb-24 flex flex-col md:flex-row justify-between items-start
                 border-b border-black/5 pb-8">
                    <div>
                        <h2 className='text-sm font-mono font-bold text-indigo-600 mb-4 tracking-wider uppercase'>
                            // Selected Works
                        </h2>
                        <h1 className='text-5xl md:text-8xl font-medium tracking-tight text-slate-900'>
                            Featured<br />Projects
                        </h1>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-slate-500 font-mono text-xs">
                            ENGINEERING EXCELLENCE<br />
                            EST. 2024
                        </p>
                    </div>
                </div>

                {/* Projects List */}
                <div className="flex flex-col gap-12 md:gap-0">
                    {projects.map((project, index) => (
                        <React.Fragment key={project.id}>
                            {/* Mobile Card View (Visible < lg) */}
                            <div className="block lg:hidden">
                                <ProjectCard project={project} index={index} />
                            </div>

                            {/* Desktop Row View (Visible >= lg) */}
                            <div className="hidden lg:block">
                                <ProjectRow
                                    project={project}
                                    index={index}
                                    setActiveProject={setActiveProject}
                                />
                            </div>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* The Floating Portal */}
            <FloatingPreview
                activeProject={activeProject}
                smoothMouse={smoothMouse}
            />
        </section>
    );
}

// --- DESKTOP COMPONENT ---
const ProjectRow = ({ project, index, setActiveProject }: { project: any, index: number, setActiveProject: (id: number | null) => void }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
            className="group relative flex flex-row items-center justify-between py-12 border-b border-black/5 cursor-none"
        >
            {/* Hover Background */}
            <div className="absolute inset-0 bg-slate-50/0 group-hover:bg-slate-50/50 transition-colors duration-500 -z-10" />

            {/* Left: ID & Title */}
            <div className="flex items-baseline gap-16 w-1/3">
                <span className="font-mono text-sm text-slate-300 group-hover:text-indigo-600 transition-colors duration-300">
                    0{index + 1}
                </span>
                <h3 className="text-5xl font-medium text-slate-800 group-hover:text-black transition-colors duration-300">
                    {project.title}
                </h3>
            </div>

            {/* Middle: Category & Stack (Revealed on hover) */}
            <div className="flex flex-row gap-8 w-1/3 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-sm font-medium text-slate-500">
                    {project.category}
                </span>
                <span className="inline-block w-px h-4 bg-slate-300" />
                <span className="font-mono text-xs text-indigo-600">
                    {project.stack}
                </span>
            </div>

            {/* Right: Impact & Year */}
            <div className="flex items-center justify-end gap-12 w-1/3">
                <div className="flex flex-col items-end opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">Impact</span>
                    <span className="text-sm font-bold text-slate-900">{project.impact}</span>
                </div>
                <span className="font-mono text-sm text-slate-300">
                    {project.year}
                </span>
            </div>
        </motion.div>
    );
};

// --- MOBILE COMPONENT ---
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-sm border border-slate-100"
        >
            {/* Image (Visible on mobile) */}
            <div className="relative aspect-video w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest text-slate-900">
                    {project.year}
                </div>
            </div>

            <div className="p-6 flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
                        {project.category}
                    </span>
                    <h3 className="text-3xl font-medium text-slate-900 leading-tight">
                        {project.title}
                    </h3>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 gap-4 pt-4 border-t border-slate-200/60">
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Tech Stack</span>
                        <span className="text-sm text-slate-600 font-medium">{project.stack}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">Impact</span>
                        <span className="text-sm text-slate-900 font-bold">{project.impact}</span>
                    </div>
                </div>

                {/* Action */}
                <div className="mt-2 flex items-center justify-between text-indigo-600 font-medium text-sm group cursor-pointer">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </div>
        </motion.div>
    );
};

const FloatingPreview = ({ activeProject, smoothMouse }: { activeProject: number | null, smoothMouse: any }) => {
    return (
        <div className="fixed top-0 left-0 pointer-events-none z-50 w-full h-full overflow-hidden hidden lg:block">
            <AnimatePresence>
                {activeProject && (
                    <motion.div
                        style={{ x: smoothMouse.x, y: smoothMouse.y }}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 150, damping: 20 }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[450px] aspect-[4/3] rounded-sm overflow-hidden shadow-2xl"
                    >
                        {/* Image Container with Parallax-like feel */}
                        <div className="relative w-full h-full bg-slate-900">
                            {projects.map((project) => (
                                <motion.img
                                    key={project.id}
                                    src={project.image}
                                    alt={project.title}
                                    initial={{ opacity: 0, scale: 1.2 }}
                                    animate={{
                                        opacity: activeProject === project.id ? 1 : 0,
                                        scale: activeProject === project.id ? 1 : 1.2
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ))}

                            {/* Overlay Badge */}
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">
                                    View Case Study
                                </span>
                                <ArrowUpRight className="w-3 h-3 text-slate-900" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};