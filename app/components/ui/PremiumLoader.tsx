"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumLoader({
    onComplete
}: {
    onComplete?: () => void;
}) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Deterministic progress increment
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30); // 30ms * 100 = 3s total

        return () => clearInterval(interval);
    }, []);

    // Handle completion
    useEffect(() => {
        if (progress === 100) {
            // Wait for exit animation (approx 0.8s) then call onComplete
            const timeout = setTimeout(() => {
                if (onComplete) onComplete();
            }, 800);
            return () => clearTimeout(timeout);
        }
    }, [progress, onComplete]);

    return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none">
            <AnimatePresence>
                {progress < 100 ? (
                    <motion.div
                        key="loader"
                        className="relative flex flex-col items-center justify-center gap-10"
                        exit={{
                            opacity: 0,
                            scale: 1.1,
                            filter: "blur(10px)",
                            transition: { duration: 0.8, ease: "easeInOut" }
                        }}
                    >
                        {/* Logo Container */}
                        <div className="relative w-48 h-auto">
                            {/* 1. Background (Dim/Ghost) Logo */}
                            <img
                                src="/Logo-dark.png"
                                alt="Anarva"
                                className="w-full h-auto object-contain opacity-20 grayscale brightness-50"
                            />

                            {/* 2. Foreground (Filling) Logo */}
                            <motion.div
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    clipPath: `inset(${100 - progress}% 0 0 0)` // Reveals from bottom up
                                }}
                            >
                                <img
                                    src="/Logo-dark.png"
                                    alt="Anarva"
                                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
                                />
                            </motion.div>
                        </div>

                        {/* Percentage Counter */}
                        <div className="font-mono text-xl tracking-[0.2em] text-white/90">
                            {Math.round(progress)}%
                        </div>
                    </motion.div>
                ) : null}
            </AnimatePresence>
        </div>
    );
}
