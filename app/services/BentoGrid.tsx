"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-10 bg-white">
            {/* Large Featured Card */}
            <div className="md:col-span-2 h-[400px] relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 p-8 group">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold">Industrial Engineering</h3>
                    <p className="text-slate-500 mt-2 max-w-xs">High-performance code meet aesthetic purity.</p>
                </div>
                {/* Animated Background Element */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-100/50 rounded-full blur-3xl"
                />
            </div>

            {/* Interactive Statistic Card */}
            <div className="h-[400px] rounded-3xl bg-slate-900 p-8 text-white flex flex-col justify-between hover:bg-slate-800 transition-colors cursor-pointer">
                <span className="text-5xl font-light italic">99%</span>
                <p className="text-slate-400 uppercase tracking-widest text-xs">Client Satisfaction</p>
            </div>
        </div>
    );
}