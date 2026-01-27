"use client";

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, X, Globe, Fingerprint, Command } from "lucide-react";
import Image from 'next/image';

interface FounderModalProps {
    isOpen: boolean;
    onClose: () => void;
}
const SOCIAL_LINKS = [
    {
        name: "GitHub",
        Icon: Github,
        href: "https://github.com/AshapuMohan",
        label: "View open source projects"
    },
    {
        name: "LinkedIn",
        Icon: Linkedin,
        href: "https://www.linkedin.com/in/mohan-ashapu-724aba258/",
        label: "Connect on LinkedIn"
    },
    {
        name: "Twitter",
        Icon: Twitter,
        href: "https://x.com/MohanAshapu",
        label: "Follow for updates"
    },
    {
        name: "Website",
        Icon: Globe,
        href: "https://mohanashapu.onrender.com/",
        label: "Visit official site"
    },
];
export default function FounderModal({ isOpen, onClose }: FounderModalProps) {

    // Close on Escape logic remains for UX
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
                    {/* Backdrop: Solid black with high blur for maximum focus */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    />

                    {/* Modal Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        className="relative w-full max-w-[380px] group"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Material: Dark Glass with Beveled Edge */}
                        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.08] bg-black shadow-2xl">

                            {/* Subtle Texture: Engineering Grid */}
                            <div
                                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                            />

                            {/* Accent: A single sharp indigo glow in the corner */}
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700" />

                            <div className="relative p-8 flex flex-col">

                                {/* Top Bar: Functional Metadata */}
                                <div className="flex justify-between items-center mb-12">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-tighter">Status</span>
                                        <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold tracking-widest flex items-center gap-1.5">
                                            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" /> Verified
                                        </span>
                                    </div>
                                    <Command className="w-4 h-4 text-zinc-700" />
                                </div>

                                {/* Identity Section */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="relative shrink-0">
                                        <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center overflow-hidden">
                                            {/* Placeholder for high-res headshot */}
                                            <Image src="/Mohan.jpg" alt='Founder' width={100} height={100} />
                                            {/* <span className="text-2xl font-bold text-white font-syne">M</span> */}
                                        </div>
                                        {/* Pro Badge */}
                                        <div className="absolute -bottom-2 -right-2 bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                            Founder
                                        </div>
                                    </div>

                                    <div className="flex flex-col">
                                        <h2 className="text-2xl font-bold text-white tracking-tight leading-none mb-1">Mohan</h2>
                                        <p className="text-zinc-500 text-xs font-mono tracking-tight uppercase">Founder / Architect</p>
                                    </div>
                                </div>

                                {/* Bio: Clean Typography */}
                                <div className="mb-8">
                                    <p className="text-zinc-400 text-xs leading-relaxed font-medium">
                                        Building high-velocity infrastructure for the next generation of web experiences.
                                    </p>
                                </div>

                                {/* Actions: High contrast monochrome */}
                                <div className="grid grid-cols-4 gap-2">
                                    {SOCIAL_LINKS.map(({ Icon, href, name, label }) => (
                                        <motion.a
                                            key={name}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label} // Critical for accessibility (screen readers)
                                            whileHover={{
                                                backgroundColor: "rgba(255,255,255,0.05)",
                                                borderColor: "rgba(255,255,255,0.2)",
                                                y: -2 // Subtle senior-level micro-interaction
                                            }}
                                            whileTap={{ scale: 0.95 }} // Feedback for clicks
                                            className="h-11 flex items-center justify-center rounded-xl bg-zinc-900/50 border border-white/[0.05] text-zinc-400 hover:text-white transition-all duration-200"
                                        >
                                            <Icon size={18} strokeWidth={1.5} />
                                        </motion.a>
                                    ))}
                                </div>

                                {/* Footer: System ID */}
                                <div className="mt-10 pt-6 border-t border-white/[0.05] flex justify-between items-center">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">ID: 7989-9097-56</span>
                                    <button
                                        onClick={onClose}
                                        className="text-[10px] font-bold text-zinc-400 hover:text-white transition-colors"
                                    >
                                        [ ESC ]
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}