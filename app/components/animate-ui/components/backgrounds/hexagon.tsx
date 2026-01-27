"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface HexagonBackgroundProps {
    className?: string;
}

export const HexagonBackground: React.FC<HexagonBackgroundProps> = ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.offsetWidth,
                    height: containerRef.current.offsetHeight,
                });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    // Hexagon size configuration
    const hexSize = 30; // Side length
    const hexWidth = Math.sqrt(3) * hexSize;
    const hexHeight = 2 * hexSize;
    const xSpacing = hexWidth;
    const ySpacing = hexHeight * 0.75; // Vertical distance between centers

    const cols = Math.ceil(dimensions.width / xSpacing) + 1;
    const rows = Math.ceil(dimensions.height / ySpacing) + 1;

    const hexagons = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const xOffset = (r % 2) * (hexWidth / 2);
            const x = c * xSpacing - xOffset;
            const y = r * ySpacing;
            hexagons.push({ r, c, x, y, id: `${r}-${c}` });
        }
    }

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-full overflow-hidden bg-white ${className || ""}`}
            onMouseMove={handleMouseMove}
        >
            <div className="absolute inset-0 z-0">
                {hexagons.map((hex) => (
                    <InteractiveHexagon
                        key={hex.id}
                        x={hex.x}
                        y={hex.y}
                        size={hexSize}
                        mouseX={mouseX}
                        mouseY={mouseY}
                    />
                ))}
            </div>
        </div>
    );
};

const InteractiveHexagon = ({
    x,
    y,
    size,
    mouseX,
    mouseY,
}: {
    x: number;
    y: number;
    size: number;
    mouseX: any;
    mouseY: any;
}) => {
    const distance = useTransform(mouseX, (mx: number) => {
        const my = mouseY.get();
        const dx = mx - (x + size); // Center x approx
        const dy = my - (y + size); // Center y approx
        return Math.sqrt(dx * dx + dy * dy);
    });

    const scale = useTransform(distance, [0, 300], [1.1, 1]); // Scales up when close
    const opacity = useTransform(distance, [0, 200], [1, 0.3]);
    const borderColor = useTransform(distance, [0, 150], ["#6366f1", "#e2e8f0"]); // Indigo to Slate-200
    const borderWidth = useTransform(distance, [0, 150], [2, 1]);
    const zIndex = useTransform(distance, [0, 100], [10, 1]);
    const filter = useTransform(distance, [0, 200], ["drop-shadow(0 0 12px rgba(99, 102, 241, 0.6))", "drop-shadow(0 0 0px rgba(99, 102, 241, 0))"]);

    // Hexagon path calculation
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30); // Rotate 30deg to have flat top? No, pointy top usually for this spacing.
        // Standard pointy top: vertices at 30, 90, 150...
        // Let's verify grid orientation.
        // With xSpacing = sqrt(3)*s and ySpacing = 1.5*s, it's pointy topped hexagons.

        const px = size * Math.cos(angle);
        const py = size * Math.sin(angle);
        points.push(`${px},${py}`);
    }
    const pathData = points.join(" ");

    return (
        <motion.div
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: size * Math.sqrt(3),
                height: size * 2,
                scale,
                zIndex,
                opacity: 1, // Keep opacity high for structure, maybe just color change
            }}
            className="flex items-center justify-center pointer-events-none"
        >
            <svg
                width={size * Math.sqrt(3)}
                height={size * 2}
                viewBox={`-${size * Math.sqrt(3) / 2} -${size} ${size * Math.sqrt(3)} ${size * 2}`}
                style={{ overflow: 'visible' }}
            >
                <motion.polygon
                    points={pathData}
                    fill="white"
                    strokeWidth={borderWidth}
                    style={{ stroke: borderColor, filter }}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </motion.div>
    );
};
