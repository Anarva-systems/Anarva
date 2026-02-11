"use client";

import { motion } from "framer-motion";

const STATS = [
    { label: "Client Retention", value: "98%" },
    { label: "Projects Delivered", value: "150+" },
    { label: "Countries Served", value: "12" },
    { label: "Design Awards", value: "24" },
];

export function WhyChooseUs() {
    return (
        <section className="py-32 border-b border-white/10">
            <div className="container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    {/* Left Content */}
                    <div>
                        <span className="block text-xs font-bold text-[var(--cyber-cyan)] uppercase tracking-widest mb-6 font-mono">
                            The Anarva Standard
                        </span>
                        <h2 className="text-5xl md:text-6xl font-bold mb-8 font-geist tracking-tighter text-white leading-[0.95]">
                            Built for <br />
                            Scale & Speed.
                        </h2>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-12 max-w-md font-light">
                            We don't just write code; we engineer outcomes. Our team consists of senior talent from top tech companies, bringing enterprise-grade rigor to every project.
                        </p>

                        <div className="space-y-4">
                            {[
                                "Battle-Tested Tech Stack",
                                "SEO-First Architecture",
                                "Pixel-Perfect Implementation",
                                "Dedicated Project Manager"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 py-3 border-b border-white/10">
                                    <span className="text-xs font-mono text-zinc-500">0{i + 1}</span>
                                    <span className="text-zinc-200 font-medium tracking-wide">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Stats Grid */}
                    <div className="grid grid-cols-2">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-12 border border-white/10 -ml-[1px] -mt-[1px] flex flex-col justify-center bg-white/5 aspect-square"
                            >
                                <div className="text-5xl md:text-6xl font-bold text-white mb-4 font-geist tracking-tighter">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-semibold font-mono">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
