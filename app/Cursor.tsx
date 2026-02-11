'use client';
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springX = useSpring(mouseX, { stiffness: 300, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 300, damping: 25 });

    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let prevX = 0;
        let prevY = 0;
        let prevTime = Date.now();

        const updateMousePosition = (e: MouseEvent) => {
            const currentTime = Date.now();
            const deltaTime = currentTime - prevTime;

            const deltaX = e.clientX - prevX;
            const deltaY = e.clientY - prevY;

            // Calculate velocity for trail length
            const velX = deltaX / (deltaTime || 1);
            const velY = deltaY / (deltaTime || 1);

            setVelocity({ x: velX, y: velY });

            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            prevX = e.clientX;
            prevY = e.clientY;
            prevTime = currentTime;
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            setIsHovering(!!target.closest('a, button, [role="button"]'));
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    // Calculate arrow direction from velocity
    const angle = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
    const speed = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

    return (
        <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">

            {/* Main Minimal Arrow Pointer */}
            <motion.div
                style={{
                    left: springX,
                    top: springY,
                    x: '-50%',
                    y: '-50%',
                }}
                animate={{
                    rotate: speed > 0.5 ? angle : 0,
                }}
                transition={{
                    rotate: { type: "spring", stiffness: 150, damping: 15 }
                }}
                className="absolute"
            >
                {/* Ultra-Minimal Line Arrow */}
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                >
                    {/* Single stroke arrow - very minimal */}
                    <motion.path
                        d="M8 14H20M20 14L15 9M20 14L15 19"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{
                            strokeWidth: isHovering ? "2" : "1.5",
                        }}
                    />
                </svg>
            </motion.div>

            {/* Velocity Trail - extends backwards when moving fast */}
            {speed > 0.5 && (
                <motion.div
                    style={{
                        left: springX,
                        top: springY,
                        x: '-50%',
                        y: '-50%',
                    }}
                    animate={{
                        rotate: angle,
                    }}
                    className="absolute"
                >
                    <motion.div
                        className="h-[1px] bg-gradient-to-r from-white/60 to-transparent"
                        animate={{
                            width: Math.min(speed * 50, 80), // Trail length based on speed
                        }}
                        transition={{ duration: 0.1 }}
                        style={{
                            transformOrigin: 'left center',
                            transform: 'translateX(-100%)'
                        }}
                    />
                </motion.div>
            )}

            {/* Center Dot for precision */}
            <motion.div
                style={{
                    left: mouseX,
                    top: mouseY,
                    x: '-50%',
                    y: '-50%',
                }}
                className="absolute w-[3px] h-[3px] bg-white rounded-full"
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: speed > 1 ? 0 : 1,
                }}
            />

        </div>
    );
}