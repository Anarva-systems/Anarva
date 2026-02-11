"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const PROJECTS = [
    {
        title: "Nebula Stream",
        category: "Platform",
        image: "/projects/nebula.jpg", // Placeholder - using colors for now if image invalid
        color: "bg-blue-900"
    },
    {
        title: "Vertex AI",
        category: "Intelligence",
        image: "/projects/vertex.jpg",
        color: "bg-purple-900"
    },
    {
        title: "Orbit Finance",
        category: "Fintech",
        image: "/projects/orbit.jpg",
        color: "bg-emerald-900"
    },
    {
        title: "Cipher Labs",
        category: "Security",
        image: "/projects/cipher.jpg",
        color: "bg-zinc-800"
    }
];

export default function WorkGrid() {
    return (
        <section className="w-full py-32 px-6 md:px-12 bg-black text-white">
            <div className="max-w-7xl mx-auto mb-20 flex items-end justify-between">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Selected Work</h2>
                <Link href="/work" className="hidden md:block text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                    View All Projects
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
                {PROJECTS.map((project, idx) => (
                    <motion.div
                        key={idx}
                        className="group relative cursor-pointer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        {/* Image Container */}
                        <div className={`aspect-[4/3] w-full overflow-hidden bg-zinc-900 ${project.color} mb-6 transition-transform duration-700 ease-out group-hover:scale-[0.98]`}>
                            {/* Placeholder for actual image */}
                            <div className="w-full h-full opacity-50 mix-blend-overlay" />
                        </div>

                        {/* Text */}
                        <div className="flex justify-between items-baseline">
                            <h3 className="text-2xl font-medium group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
                            <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{project.category}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-16 md:hidden text-center">
                <Link href="/work" className="text-sm uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                    View All Projects
                </Link>
            </div>
        </section>
    );
}
