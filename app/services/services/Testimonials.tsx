"use client";

import { motion } from "framer-motion";

const REVIEWS = [
    {
        text: "Anarva didn't just build our platform; they reimagined our entire digital strategy. The AI integration alone saved us 40+ hours a week.",
        author: "Elena R.",
        role: "CTO, FinEdge Global"
    },
    {
        text: "The level of engineering rigor coupled with world-class design is rare. They delivered a complex React application 2 weeks ahead of schedule.",
        author: "Marcus J.",
        role: "VP of Product, NexusHealth"
    },
    {
        text: "We needed a partner who understood Web3 and high-performance UX. Anarva delivered beyond expectations.",
        author: "Sarah L.",
        role: "Founder, BlockChain Ventures"
    }
];

export function Testimonials() {
    return (
        <section className="py-16 md:py-32 border-b border-white/10">
            <div className="container mx-auto px-6 max-w-7xl">
                <h2 className="text-xs font-mono font-bold text-zinc-500 tracking-widest uppercase mb-16 px-1">
                    Perspectives
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {REVIEWS.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative"
                        >
                            <p className="text-white text-xl leading-relaxed mb-8 font-light tracking-wide">
                                "{review.text}"
                            </p>

                            <div className="border-t border-white/10 pt-6">
                                <div className="font-bold text-white text-sm tracking-wide">{review.author}</div>
                                <div className="text-zinc-500 text-xs font-mono uppercase tracking-wider mt-1">
                                    {review.role}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
