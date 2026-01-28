"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSchematic() {
    return (
        <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">

                {/* DEFS for markers */}
                <defs>
                    <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4">
                        <circle cx="5" cy="5" r="5" fill="#6366f1" />
                    </marker>
                </defs>

                {/* --- CONNECTION 1: Tech Grid (Top Right) to Center --- */}
                {/* Starting near TechGrid (approx 80% x, 20% y) to Center (50%, 50%) */}
                <motion.path
                    d="M 650,150 L 600,150 L 500,250"
                    fill="none"
                    stroke="url(#gradient-line)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                />
                <circle cx="650" cy="150" r="3" className="fill-indigo-500 animate-pulse" />
                <circle cx="500" cy="250" r="2" className="fill-indigo-300" />

                {/* --- CONNECTION 2: Latency Widget (Bottom Left) to Center --- */}
                {/* Approx 20% x, 80% y to Center */}
                <motion.path
                    d="M 150,450 L 200,450 L 300,350"
                    fill="none"
                    stroke="url(#gradient-line)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.4 }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                />
                <circle cx="150" cy="450" r="3" className="fill-indigo-500 animate-pulse" />

                {/* --- HUD ELEMENTS --- */}

                {/* Center Target Bracket */}
                <motion.g
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.2 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    {/* Top Left Corner */}
                    <path d="M 350,250 L 350,220 L 380,220" fill="none" stroke="#64748b" strokeWidth="1" />
                    {/* Top Right Corner */}
                    <path d="M 450,250 L 450,220 L 420,220" fill="none" stroke="#64748b" strokeWidth="1" />
                    {/* Bottom Left Corner */}
                    <path d="M 350,350 L 350,380 L 380,380" fill="none" stroke="#64748b" strokeWidth="1" />
                    {/* Bottom Right Corner */}
                    <path d="M 450,350 L 450,380 L 420,380" fill="none" stroke="#64748b" strokeWidth="1" />
                </motion.g>

                {/* Gradient Def */}
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                    <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                </linearGradient>

            </svg>
        </div>
    );
}
