"use client";

import { motion } from "framer-motion";
import { Palette, BrainCircuit, Code2, Globe, Rocket, ShieldCheck } from "lucide-react";

const SERVICES = [
    {
        icon: <Palette className="w-5 h-5" />,
        title: "Product Design",
        desc: "UI/UX that converts. We craft intuitive, accessible, and stunning interfaces.",
        tags: ["UI/UX", "Design Systems", "Prototyping"],
        id: "01"
    },
    {
        icon: <BrainCircuit className="w-5 h-5" />,
        title: "AI Solutions",
        desc: "Leverage LLMs and custom machine learning models to automate workflows.",
        tags: ["RAG Pipelines", "Agents", "Fine-tuning"],
        id: "02"
    },
    {
        icon: <Code2 className="w-5 h-5" />,
        title: "Full-Stack Dev",
        desc: "Scalable, secure, and blazing fast web applications built on Next.js.",
        tags: ["Next.js", "React", "Node.js"],
        id: "03"
    },
    {
        icon: <Globe className="w-5 h-5" />,
        title: "Web3 & Blockchain",
        desc: "Decentralized applications and smart contracts for the next generation internet.",
        tags: ["Smart Contracts", "dApps", "Solidity"],
        id: "04"
    },
    {
        icon: <Rocket className="w-5 h-5" />,
        title: "Growth Engineering",
        desc: "Technical SEO, performance optimization, and analytics integration.",
        tags: ["SEO", "Analytics", "CRO"],
        id: "05"
    },
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Enterprise Security",
        desc: "Bank-grade security audits and implementation to protect users.",
        tags: ["Audits", "Compliance", "Pen-testing"],
        id: "06"
    }
];

export function ServiceGrid() {
    return (
        <section id="services" className="py-16 md:py-32 bg-transparent border-b border-white/10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <h2 className="text-5xl md:text-6xl font-bold text-white font-geist tracking-tighter max-w-xl leading-[0.95]">
                        Holistic <br /> Digital Systems.
                    </h2>
                    <p className="text-zinc-400 max-w-sm text-lg font-light leading-relaxed mb-2">
                        From the first pixel of design to the final line of code, we handle every aspect.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            className="group relative bg-white/5 p-6 md:p-10 border border-white/10 -ml-[1px] -mt-[1px] hover:z-10 hover:border-white/30 transition-colors backdrop-blur-sm"
        >
            <div className="flex justify-between items-start mb-8">
                <span className="text-xs font-mono text-zinc-500 font-bold tracking-widest">{service.id}</span>
                <div className="text-zinc-400 group-hover:text-[var(--cyber-cyan)] transition-colors">{service.icon}</div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {service.title}
            </h3>

            <p className="text-zinc-400 leading-relaxed text-sm mb-8 max-w-xs">
                {service.desc}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
                {service.tags.map(tag => (
                    <span key={tag} className="text-xs text-zinc-500 uppercase tracking-wider font-medium">
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
