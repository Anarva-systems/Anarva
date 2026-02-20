"use client";

import { motion } from "framer-motion";
import { ArrowRight, CornerRightDown, Plus } from "lucide-react";
import Link from "next/link";
import Crosshair from "../ui/Crosshair";
import KineticSectionTitle from "../ui/KineticSectionTitle";

const SERVICES = [
    {
        title: "UI/UX DESIGN & PRODUCT ARCHITECTURE",
        description: "High-end product architecture and UI/UX design for SaaS and web apps. We blend user strategy with conversion-focused aesthetics.",
        tags: ["UI/UX AGENCY", "SAAS PRODUCT DESIGN", "UX STRATEGY"]
    },
    {
        title: "AI INFRASTRUCTURE & RAG PIPELINES",
        description: "Custom AI agent development and LLM integration services. We build autonomous RAG pipelines and fine-tune models for enterprise automation.",
        tags: ["AI AUTOMATION", "LLM INTEGRATION", "RAG DEVELOPMENT"]
    },
    {
        title: "FULL STACK & WEB3 ENGINEERING",
        description: "Elite React, Next.js, and Node.js development coupled with decentralized Web3 protocols and smart contract engineering.",
        tags: ["NEXT.JS EXPERTS", "WEB3 DEVELOPMENT", "SMART CONTRACTS"]
    },
    {
        title: "GROWTH PROTOCOLS & SECURITY",
        description: "Technical SEO, performance optimization, and rigorous smart contract audits to scale and secure your digital ecosystem.",
        tags: ["TECHNICAL SEO", "SECURITY AUDITS", "GROWTH OPTIMIZATION"]
    }
];

export default function ServicesList() {
    return (
        <section className="w-full py-24 md:py-32 px-6 md:px-12 bg-[#050505] text-white border-t border-white/5 relative overflow-hidden">
            {/* Tech Background */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />

            <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">

                {/* Header Column */}
                <div className="lg:col-span-4">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-6">/// CAPABILITIES INDEX</span>
                    <div className="mb-8">
                        <KineticSectionTitle title="ENGINEERING THE UNSEEN" className="text-4xl md:text-5xl font-light tracking-[-0.03em] leading-tight text-white mb-2" wordClass="text-white" />
                    </div>
                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm font-light">
                        We don't just build websites; we architect digital realities. Our process combines rigorous technical strategy with avant-garde design.
                    </p>

                    <div className="mt-12">
                        <Link href="/services" className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white hover:text-zinc-300 transition-colors">
                            <span className="w-8 h-[1px] bg-white group-hover:w-12 transition-all duration-300" />
                            Explore Capabilities
                        </Link>
                    </div>
                </div>

                {/* Services List Column */}
                <div className="lg:col-span-8 space-y-0 border-t border-white/10">
                    {SERVICES.map((service, idx) => (
                        <motion.div
                            key={idx}
                            className="group relative border-b border-white/10 py-12 transition-all duration-500 hover:bg-white/[0.02] cursor-default"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="flex flex-col md:flex-row md:items-baseline gap-6 md:gap-12 px-4 md:px-8">
                                <span className="font-mono text-xs text-zinc-600 group-hover:text-white transition-colors duration-500">
                                    0{idx + 1}
                                </span>

                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-light tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500 flex items-center gap-4">
                                        {service.title}
                                        <CornerRightDown className="w-4 h-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                    </h3>
                                    <p className="text-zinc-500 font-light max-w-lg mb-6 group-hover:text-zinc-400 transition-colors">
                                        {service.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                                        {service.tags.map(tag => (
                                            <span key={tag} className="text-[10px] uppercase tracking-widest px-2 py-1 border border-white/10 text-zinc-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="hidden md:block">
                                    <Plus className="w-4 h-4 text-zinc-800 group-hover:text-white transition-colors duration-500 rotate-0 group-hover:rotate-90" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
