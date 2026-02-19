"use client";

import { motion } from "framer-motion";
import KineticSectionTitle from "../components/ui/KineticSectionTitle";
import Crosshair from "../components/ui/Crosshair";

export default function ProcessPage() {
    const steps = [
        {
            num: "01",
            title: "DISCOVERY & STRATEGY",
            desc: "We dive deep into your business goals, target audience, and functional requirements. We don't write a line of code until we understand exactly what you need."
        },
        {
            num: "02",
            title: "WIREFRAMING & UX",
            desc: "We create skeletal frameworks and interactive prototypes. This ensures the user flow is logical and intuitive before we apply visual design."
        },
        {
            num: "03",
            title: "UI DESIGN & BUILD",
            desc: "Our designers craft a stunning high-fidelity interface while our developers build the robust backend and frontend architecture using the latest tech stack."
        },
        {
            num: "04",
            title: "QA & TESTING",
            desc: "Rigorous testing across devices, browsers, and network conditions to ensure your site is bug-free and performs flawlessly."
        },
        {
            num: "05",
            title: "LAUNCH & SCALE",
            desc: "We handle the deployment process and provide post-launch support to help you scale as your user base grows."
        }
    ];

    return (
        <main className="min-h-screen bg-[#030303] pt-32 pb-32 px-6 relative overflow-hidden">
            {/* Tech Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto max-w-7xl relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 border-b border-white/5 pb-8">
                    <div>
                        <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 font-mono">
                            /// SYSTEM METHODOLOGY
                        </span>
                        <div className="mb-2">
                            <KineticSectionTitle title="THE PROTOCOL" className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9]" />
                        </div>
                    </div>
                    <p className="text-zinc-400 text-lg font-light max-w-md text-left mt-8 md:mt-0">
                        Precision engineered workflows for rapid deployment and scalable growth.
                    </p>
                </div>

                {/* Vertical Timeline - Technical Redesign */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-0 relative">

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative py-16 border-t border-white/5 ${index % 2 === 0 ? "md:border-r md:border-white/5 md:pr-16" : "md:pl-16 md:mt-32"
                                }`}
                        >
                            <Crosshair className="top-0 left-0 -translate-x-1/2 -translate-y-1/2 opacity-50" />

                            <span className="text-6xl md:text-8xl font-bold text-white/[0.03] font-mono absolute -top-8 z-0 select-none">
                                {step.num}
                            </span>

                            <div className="relative z-10 pl-4 border-l border-white/10">
                                <h3 className="text-2xl font-mono text-white mb-6 tracking-widest uppercase">
                                    {step.title}
                                </h3>
                                <p className="text-zinc-500 text-lg leading-relaxed font-light">
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
