"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    {
        title: "Strategy",
        description: "Brand positioning, digital transformation, and product discovery.",
        tags: ["Discovery", "UX Research", "Roadmapping"]
    },
    {
        title: "Design",
        description: "User interfaces, design systems, and brand identity.",
        tags: ["UI/UX", "Motion", "3D Visuals"]
    },
    {
        title: "Engineering",
        description: "Full-stack development, mobile apps, and Web3 infrastructure.",
        tags: ["Next.js", "React Native", "Smart Contracts"]
    }
];

export default function ServicesList() {
    return (
        <section className="w-full py-16 md:py-32 px-6 md:px-12 bg-black text-white border-t border-white/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Our Expertise</h2>
                    <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                        We combine creative strategy with technical excellence to build products that define categories.
                    </p>
                    <div className="mt-12">
                        <Link href="/services" className="inline-flex items-center gap-2 border-b border-white pb-1 hover:text-zinc-300 transition-colors">
                            Explore All Services <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="space-y-12">
                    {SERVICES.map((service, idx) => (
                        <div key={idx} className="group border-b border-white/10 pb-12 last:border-0 last:pb-0">
                            <h3 className="text-3xl font-medium mb-4 group-hover:text-zinc-300 transition-colors">{service.title}</h3>
                            <p className="text-zinc-500 mb-6 max-w-sm">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-xs uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-zinc-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
