"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    {
        id: 1,
        title: "Novus Bank",
        category: "Fintech",
        description: "Reimagining the digital banking experience for the next generation.",
        imageColor: "bg-indigo-900",
        year: "2024"
    },
    {
        id: 2,
        title: "Lumina Fashion",
        category: "E-Commerce",
        description: "A high-conversion headless storefront built with Next.js.",
        imageColor: "bg-slate-900",
        year: "2023"
    },
    {
        id: 3,
        title: "Orbital Space",
        category: "Aerospace",
        description: "Mission control dashboard interface for private spaceflight tracking.",
        imageColor: "bg-cyan-900",
        year: "2024"
    },
    {
        id: 4,
        title: "Velox Motors",
        category: "Automotive",
        description: "Immersive 3D configurator for electric vehicle customization.",
        imageColor: "bg-orange-900",
        year: "2023"
    },
    {
        id: 5,
        title: "Nexus Health",
        category: "Healthcare",
        description: "Patient portal with real-time appointment scheduling and telemedicine.",
        imageColor: "bg-emerald-900",
        year: "2024"
    },
    {
        id: 6,
        title: "Ark Architects",
        category: "Portfolio",
        description: "Minimalist portfolio for an award-winning architectural firm.",
        imageColor: "bg-zinc-700",
        year: "2023"
    }
];

const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

export default function ProjectsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(project => project.category === activeCategory);

    return (
        <main className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-[1400px]">
                {/* Header Section */}
                <div className="mb-20 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-black/5 pb-8">
                        <div>
                            <h2 className="text-sm font-mono font-bold text-indigo-600 mb-4 tracking-wider uppercase">
                                // Portfolio
                            </h2>
                            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-slate-900">
                                Selected Works
                            </h1>
                        </div>
                        <p className="text-slate-500 text-lg max-w-sm text-right hidden md:block">
                            Digital products that define<br />industry standards.
                        </p>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`
                                    relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors
                                    ${activeCategory === category ? "text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}
                                `}
                            >
                                {activeCategory === category && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 bg-slate-900 rounded-full"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{category}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                data-cursor-text="VIEW"
                                className="group relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden cursor-pointer"
                            >
                                {/* Image Placeholder / Background */}
                                <div className={`absolute inset-0 ${project.imageColor} transition-transform duration-700 group-hover:scale-105`} />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                                            {project.year}
                                        </span>

                                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 block">
                                            {project.category}
                                        </span>
                                        <h3 className="text-3xl font-medium text-white mb-3">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-300 text-sm line-clamp-2 max-w-[90%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Footer CTA */}
                <div className="mt-32 flex flex-col items-center justify-center text-center">
                    <h2 className="text-3xl font-light text-slate-900 mb-8">
                        Have a project in mind?
                    </h2>
                    <Link
                        href="/submit-requirements"
                        className="group relative inline-flex items-center gap-4 px-8 py-4 bg-slate-900 text-white rounded-full overflow-hidden"
                    >
                        <span className="relative z-10 font-medium">Start Your Project</span>
                        <ArrowUpRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <div className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
