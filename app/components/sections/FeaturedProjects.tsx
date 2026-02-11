"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const projects = [
    {
        id: 1,
        title: "Nexus Financial",
        category: "FinTech • Web3",
        year: "2024",
        description: "Revolutionary DeFi platform with real-time trading analytics",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1200",
        color: "#00d4ff",
    },
    {
        id: 2,
        title: "After Systems",
        category: "Enterprise • AI",
        year: "2024",
        description: "AI-powered workflow automation for Fortune 500 companies",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        color: "#7b00ff",
    },
    {
        id: 3,
        title: "Luminal Health",
        category: "Healthcare • Mobile",
        year: "2023",
        description: "Telehealth platform serving 1M+ patients worldwide",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&q=80&w=1200",
        color: "#a855f7",
    },
    {
        id: 4,
        title: "Vartex Logistics",
        category: "Logistics • IoT",
        year: "2023",
        description: "Real-time fleet management with predictive routing",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
        color: "#00d4ff",
    },
];

export default function FeaturedProjects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cosmic-deep/50 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6">
                {/* Section header */}
                <motion.div
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                            Featured <span className="text-gradient-cosmic">Work</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            Transforming visions into digital realities for industry leaders.
                        </p>
                    </div>
                    <a
                        href="/work"
                        className="flex items-center gap-2 text-cosmic-blue hover:text-white transition-colors group"
                        data-hoverable
                    >
                        View All Projects
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                </motion.div>

                {/* Projects grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            className="group relative"
                        >
                            <a
                                href={`/work/${project.id}`}
                                className="block relative rounded-3xl overflow-hidden aspect-[4/3]"
                                data-hoverable
                            >
                                {/* Image */}
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Overlay gradient */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"
                                />

                                {/* Comet glow effect on hover */}
                                <AnimatePresence>
                                    {hoveredId === project.id && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 100 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute inset-0 pointer-events-none"
                                            style={{
                                                background: `linear-gradient(135deg, ${project.color}20 0%, transparent 50%)`,
                                            }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Content */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    {/* Category & Year */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <span
                                            className="text-xs font-medium tracking-wider uppercase px-3 py-1 rounded-full"
                                            style={{
                                                background: `${project.color}20`,
                                                color: project.color,
                                            }}
                                        >
                                            {project.category}
                                        </span>
                                        <span className="text-gray-500 text-sm">{project.year}</span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-cosmic-blue transition-colors duration-300">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm max-w-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {project.description}
                                    </p>

                                    {/* Arrow indicator */}
                                    <motion.div
                                        className="absolute bottom-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                                        style={{
                                            boxShadow: hoveredId === project.id ? `0 0 30px ${project.color}50` : "none",
                                        }}
                                        animate={hoveredId === project.id ? { scale: [1, 1.1, 1] } : {}}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        <ArrowUpRight className="w-5 h-5" />
                                    </motion.div>
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}