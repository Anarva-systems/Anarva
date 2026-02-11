"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Globe,
    Smartphone,
    Brain,
    Palette,
    Blocks,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const services = [
    {
        icon: Globe,
        title: "Web Development",
        description: "High-performance websites and web applications built with cutting-edge frameworks.",
        features: ["Next.js & React", "Headless CMS", "E-commerce", "Progressive Web Apps"],
        color: "blue",
        size: "large",
    },
    {
        icon: Smartphone,
        title: "Mobile Apps",
        description: "Native and cross-platform mobile experiences that users love.",
        features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
        color: "purple",
        size: "medium",
    },
    {
        icon: Brain,
        title: "AI Solutions",
        description: "Intelligent automation and machine learning integrations.",
        features: ["LLM Integration", "Computer Vision", "Predictive Analytics", "Chatbots"],
        color: "mixed",
        size: "medium",
    },
    {
        icon: Palette,
        title: "Product Design",
        description: "User-centered design that converts and delights.",
        features: ["UI/UX Design", "Design Systems", "Prototyping", "User Research"],
        color: "purple",
        size: "medium",
    },
    {
        icon: Blocks,
        title: "Web3 Development",
        description: "Decentralized applications and blockchain solutions.",
        features: ["Smart Contracts", "DeFi Platforms", "NFT Marketplaces", "Wallet Integration"],
        color: "blue",
        size: "large",
    },
];

const colorStyles = {
    blue: {
        iconBg: "bg-cosmic-blue/10 group-hover:bg-cosmic-blue/20",
        iconColor: "text-cosmic-blue",
        border: "border-cosmic-blue/0 group-hover:border-cosmic-blue/30",
        glow: "group-hover:shadow-[0_0_50px_rgba(0,212,255,0.15)]",
    },
    purple: {
        iconBg: "bg-cosmic-purple/10 group-hover:bg-cosmic-purple/20",
        iconColor: "text-cosmic-purple",
        border: "border-cosmic-purple/0 group-hover:border-cosmic-purple/30",
        glow: "group-hover:shadow-[0_0_50px_rgba(123,0,255,0.15)]",
    },
    mixed: {
        iconBg: "bg-gradient-to-br from-cosmic-blue/10 to-cosmic-purple/10 group-hover:from-cosmic-blue/20 group-hover:to-cosmic-purple/20",
        iconColor: "text-cosmic-violet",
        border: "border-cosmic-violet/0 group-hover:border-cosmic-violet/30",
        glow: "group-hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]",
    },
};

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section ref={sectionRef} className="relative py-32 overflow-hidden">
            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Our <span className="text-gradient-cosmic">Services</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Full-spectrum digital capabilities to bring your vision to life.
                    </p>
                </motion.div>

                {/* Services grid - asymmetrical layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const colors = colorStyles[service.color as keyof typeof colorStyles];
                        const isLarge = service.size === "large";

                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`${isLarge ? "lg:col-span-1" : ""}`}
                            >
                                <div
                                    className={`
                    group relative h-full p-8 rounded-3xl
                    bg-white/[0.02] backdrop-blur-sm
                    border ${colors.border}
                    ${colors.glow}
                    transition-all duration-500 cursor-default
                  `}
                                >
                                    {/* Animated background gradient on hover */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                                        <motion.div
                                            className="absolute -inset-1/2 w-[200%] h-[200%]"
                                            style={{
                                                background: `radial-gradient(circle at center, ${service.color === 'blue' ? 'rgba(0,212,255,0.05)' : service.color === 'purple' ? 'rgba(123,0,255,0.05)' : 'rgba(168,85,247,0.05)'} 0%, transparent 50%)`,
                                            }}
                                            animate={{
                                                rotate: [0, 360],
                                            }}
                                            transition={{
                                                duration: 20,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                        />
                                    </div>

                                    {/* Icon */}
                                    <div className={`relative w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6 transition-all duration-300`}>
                                        <service.icon className={`w-8 h-8 ${colors.iconColor}`} />

                                        {/* Orbital ring on hover */}
                                        <motion.div
                                            className="absolute inset-0 rounded-2xl border border-current opacity-0 group-hover:opacity-30"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            style={{ color: service.color === 'blue' ? '#00d4ff' : service.color === 'purple' ? '#7b00ff' : '#a855f7' }}
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cosmic-blue transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Features list */}
                                    <ul className="space-y-2 mb-6">
                                        {service.features.map((feature, i) => (
                                            <motion.li
                                                key={feature}
                                                className="flex items-center gap-2 text-sm text-gray-500"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                                transition={{ delay: 0.3 + index * 0.1 + i * 0.05 }}
                                            >
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                    style={{ background: service.color === 'blue' ? '#00d4ff' : service.color === 'purple' ? '#7b00ff' : '#a855f7' }}
                                                />
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>

                                    {/* Learn more link */}
                                    <Link
                                        href={`/services#${service.title.toLowerCase().replace(/\s/g, '-')}`}
                                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cosmic-blue transition-colors group/link"
                                        data-hoverable
                                    >
                                        Learn more
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
