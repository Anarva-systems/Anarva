"use client";

import { motion } from "framer-motion";
import { Palette, BrainCircuit, Code2, Globe, Rocket, ShieldCheck } from "lucide-react";
import Crosshair from "../../components/ui/Crosshair"; // Fixed import path - assuming ../../components
import KineticSectionTitle from "../../components/ui/KineticSectionTitle";

const SERVICES = [
    {
        icon: <Palette className="w-5 h-5" />,
        title: "PRODUCT ARCHITECTURE",
        desc: "UI/UX that converts. We craft intuitive, accessible, and stunning interfaces.",
        tags: ["UI/UX", "DESIGN SYSTEMS", "PROTOTYPING"],
        id: "01"
    },
    {
        icon: <BrainCircuit className="w-5 h-5" />,
        title: "AI INFRASTRUCTURE",
        desc: "Leverage LLMs and custom machine learning models to automate workflows.",
        tags: ["RAG PIPELINES", "AGENTS", "FINE-TUNING"],
        id: "02"
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        title: "FULL-STACK ENGINEERING",
        desc: "Scalable, secure, and blazing fast web applications built on Next.js.",
        tags: ["NEXT.JS", "REACT", "NODE.JS"],
        id: "03"
    },
    {
        icon: <Globe className="w-5 h-5" />,
        title: "DECENTRALIZED SYSTEMS",
        desc: "Decentralized applications and smart contracts for the next generation internet.",
        tags: ["SMART CONTRACTS", "DAPPS", "SOLIDITY"],
        id: "04"
    },
    {
        icon: <Rocket className="w-5 h-5" />,
        title: "GROWTH PROTOCOLS",
        desc: "Technical SEO, performance optimization, and analytics integration.",
        tags: ["SEO", "ANALYTICS", "CRO"],
        id: "05"
    },
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "SECURITY AUDITS",
        desc: "Bank-grade security audits and implementation to protect users.",
        tags: ["AUDITS", "COMPLIANCE", "PEN-TESTING"],
        id: "06"
    }
];

export function ServiceGrid() {
    return (
        <section id="services" className="py-24 md:py-32 bg-[#050505] border-b border-white/5 relative overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '60px 60px' }}
            />

            <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
                <div className="mb-20">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-6">/// SERVICE MATRIX</span>
                    <KineticSectionTitle title="HOLISTIC DIGITAL SYSTEMS" className="text-5xl md:text-7xl font-light text-white tracking-[-0.03em] leading-[0.9]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
                    {SERVICES.map((s, i) => (
                        <ServiceCard key={i} service={s} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative bg-[#080808] p-8 md:p-12 transition-colors hover:bg-[#0a0a0a]"
        >
            <Crosshair className="top-0 right-0 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="flex justify-between items-start mb-12">
                <span className="text-xs font-mono text-zinc-600 font-bold tracking-widest group-hover:text-white transition-colors">{service.id}</span>
                <div className="text-zinc-500 group-hover:text-white transition-colors">{service.icon}</div>
            </div>

            <h3 className="text-xl font-mono text-white mb-4 tracking-widest uppercase">
                {service.title}
            </h3>

            <p className="text-zinc-500 leading-relaxed text-sm mb-8 max-w-xs font-light group-hover:text-zinc-400 transition-colors">
                {service.desc}
            </p>

            <div className="flex flex-wrap gap-2">
                {service.tags.map(tag => (
                    <span key={tag} className="text-[10px] text-zinc-600 uppercase tracking-widest border border-white/5 px-2 py-1 group-hover:border-white/20 group-hover:text-zinc-400 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
