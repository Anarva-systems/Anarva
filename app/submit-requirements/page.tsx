"use client";
import React, { useState } from "react";
import { CheckCircle2, ArrowRight, Monitor, Smartphone, Code2, Command, Shield, LayoutTemplate } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PROJECT_TYPES = [
    { id: "web-design", label: "Web Design", icon: LayoutTemplate, desc: "UI/UX & Branding" },
    { id: "web-app", label: "Web App", icon: Monitor, desc: "React / Next.js" },
    { id: "mobile-app", label: "Mobile App", icon: Smartphone, desc: "iOS & Android" },
    { id: "custom", label: "Custom Dev", icon: Code2, desc: "API & Backend" },
];

const BUDGET_RANGES = ["$0 - $5k", "$5k - $10k", "$10k - $25k", "$25k - $50k", "$50k+", "Undisclosed"];

export default function SubmitRequirementsLight() {
    const [formData, setFormData] = useState({ name: "", email: "", company: "", details: "" });
    const [selectedType, setSelectedType] = useState(PROJECT_TYPES[0].id);
    const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[0]);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setStatus("loading");

        const payload = {
            ...formData,
            projectType: PROJECT_TYPES.find(t => t.id === selectedType)?.label || selectedType,
            budget: selectedBudget
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", company: "", details: "" });
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

    return (
        <main className="min-h-screen bg-[#FDFDFD] pt-32 pb-20 px-6 text-zinc-900 selection:bg-zinc-900 selection:text-white">
            {/* Subtle Texture: Gallery Grid */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#000 1.1px, transparent 1.1px), linear-gradient(90deg, #000 1.1px, transparent 1.1px)`, backgroundSize: '40px 40px' }} />

            <div className="container mx-auto max-w-6xl relative z-10">
                {/* Header */}
                <div className="mb-20">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4 text-zinc-400 font-mono text-[10px] uppercase tracking-[0.3em]">
                        <Command className="w-3 h-3" /> Initialization / Phase 01
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.85]">
                        Build the <span className="text-zinc-300 italic">future</span> <br /> with us.
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* LEFT COLUMN: The Form */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* 01. Domain Selection */}
                        <section>
                            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                                01 <span className="h-[1px] w-12 bg-zinc-200" /> Project Domain
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {PROJECT_TYPES.map((type) => (
                                    <button key={type.id} onClick={() => setSelectedType(type.id)}
                                        className={`relative p-8 rounded-xl border text-left transition-all duration-300
                                            ${selectedType === type.id
                                                ? "border-zinc-900 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]"
                                                : "border-zinc-100 bg-zinc-50/50 hover:border-zinc-300"}`}>
                                        <type.icon className={`w-6 h-6 mb-6 ${selectedType === type.id ? "text-zinc-900" : "text-zinc-300"}`} />
                                        <h3 className="font-bold text-base tracking-tight">{type.label}</h3>
                                        <p className="text-xs text-zinc-500 mt-1">{type.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 02. Budget Range Selection */}
                        <section>
                            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                                02 <span className="h-[1px] w-12 bg-zinc-200" /> Investment Scope
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {BUDGET_RANGES.map((range) => (
                                    <button
                                        key={range}
                                        onClick={() => setSelectedBudget(range)}
                                        className={`px-6 py-3 rounded-full text-xs font-bold border transition-all
                                            ${selectedBudget === range
                                                ? "bg-zinc-900 border-zinc-900 text-white"
                                                : "bg-white border-zinc-100 text-zinc-500 hover:border-zinc-900"}`}
                                    >
                                        {range}
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 03. Identity Details */}
                        <section className="space-y-16">
                            <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
                                03 <span className="h-[1px] w-12 bg-zinc-200" /> Specifications
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                                <div className="group relative">
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] absolute -top-6">
                                        Your Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="e.g. Alexander Ross"
                                        className="w-full bg-transparent border-b border-zinc-200 py-4 text-xl font-medium focus:outline-none focus:border-zinc-900 transition-all placeholder:text-zinc-200"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] absolute -top-6">
                                        Professional Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="alex@venture.com"
                                        className="w-full bg-transparent border-b border-zinc-200 py-4 text-xl font-medium focus:outline-none focus:border-zinc-900 transition-all placeholder:text-zinc-200"
                                    />
                                </div>
                                <div className="group relative md:col-span-2">
                                    <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] absolute -top-6">
                                        Company / Organization
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="e.g. Acme Corp (Optional)"
                                        className="w-full bg-transparent border-b border-zinc-200 py-4 text-xl font-medium focus:outline-none focus:border-zinc-900 transition-all placeholder:text-zinc-200"
                                    />
                                </div>
                            </div>

                            <div className="relative pt-4">
                                <label className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em] absolute -top-2">
                                    Tell us about the project vision
                                </label>
                                <textarea
                                    rows={2}
                                    name="details"
                                    value={formData.details}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-zinc-200 py-4 text-xl font-medium focus:outline-none focus:border-zinc-900 transition-all placeholder:text-zinc-200 resize-none"
                                    placeholder="High-level goals and features..."
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
                            <span className="text-3xl font-bold tracking-tighter">
                                {status === "loading" ? "Processing..." : status === "success" ? "Requirement Received" : "Submit Requirements"}
                            </span>
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all shadow-xl
                                ${status === "success" ? "bg-emerald-500 scale-110" : "bg-zinc-900 group-hover:bg-zinc-800"}
                            `}>
                                {status === "success" ? <CheckCircle2 className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
                            </div>
                        </motion.button>

                        {status === "success" && (
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-600 font-medium">
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
                        <div className="bg-white border border-zinc-100 p-10 rounded-2xl shadow-[0_30px_60px_-20px_rgba(0,0,0,0.05)]">
                            <Shield className="w-5 h-5 text-zinc-900 mb-8" />
                            <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-medium">
                                We utilize a specialized <span className="text-zinc-900">fixed-output methodology</span> to ensure your product launches on schedule with zero technical compromise.
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {['/Mohan.jpg', '/Lokesh.png'].map((src, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-sm">
                                            <Image src={src} alt="Team" width={48} height={48} className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-zinc-900">Direct Access</p>
                                    <p className="text-[10px] text-zinc-400 font-mono uppercase">With Founders</p>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 space-y-5">
                            {["Global Delivery", "99.9% Uptime SLA", "End-to-end Encryption"].map((text) => (
                                <div key={text} className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
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