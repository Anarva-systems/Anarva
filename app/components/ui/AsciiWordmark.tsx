"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

/* =============================================
   ASCII ART WORDMARK — Canvas-based Hover Reveal
   ============================================= */

interface AsciiWordmarkProps {
    text?: string;
    cols?: number;
    className?: string;
}

export default function AsciiWordmark({
    text = "ANARVA",
    cols = 140,
    className = "",
}: AsciiWordmarkProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const filledMapRef = useRef<boolean[][] | null>(null);
    const binaryGridRef = useRef<string[][] | null>(null);
    const rowsRef = useRef(0);
    const mouseRef = useRef({ x: -999, y: -999, hovering: false });
    const rafRef = useRef<number>(0);

    const CHAR_W = 7.5;
    const CHAR_H = 9.5;
    const REVEAL_RADIUS = 130;

    // Generate pixel map + binary grid once
    useEffect(() => {
        const sampleCanvas = document.createElement("canvas");
        const ctx = sampleCanvas.getContext("2d");
        if (!ctx) return;

        const fontSize = 120;
        ctx.font = `900 ${fontSize}px Arial, Helvetica, sans-serif`;
        const metrics = ctx.measureText(text);
        const textWidth = metrics.width;
        const textHeight = fontSize * 1.1;
        const aspect = textWidth / textHeight;
        const charAspect = 0.55;
        const rows = Math.round(cols / (aspect * (1 / charAspect)));

        sampleCanvas.width = cols;
        sampleCanvas.height = rows;

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, cols, rows);
        ctx.fillStyle = "#fff";
        ctx.font = `900 ${rows * 0.9}px Arial, Helvetica, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, cols / 2, rows / 2);

        const imageData = ctx.getImageData(0, 0, cols, rows);
        const pixels = imageData.data;
        const map: boolean[][] = [];
        const binGrid: string[][] = [];

        for (let y = 0; y < rows; y++) {
            const mapRow: boolean[] = [];
            const binRow: string[] = [];
            for (let x = 0; x < cols; x++) {
                const idx = (y * cols + x) * 4;
                mapRow.push(pixels[idx] > 100);
                binRow.push(Math.random() > 0.5 ? "1" : "0");
            }
            map.push(mapRow);
            binGrid.push(binRow);
        }

        filledMapRef.current = map;
        binaryGridRef.current = binGrid;
        rowsRef.current = rows;

        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = cols * CHAR_W;
            canvas.height = rows * CHAR_H;
        }
    }, [text, cols, CHAR_W, CHAR_H]);

    // Draw loop
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const map = filledMapRef.current;
        const binGrid = binaryGridRef.current;
        if (!ctx || !canvas || !map || !binGrid) return;

        const rows = rowsRef.current;
        const { x: mx, y: my, hovering } = mouseRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `600 ${CHAR_H - 1}px monospace`;
        ctx.textBaseline = "top";

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const px = x * CHAR_W;
                const py = y * CHAR_H;
                const isFilled = map[y][x];

                const dx = px + CHAR_W / 2 - mx;
                const dy = py + CHAR_H / 2 - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const inRadius = hovering && dist < REVEAL_RADIUS;

                let char: string;
                let color: string;

                if (inRadius && isFilled) {
                    const fade = Math.max(0, 1 - dist / REVEAL_RADIUS);
                    const alpha = 0.3 + fade * 0.6;
                    char = binGrid[y][x];
                    color = `rgba(46, 232, 158, ${alpha})`;
                } else if (isFilled) {
                    char = "+";
                    color = "rgba(255, 255, 255, 0.32)";
                } else {
                    char = "+";
                    color = "rgba(255, 255, 255, 0.07)";
                }

                ctx.fillStyle = color;
                ctx.fillText(char, px, py);
            }
        }
    }, [cols, CHAR_W, CHAR_H, REVEAL_RADIUS]);

    // Animation loop
    useEffect(() => {
        let running = true;

        const loop = () => {
            if (!running) return;
            draw();
            rafRef.current = requestAnimationFrame(loop);
        };

        const timeout = setTimeout(() => {
            loop();
        }, 80);

        return () => {
            running = false;
            cancelAnimationFrame(rafRef.current);
            clearTimeout(timeout);
        };
    }, [draw]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;
        const scaleX = (canvasRef.current?.width || 1) / rect.width;
        const scaleY = (canvasRef.current?.height || 1) / rect.height;
        mouseRef.current = {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY,
            hovering: true,
        };
    }, []);

    const handleMouseLeave = useCallback(() => {
        mouseRef.current = { x: -999, y: -999, hovering: false };
    }, []);

    return (
        <motion.div
            ref={containerRef}
            className={`w-full overflow-hidden cursor-crosshair ${className}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-auto block"
                style={{ imageRendering: "auto" }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                aria-hidden="true"
            />
        </motion.div>
    );
}
