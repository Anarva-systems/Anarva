"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Palette, Code, BrainCircuit, Cpu, Globe, Diamond, Layers, Box, Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import { BentoGrid } from "./BentoGrid";

// Dynamically import the heavy 3D/Particle component
const ServiceParticles = dynamic(() => import("./service-particles/ServiceParticles"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-950 animate-pulse" />
});

const SERVICES = [
  {
    id: "design",
    title: "Product Design",
    label: "DESIGN",
    description: "End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff.",
    color: "#818cf8", // Indigo
    features: ["User Research & Strategy", "UX Flows & Wireframes", "UI Systems & Prototypes", "Design Ops & Handoff"],
    tools: [
      { name: "Figma", icon: <Palette className="w-6 h-6" /> },
      { name: "Sketch", icon: <Diamond className="w-6 h-6" /> },
      { name: "Adobe XD", icon: <Layers className="w-6 h-6" /> },
    ]
  },
  {
    id: "ai",
    title: "AI Development",
    label: "AI",
    description: "Building production-ready AI systems, from LLM orchestration and RAG pipelines to fine-tuned custom models.",
    color: "#c084fc", // Purple
    features: ["LLM Agents", "Fine-tuning", "Vector DBs", "Model Evals"],
    tools: [
      { name: "PyTorch", icon: <BrainCircuit className="w-6 h-6" /> },
      { name: "LangChain", icon: <Globe className="w-6 h-6" /> },
      { name: "Python", icon: <Terminal className="w-6 h-6" /> }
    ]
  },
  {
    id: "dev",
    title: "Engineering",
    label: "DEV",
    description: "Robust, scalable architecture built for performance. We specialize in Next.js, TypeScript, and cloud-native infrastructure.",
    color: "#94a3b8", // Slate
    features: ["Frontend Arch", "API Design", "DevOps", "Performance Ops"],
    tools: [
      { name: "Next.js", icon: <Code className="w-6 h-6" /> },
      { name: "React", icon: <Cpu className="w-6 h-6" /> },
      { name: "Node.js", icon: <Terminal className="w-6 h-6" /> }
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState(SERVICES[0]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main className="bg-white">
      {/* Hero Header */}
      <section className="container mx-auto px-6 pt-32 pb-20 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 font-outfit">
            Our Services<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed">
            We bridge the gap between imagination and execution with precision-engineered digital solutions.
          </p>
        </motion.div>
      </section>

      {/* Sticky Scroll Section */}
      <div ref={containerRef} className="relative flex flex-col lg:flex-row">

        {/* LEFT COLUMN: The Visual Engine (Sticky) */}
        <div className="hidden lg:block w-1/2 h-screen sticky top-0 bg-slate-950 overflow-hidden">
          {/* Background Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeService.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="text-[12vw] font-black text-white select-none leading-none text-center"
                style={{ WebkitTextStroke: "2px rgba(255, 255, 255, 1)", color: "transparent" }}
              >
                {activeService.label}
              </motion.h2>
            </AnimatePresence>
          </div>

          <ServiceParticles
            activeId={activeService.id}
            color={activeService.color}
            scrollProgress={smoothProgress}
          />

          {/* Vignette & Gradient Shimmer */}
          <div className="absolute inset-0 bg-radial-at-t from-transparent to-slate-950/80 pointer-events-none" />
        </div>

        {/* RIGHT COLUMN: The Content (Scrollable) */}
        <div className="w-full lg:w-1/2 px-6 md:px-12 lg:px-20">
          {SERVICES.map((service, index) => (
            <ServiceSection
              key={service.id}
              service={service}
              index={index}
              onVisible={() => setActiveService(service)}
            />
          ))}
        </div>
      </div>

      {/* Footer Buffer */}
      <div className="h-[20vh] bg-white" />
      <BentoGrid />
    </main>
  );
}

function ServiceSection({ service, index, onVisible }: { service: typeof SERVICES[0], index: number, onVisible: () => void }) {
  const ref = useRef(null);

  // Update the global state when this section enters the center of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onVisible();
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible]);

  return (
    <motion.section
      ref={ref}
      className="min-h-screen flex flex-col justify-center py-24 border-b border-slate-100 last:border-0"
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="group cursor-default">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-indigo-500 font-mono text-sm font-bold tracking-widest">0{index + 1}</span>
          <div className="h-[1px] w-12 bg-indigo-100 group-hover:w-24 transition-all duration-700 ease-in-out" />
        </div>

        <h3 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight group-hover:text-indigo-600 transition-colors duration-500">
          {service.title}
        </h3>

        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed max-w-xl mb-12 font-light">
          {service.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-6">Deliverables</h4>
            <ul className="space-y-4">
              {service.features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold mb-6">Tools</h4>
              <div className="grid grid-cols-2 gap-4">
                {service.tools.map((t) => (
                  <div key={t.name} className="flex items-center gap-3 text-slate-900 font-semibold bg-slate-50 w-fit px-4 py-2 rounded-full border border-slate-100 transition-colors hover:bg-white hover:border-indigo-200">
                    {t.icon}
                    <span className="text-sm">{t.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="mt-12 flex items-center gap-2 text-indigo-600 font-bold group/btn">
              View Case Studies
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}