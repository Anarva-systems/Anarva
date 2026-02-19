"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HoverRevealTextProps {
    text: string;
    className?: string;
    revealRadius?: number; // Distance in pixels to trigger reveal
}

export default function HoverRevealText({ text, className = "", revealRadius = 100 }: HoverRevealTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            // Get container position relative to viewport
            const rect = containerRef.current.getBoundingClientRect();

            // Check if mouse is near the container (optimization)
            const isNear =
                e.clientX >= rect.left - revealRadius &&
                e.clientX <= rect.right + revealRadius &&
                e.clientY >= rect.top - revealRadius &&
                e.clientY <= rect.bottom + revealRadius;

            setIsHovering(isNear);

            if (isNear) {
                setMousePos({ x: e.clientX, y: e.clientY });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [revealRadius]);

    return (
        <div ref={containerRef} className={`relative inline-block cursor-default ${className}`}>
            {text.split("").map((char, index) => (
                <Character
                    key={index}
                    char={char}
                    mousePos={mousePos}
                    isHovering={isHovering}
                    revealRadius={revealRadius}
                    containerRef={containerRef}
                />
            ))}
        </div>
    );
}

function Character({ char, mousePos, isHovering, revealRadius, containerRef }: any) {
    const charRef = useRef<HTMLSpanElement>(null);
    const [opacity, setOpacity] = useState(0.1);

    useEffect(() => {
        if (!isHovering || !charRef.current) {
            setOpacity(0.1);
            return;
        }

        const rect = charRef.current.getBoundingClientRect();
        const charX = rect.left + rect.width / 2;
        const charY = rect.top + rect.height / 2;

        const dist = Math.sqrt(
            Math.pow(mousePos.x - charX, 2) +
            Math.pow(mousePos.y - charY, 2)
        );

        // Opacity is 1 when dist is 0, 0.1 when dist >= revealRadius
        const newOpacity = Math.max(0.1, 1 - Math.min(dist / revealRadius, 1));

        // Smooth out the flicker by using a small threshold or just setting it directly
        setOpacity(newOpacity);

    }, [mousePos, isHovering, revealRadius]);

    return (
        <motion.span
            ref={charRef}
            className="inline-block transition-opacity duration-75"
            style={{ opacity }}
            // Fallback for space character to ensure it has width
            dangerouslySetInnerHTML={{ __html: char === " " ? "&nbsp;" : char }}
        />
    );
}
