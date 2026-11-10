"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* =============================================
   STATS DATA
   ============================================= */
const STATS = [
    {
        label: "Years of Experience",
        value: "4+",
        description: "Built on years of real-world projects",
    },
    {
        label: "Brands Transformed",
        value: "50+",
        description: "Helping brands evolve and stand out",
    },
    {
        label: "Client Retention Rate",
        value: "98%",
        description: "Clients who stay, project after project",
    },
    {
        label: "Projects Delivered",
        value: "97+",
        description: "End-to-end digital products shipped",
    },
];

/* =============================================
   CLIENT LOGOS (text-based)
   ============================================= */
const CLIENT_LOGOS = [
    "Aurum",
    "GymFlow",
    "Elevate",
    "VendorSync",
    "Deriverse",
    "CyberSentinel",
];

/* =============================================
   ANIMATION VARIANTS
   ============================================= */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

/* =============================================
   ABOUT SECTION — "WHO WE ARE"
   ============================================= */
export default function AboutSection() {
    return (
        <section className="relative w-full bg-[#f5f5f0] text-black overflow-hidden">
            {/* ── Top Grid: 3-Column Layout ── */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-12">
                {/* Section Label */}
                <motion.div
                    className="flex items-center gap-2 mb-10"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                >
                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
                        + WHO WE ARE
                    </span>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
                    {/* Left Column — Headline */}
                    <motion.div
                        className="lg:col-span-5"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.1}
                    >
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight"
                            style={{ color: "#1a1a1a" }}
                        >
                            <span className="font-light" style={{ color: "#999" }}>Aligned</span> with
                            <br />
                            your mission
                        </h2>
                    </motion.div>

                    {/* Right Column — Description */}
                    <motion.div
                        className="lg:col-span-4 lg:col-start-9 flex flex-col justify-start"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2}
                    >
                        <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
                            We work closely with our clients to turn ideas into
                            clear, compelling brands and digital experiences.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ── Quote + Logos Row ── */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Quote Card */}
                    <motion.div
                        className="lg:col-span-4 flex flex-col gap-6 border border-neutral-200 rounded-2xl p-8 bg-white"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.3}
                    >
                        {/* Quote Icon */}
                        <svg
                            className="w-8 h-8 text-neutral-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M6 17h3l2-4V7H5v6h3l-2 4zm8 0h3l2-4V7h-6v6h3l-2 4z" />
                        </svg>

                        <p className="text-sm md:text-base text-neutral-700 leading-relaxed">
                            We believe in{" "}
                            <strong className="text-black">
                                clarity over complexity
                            </strong>
                            , and creativity over conformity,{" "}
                            <span className="text-neutral-500">
                                because the best work is both
                            </span>{" "}
                            <strong className="text-black">
                                simple and distinctive.
                            </strong>
                        </p>

                        {/* Founder */}
                        <div className="flex items-center gap-3 mt-auto">
                            <div className="w-10 h-10 rounded-full overflow-hidden relative bg-neutral-200">
                                <Image
                                    src="/Mohan.jpg"
                                    alt="Mohan"
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-black">
                                    Mohan
                                </div>
                                <div className="text-xs text-neutral-400 font-mono uppercase tracking-wider">
                                    Founder, Anarva
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Client Logos Strip */}
                    <motion.div
                        className="lg:col-span-5 flex items-center border border-neutral-200 rounded-2xl bg-white px-8 py-6 overflow-hidden"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.4}
                    >
                        <div
                            className="flex items-center gap-10 w-full overflow-x-auto"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                        >
                            {CLIENT_LOGOS.map((logo) => (
                                <span
                                    key={logo}
                                    className="text-sm md:text-base font-bold text-neutral-400 whitespace-nowrap tracking-wide hover:text-black transition-colors duration-300 cursor-default"
                                >
                                    {logo}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* "Inside the studio" CTA */}
                    <motion.div
                        className="lg:col-span-3 flex flex-col justify-between border border-neutral-200 rounded-2xl bg-white p-8"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.5}
                    >
                        <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400 mb-4 block">
                            Meet the people behind the work
                        </span>
                        <Link
                            href="/about"
                            className="group flex items-center justify-between w-full px-5 py-3 border border-neutral-200 rounded-lg hover:border-black hover:bg-black hover:text-white transition-all duration-300 text-sm font-medium text-black"
                        >
                            Inside the studio
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* ── Stats Grid ── */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-neutral-200 rounded-2xl overflow-hidden bg-white">
                    {STATS.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            className={`flex flex-col p-8 md:p-10 ${
                                idx < STATS.length - 1
                                    ? "border-b sm:border-b-0 sm:border-r border-neutral-200"
                                    : ""
                            } ${
                                idx === 1
                                    ? "sm:border-r border-neutral-200"
                                    : ""
                            }`}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={0.3 + idx * 0.1}
                        >
                            {/* Dots indicator */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(Math.min(idx + 1, 4))].map(
                                    (_, d) => (
                                        <div
                                            key={d}
                                            className="w-1.5 h-1.5 rounded-full bg-neutral-300"
                                        />
                                    )
                                )}
                            </div>

                            <span className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-400 mb-6">
                                {stat.label}
                            </span>

                            <span
                                className="text-5xl md:text-6xl font-black leading-none mb-3"
                                style={{ color: "#1a1a1a" }}
                            >
                                {stat.value}
                            </span>

                            <span className="text-sm text-neutral-500 leading-relaxed">
                                {stat.description}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
