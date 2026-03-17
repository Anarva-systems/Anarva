"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Layers, Zap, Calendar, User } from "lucide-react";

interface Project {
    id: number;
    title: string;
    label: string;
    color: string;
    bg: string;
    year?: string;
    role?: string;
    description?: string;
    techStack?: string[];
    features?: string[];
    gradient?: string;
}

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

// Stagger children animations
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
} as const;

const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { type: "spring" as const, stiffness: 100, damping: 20 },
    },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring" as const, stiffness: 80, damping: 18 },
    },
};

export default function ProjectDetail({ project, onClose }: ProjectDetailProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [project]);

    // Close on Escape
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose]);

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto"
                    onClick={onClose}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
                    />

                    {/* Ambient glow from project gradient */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.15, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br ${project.gradient || "from-blue-500 to-cyan-400"} blur-[150px] pointer-events-none`}
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 70, damping: 18, delay: 0.1 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative z-10 w-full max-w-6xl mx-4 my-8 md:my-16"
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ opacity: 0, scale: 0, rotate: -90 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                            onClick={onClose}
                            className="fixed top-6 right-6 md:top-8 md:right-8 z-50 p-3 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-300 group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        </motion.button>

                        {/* ===== HERO VIDEO SECTION ===== */}
                        <motion.div
                            variants={scaleIn}
                            initial="hidden"
                            animate="visible"
                            className="relative w-full aspect-video rounded-[2rem] overflow-hidden mb-10 group"
                            itemScope
                            itemType="https://schema.org/VideoObject"
                        >
                            <meta itemProp="name" content={`${project.title} Case Study`} />
                            <meta itemProp="description" content={`Case study video for the ${project.title} project by Anarva.`} />
                            <meta itemProp="thumbnailUrl" content={`https://www.anarva.online${project.bg}`} />
                            <meta itemProp="contentUrl" content={`https://www.anarva.online${project.bg}`} />
                            <meta itemProp="uploadDate" content={project.year ? `${project.year}-01-01T08:00:00+08:00` : "2024-01-01T08:00:00+08:00"} />

                            {/* Video */}
                            <video
                                src={project.bg}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover"
                            />

                            {/* Gradient overlay at bottom */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                            {/* Bottom labels on video */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex items-end justify-between">
                                <div>
                                    <motion.span
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-gradient-to-r ${project.gradient || "from-blue-500 to-cyan-400"} text-white mb-4`}
                                    >
                                        {project.label}
                                    </motion.span>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none"
                                    >
                                        {project.title}
                                    </motion.h1>
                                </div>
                            </div>
                        </motion.div>

                        {/* ===== INFO GRID ===== */}
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10"
                        >
                            {/* Description — spans 2 cols */}
                            <motion.div
                                variants={itemVariants}
                                className="lg:col-span-2 p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${project.gradient || "from-blue-500 to-cyan-400"} flex items-center justify-center`}>
                                        <Layers size={16} className="text-white" />
                                    </div>
                                    <h2 className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase">About the Project</h2>
                                </div>
                                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </motion.div>

                            {/* Meta info card */}
                            <motion.div
                                variants={itemVariants}
                                className="p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl flex flex-col gap-8"
                            >
                                <div>
                                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                                        <Calendar size={12} />
                                        Year
                                    </div>
                                    <p className="text-white text-2xl font-black tracking-tight">{project.year}</p>
                                </div>
                                <div className="w-full h-px bg-white/[0.06]" />
                                <div>
                                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                                        <User size={12} />
                                        Role
                                    </div>
                                    <p className="text-white text-lg font-semibold">{project.role}</p>
                                </div>
                                <div className="w-full h-px bg-white/[0.06]" />
                                <div>
                                    <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                                        <Zap size={12} />
                                        Category
                                    </div>
                                    <p className={`text-transparent bg-clip-text bg-gradient-to-r ${project.gradient || "from-blue-500 to-cyan-400"} text-lg font-bold`}>
                                        {project.label}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* ===== TECH STACK ===== */}
                        {project.techStack && project.techStack.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="mb-10 p-8 md:p-10 rounded-[2rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl"
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-6"
                                >
                                    Tech Stack
                                </motion.h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.techStack.map((tech, i) => (
                                        <motion.span
                                            key={tech}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.08, y: -2 }}
                                            className="relative px-5 py-2.5 rounded-full text-sm font-medium text-white/80 bg-white/[0.04] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.08] transition-all duration-300 cursor-default group"
                                        >
                                            {/* Subtle glow on hover */}
                                            <span className={`absolute inset-0 rounded-full bg-gradient-to-r ${project.gradient || "from-blue-500 to-cyan-400"} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`} />
                                            <span className="relative">{tech}</span>
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ===== FEATURES GRID ===== */}
                        {project.features && project.features.length > 0 && (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="mb-10"
                            >
                                <motion.h3
                                    variants={itemVariants}
                                    className="text-white/40 text-xs font-bold tracking-[0.2em] uppercase mb-6 px-2"
                                >
                                    Key Features
                                </motion.h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {project.features.map((feature, i) => (
                                        <motion.div
                                            key={i}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02, x: 4 }}
                                            className="relative p-6 md:p-7 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl group hover:border-white/10 transition-all duration-500 overflow-hidden"
                                        >
                                            {/* Number label */}
                                            <span className={`absolute top-6 right-6 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${project.gradient || "from-blue-500 to-cyan-400"} opacity-10 group-hover:opacity-20 transition-opacity select-none`}>
                                                {String(i + 1).padStart(2, "0")}
                                            </span>

                                            {/* Animated border glow on hover */}
                                            <div className={`absolute inset-0 rounded-[1.5rem] bg-gradient-to-r ${project.gradient || "from-blue-500 to-cyan-400"} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500`} />

                                            <div className="relative flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gradient-to-r ${project.gradient || "from-blue-500 to-cyan-400"}`} />
                                                <p className="text-white/70 text-sm md:text-base font-light leading-relaxed group-hover:text-white/90 transition-colors">
                                                    {feature}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* ===== BOTTOM CTA ===== */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pb-8"
                        >
                            <button
                                onClick={onClose}
                                className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium tracking-wide"
                            >
                                ← Back to Portfolio
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
