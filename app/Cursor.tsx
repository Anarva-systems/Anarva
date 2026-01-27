'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

export default function CustomCursor() {
    // 1. Mouse Position (Motion Values for performance)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // 2. Smooth Physics (The "Trail/Aura" layer)
    // stiff/damping tuned for a premium "weighty/fluid" feel
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 20, mass: 0.5 });
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 20, mass: 0.5 });

    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    useEffect(() => {
        const manageMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        const manageMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check for interactive elements
            if (target.closest('a, button, .magnetic, input, textarea, [role="button"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const manageMouseDown = () => setIsPressed(true);
        const manageMouseUp = () => setIsPressed(false);

        window.addEventListener("mousemove", manageMouseMove);
        window.addEventListener("mouseover", manageMouseOver);
        window.addEventListener("mousedown", manageMouseDown);
        window.addEventListener("mouseup", manageMouseUp);

        return () => {
            window.removeEventListener("mousemove", manageMouseMove);
            window.removeEventListener("mouseover", manageMouseOver);
            window.removeEventListener("mousedown", manageMouseDown);
            window.removeEventListener("mouseup", manageMouseUp);
        }
    }, [mouseX, mouseY]);

    // Derived transforms for the cursor visual
    const scale = isPressed ? 0.8 : isHovering ? 1.5 : 1;
    const opacity = isPressed ? 0.8 : 1;

    // We'll use a mix-blend-mode to make it invert colors on white/black backgrounds
    // The "dot" is the raw mouse position (immediate)
    // The "ring" follows with physics

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">

            {/* The Main Ring/Aura */}
            <motion.div
                className="absolute bg-white rounded-full"
                style={{
                    left: smoothX,
                    top: smoothY,
                    height: 30,
                    width: 30,
                    x: "-50%",
                    y: "-50%"
                }}
                animate={{
                    scale: scale,
                    opacity: opacity
                }}
                transition={{
                    scale: { duration: 0.2, ease: "easeInOut" },
                    opacity: { duration: 0.2 }
                }}
            />

            {/* Optional: Small center dot for precision (keeps visible center) */}
            <motion.div
                className="absolute bg-white rounded-full"
                style={{
                    left: mouseX,
                    top: mouseY,
                    height: 8,
                    width: 8,
                    x: "-50%",
                    y: "-50%"
                }}
            />
        </div>
    );
}