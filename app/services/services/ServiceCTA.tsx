"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export function ServiceCTA() {
    return (
        <section className="py-32 bg-transparent flex items-center justify-center">
            <div className="container mx-auto px-6 max-w-4xl text-center">

                <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 font-geist tracking-tighter leading-[0.9]">
                    Ready to <br /> Build?
                </h2>
                <p className="text-zinc-400 text-xl max-w-xl mx-auto mb-12 font-light">
                    Let's turn your vision into a digital reality. Schedule a free discovery call with our product architects today.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-[var(--cyber-cyan)] text-black font-bold rounded-full hover:bg-white transition-colors flex items-center justify-center gap-3 w-fit"
                    >
                        Start Project
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                    <a
                        href="mailto:hello@anarva.com"
                        className="px-8 py-4 bg-transparent text-white font-medium rounded-full hover:bg-white/10 transition-colors flex items-center justify-center gap-3 border border-white/20 w-fit"
                    >
                        hello@anarva.com
                    </a>
                </div>
            </div>
        </section>
    );
}
