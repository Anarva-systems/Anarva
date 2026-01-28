"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Server, Shield, Globe, Cpu, Wifi } from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 }
    })
};

export default function TechGrid() {
    return (
        <div className="grid grid-cols-2 gap-4 w-full max-w-md pointer-events-none select-none">
            {/* Card 1: System Status */}
            <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="col-span-2 bg-white/50 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-sm flex items-center justify-between"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <div className="text-xs text-slate-500 font-mono">SYSTEM STATUS</div>
                        <div className="text-sm font-bold text-slate-800">OPERATIONAL</div>
                    </div>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-1 h-8 bg-green-500/20 rounded-full overflow-hidden relative">
                            <motion.div
                                animate={{ height: ["30%", "80%", "40%"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                                className="absolute bottom-0 w-full bg-green-500"
                            />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Card 2: Active Nodes */}
            <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white/40 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-sm"
            >
                <div className="flex items-center justify-between mb-2">
                    <Server className="w-4 h-4 text-indigo-500" />
                    <span className="text-[10px] font-mono text-slate-400">NODES</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">842</div>
                <div className="text-[10px] text-green-600 flex items-center gap-1">
                    <MoveUpRightIcon className="w-3 h-3" /> +12%
                </div>
            </motion.div>

            {/* Card 3: Security */}
            <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="bg-white/40 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-sm"
            >
                <div className="flex items-center justify-between mb-2">
                    <Shield className="w-4 h-4 text-indigo-500" />
                    <span className="text-[10px] font-mono text-slate-400">SECURE</span>
                </div>
                <div className="text-2xl font-bold text-slate-800">99.9%</div>
                <div className="h-1 w-full bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full w-[99%] bg-indigo-500 rounded-full" />
                </div>
            </motion.div>

            {/* Card 4: Network Map (Placeholder) */}
            <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                className="col-span-2 bg-indigo-600 text-white p-4 rounded-xl shadow-lg relative overflow-hidden"
            >
                <div className="absolute inset-0 opacity-10">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 flex justify-between items-center">
                    <div>
                        <div className="text-xs text-indigo-200 font-mono mb-1">GLOBAL REACH</div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            <span className="font-bold">24 Regions</span>
                        </div>
                    </div>
                    <div className="h-8 w-8 rounded-full border border-indigo-400 flex items-center justify-center animate-pulse">
                        <Wifi className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>

        </div>
    );
}

function MoveUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M13 5H19V11" />
            <path d="M19 5L5 19" />
        </svg>
    )
}
