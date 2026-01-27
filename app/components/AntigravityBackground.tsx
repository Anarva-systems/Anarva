"use client";
import { useEffect, useRef } from "react";

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    class Particle {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      size: number;
      color: string;
      shape: "circle" | "square" | "triangle" | "crux";
      angle: number;
      vAngle: number;
      vx: number;
      vy: number;
      friction: number;
      ease: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.size = Math.random() * 3 + 1; // Size variation
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        const shapes: ("circle" | "square" | "triangle" | "crux")[] = ["circle", "square", "triangle", "crux"];
        this.shape = shapes[Math.floor(Math.random() * shapes.length)];
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.05;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.85; // Damping
        this.ease = 0.01; // Return speed
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;

        // Shape drawing logic
        ctx.beginPath();
        if (this.shape === "circle") {
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        } else if (this.shape === "square") {
          ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
        } else if (this.shape === "triangle") {
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size, this.size);
          ctx.lineTo(-this.size, this.size);
          ctx.closePath();
        } else if (this.shape === "crux") { // Plus sign
          ctx.rect(-this.size / 2, -this.size * 1.5, this.size, this.size * 3);
          ctx.rect(-this.size * 1.5, -this.size / 2, this.size * 3, this.size);
        }
        ctx.fill();
        ctx.restore();
      }

      update() {
        // Physics: Mouse Repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        // Force calculation (Inverse Square-ish)
        const maxDistance = mouse.radius;
        let force = 0;

        if (distance < maxDistance) {
          force = (maxDistance - distance) / maxDistance;
          // Push away
          const repulsionStrength = 8;
          this.vx -= forceDirectionX * force * repulsionStrength;
          this.vy -= forceDirectionY * force * repulsionStrength;

          // Spin faster when pushed
          this.angle += this.vAngle * 5;
        } else {
          // Normal spin
          this.angle += this.vAngle;
        }

        // Spring back to base
        if (distance > maxDistance) {
          const homeDx = this.baseX - this.x;
          const homeDy = this.baseY - this.y;
          this.vx += homeDx * this.ease * 0.5;
          this.vy += homeDy * this.ease * 0.5;
        }

        // Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, radius: 100 };

    // Google Brand Colors + Muted variants
    const COLORS = [
      "#7daaf4ff", // Blue
      "#ea4335", // Red
      "#fbbc04", // Yellow
      "#34a853", // Green
      "#5f6368", // Gray
    ];

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const init = () => {
      if (!canvas) return;
      particles = [];
      const numberOfParticles = Math.floor((canvas.width * canvas.height) / 4500); // Responsive count
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Reset mouse when leaving window to let particles return
    window.addEventListener("mouseleave", () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    window.addEventListener("resize", resize);

    // Initial setup
    resize();
    animate();

    return () => {
      window.removeEventListener("mousemove", () => { });
      window.removeEventListener("resize", resize);
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0 opacity-60" />;
}
