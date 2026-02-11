"use client";

import { motion } from "framer-motion";

export default function ProcessPage() {
    const steps = [
        {
            num: "01",
            title: "Discovery & Strategy",
            desc: "We dive deep into your business goals, target audience, and functional requirements. We don't write a line of code until we understand exactly what you need."
        },
        {
            num: "02",
            title: "Wireframing & UX",
            desc: "We create skeletal frameworks and interactive prototypes. This ensures the user flow is logical and intuitive before we apply visual design."
        },
        {
            num: "03",
            title: "UI Design & Build",
            desc: "Our designers craft a stunning high-fidelity interface while our developers build the robust backend and frontend architecture using the latest tech stack."
        },
        {
            num: "04",
            title: "QA & Testing",
            desc: "Rigorous testing across devices, browsers, and network conditions to ensure your site is bug-free and performs flawlessly."
        },
        {
            num: "05",
            title: "Launch & Scale",
            desc: "We handle the deployment process and provide post-launch support to help you scale as your user base grows."
        }
    ];

    return (
        <main className="min-h-screen bg-[var(--obsidian)] pt-32 pb-32 px-6">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 border-b border-white/10 pb-8">
                    <div>
                        <span className="block text-xs font-bold text-[var(--cyber-cyan)] uppercase tracking-widest mb-4 font-mono">
                            System Methodology
                        </span>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white font-geist leading-[0.9]">
                            The <br /> Protocol.
                        </h1>
                    </div>
                    <p className="text-zinc-400 text-lg font-light max-w-md text-right md:text-left mt-8 md:mt-0">
                        Precision engineered workflows for rapid deployment and scalable growth.
                    </p>
                </div>

                {/* Vertical Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0 relative">
                    {/* Center Line for Desktop (Visual only, hard to position perfectly without absolute, so using border-l on right col) */}

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative py-16 border-t border-white/10 ${index % 2 === 0 ? "md:border-r md:border-white/10 md:pr-16" : "md:pl-16 md:mt-32"
                                }`}
                        >
                            <span className="text-7xl font-bold text-white/5 font-geist absolute -top-8 z-0 select-none">
                                {step.num}
                            </span>

                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold text-white mb-6 tracking-tight">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
