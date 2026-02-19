"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface KineticSectionTitleProps {
    title: string;
    className?: string;
    wordClass?: string;
}

export default function KineticSectionTitle({ title, className = "", wordClass = "" }: KineticSectionTitleProps) {
    const containerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            const words = containerRef.current?.querySelectorAll(".word");

            if (words && words.length > 0) {
                gsap.fromTo(words,
                    {
                        y: 50,
                        opacity: 0,
                        rotationX: 30
                    },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        duration: 1,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split title into words
    const words = title.split(" ");

    return (
        <h2 ref={containerRef} className={`perspective-text overflow-hidden ${className}`}>
            {words.map((word, i) => (
                <div key={i} className="inline-block overflow-hidden mr-[0.2em] align-top">
                    <span className={`word block transform-style-3d ${wordClass}`}>
                        {word}
                    </span>
                </div>
            ))}
        </h2>
    );
}
