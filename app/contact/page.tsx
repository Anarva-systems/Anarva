"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle2, ArrowRight, Monitor, Smartphone, Code2, Command, Shield, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PROJECT_TYPES = [
    { id: "web-design", label: "Web Design", icon: LayoutTemplate, desc: "UI/UX & Branding" },
    { id: "web-app", label: "Web App", icon: Monitor, desc: "React / Next.js" },
    { id: "mobile-app", label: "Mobile App", icon: Smartphone, desc: "iOS & Android" },
    { id: "custom", label: "Custom Dev", icon: Code2, desc: "API & Backend" },
];

const BUDGET_RANGES = ["$1k - $5k", "$5k - $10k", "$10k - $25k", "$25k+", "Other"];

export default function SubmitRequirementsLight() {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", company: "", phone: "", details: "" });
    const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
    const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[0]);
    const [customBudget, setCustomBudget] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setStatus("loading");

        const payload = {
            ...formData,
            projectType: PROJECT_TYPES.find(t => t.id === selectedType)?.label || selectedType,
            budget: selectedBudget === "Other" ? (customBudget || "Other") : selectedBudget,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", company: "", phone: "", details: "" });
                setSelectedBudget(BUDGET_RANGES[0]);
                setCustomBudget("");
                // Reset after 3 seconds
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    if (!mounted) {
        return (
            <main className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6 text-white selection:bg-[#00e6ff] selection:text-black">
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="mb-20">
                        <div className="flex items-center gap-2 mb-4 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                            <Command className="w-3 h-3" /> Initialization / Phase 01
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.85]">
                            Build the <span className="text-zinc-500 italic">future</span> <br /> with us.
                        </h1>
                    </div>
                    <div className="h-96 flex items-center justify-center">
                        <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest animate-pulse">
                            Loading Interface...
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-black pt-24 md:pt-32 pb-20 px-6 text-white selection:bg-[#00e6ff] selection:text-black">
            {/* Subtle Texture: Gallery Grid - White Dots for Dark Mode */}
            {/* <div className="fixed inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#fff 1.1px, transparent 1.1px), linear-gradient(90deg, #fff 1.1px, transparent 1.1px)`, backgroundSize: '40px 40px' }} /> */}

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                        <Command className="w-3 h-3" /> Initialization / Phase 01
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.85]">
                        Build the <span className="text-zinc-500 italic">future</span> <br /> with us.
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* LEFT COLUMN: The Form */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* 01. Domain Selection */}
                        <section>
                            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                                01 <span className="h-[1px] w-12 bg-white/10" /> Project Domain
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {PROJECT_TYPES.map((type) => (
                                    <button key={type.id} onClick={() => setSelectedType(type.id)}
                                        className={`relative p-8 rounded-xl border text-left transition-all duration-300
                                            ${selectedType === type.id
                                                ? "border-white bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.1)]"
                                                : "border-white/10 bg-white/5 hover:border-white/30 text-zinc-400"}`}>
                                        <type.icon className={`w-6 h-6 mb-6 ${selectedType === type.id ? "text-black" : "text-zinc-500"}`} />
                                        <div className={`font-bold text-base tracking-tight mb-1 ${selectedType === type.id ? "!text-black" : "text-white"}`}>
                                            {type.label}
                                        </div>
                                        <p className={`text-xs ${selectedType === type.id ? "text-black/60" : "text-zinc-600"}`}>{type.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 02. Budget Range Selection */}
                        <section>
                            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                                02 <span className="h-[1px] w-12 bg-white/10" /> Investment Scope
                            </h2>
                            <div className="flex flex-wrap gap-2 items-end">
                                {BUDGET_RANGES.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setSelectedBudget(range)}
                                        className={`px-6 py-3 rounded-full text-xs font-bold border transition-all
                                            ${selectedBudget === range
                                                ? "bg-white border-white text-black"
                                                : "bg-transparent border-white/10 text-zinc-500 hover:border-white/30"}`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence>
                                {selectedBudget === "Other" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="relative overflow-hidden max-w-xs pt-6"
                                    >
                                        <div className="relative">
                                            <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] absolute -top-6">
                                                Your Custom Budget ($)
                                            </label>
                                            <input
                                                type="text"
                                                name="customBudget"
                                                value={customBudget}
                                                onChange={(e) => setCustomBudget(e.target.value)}
                                                placeholder="e.g. $1,500"
                                                className="w-full bg-transparent border-b border-white/10 py-2 text-base font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/10 text-white"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* 03. Identity Details & Specifications */}
                        <section className="space-y-16">
                            <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                                03 <span className="h-[1px] w-12 bg-white/10" /> Specifications
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                <div className="group relative">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] absolute -top-6">
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Alexander Ross"
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/10 text-white"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] absolute -top-6">
                                        Professional Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@anarva.com"
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/10 text-white"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] absolute -top-6">
                                        Company / Organization
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Acme Corp (Optional)"
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/10 text-white"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] absolute -top-6">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. +91 9876543210"
                                        className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/10 text-white"
                                    />
                                </div>
                            </div>

                            <div className="relative pt-4">
                                <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] absolute -top-2">
                                    What are you building?
                                </label>
                                <textarea
                                    rows={3}
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-white transition-all placeholder:text-white/10 text-white resize-none"
                                    placeholder="Tell us about the project vision, high-level goals, features, and target budget..."
                                />
                            </div>
                        </section>

                        {/* Submit Action */}
                        <motion.button
                            onClick={handleSubmit}
                            disabled={status === "loading" || status === "success"}
                            whileHover={{ x: status === "loading" ? 0 : 10 }}
                            className="group flex items-center gap-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-3xl font-bold tracking-tighter text-white">
                                {status === "loading" ? "Processing..." : status === "success" ? "Requirement Received" : "Submit Requirements"}
                            </span>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-black transition-all shadow-xl
                                ${status === "success" ? "bg-emerald-500 scale-110" : "bg-white group-hover:bg-zinc-200"}
                            `}>
                                {status === "success" ? <CheckCircle2 className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                            </div>
                        </motion.button>

                        {status === "success" && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 font-medium">
                                We have received your query. Check your email for confirmation shortly.
                            </motion.p>
                        )}
                        {status === "error" && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-medium">
                                Something went wrong. Please check your connection or try again.
                            </motion.p>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar Metadata */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
                        <div className="bg-white/5 border border-white/10 p-10 rounded-2xl backdrop-blur-sm">
                            <Shield className="w-5 h-5 text-white mb-8" />
                            <p className="text-zinc-400 text-sm leading-relaxed mb-10 font-medium">
                                We utilize a specialized <span className="text-white">fixed-output methodology</span> to ensure your product launches on schedule with zero technical compromise.
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {['/Mohan.jpg', '/Lokesh.png'].map((src, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0a0a0f] overflow-hidden shadow-sm">
                                            <Image src={src} alt="Team" width={48} height={48} className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Direct Access</p>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">With Founders</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 space-y-5">
                            {["Global Delivery", "99.9% Uptime SLA", "End-to-end Encryption"].map((text) => (
                                <div key={text} className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}