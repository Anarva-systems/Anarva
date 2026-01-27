"use client";
import { motion } from "framer-motion";

const templates = [
  { name: "Aura", category: "Minimalist", img: "bg-slate-200" },
  { name: "Vortex", category: "Tech-Focused", img: "bg-indigo-100" },
  { name: "Kinetix", category: "Dynamic", img: "bg-emerald-50" },
  { name: "Nova", category: "E-commerce", img: "bg-rose-50" },
];

export default function TemplateSlider() {
  return (
    <section className="py-24 bg-slate-50/50 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-light tracking-tight mb-12">Featured Blueprints</h2>
        
        <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide">
          {templates.map((tpl, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="min-w-[300px] md:min-w-[450px] snap-center"
            >
              <div className={`h-[300px] ${tpl.img} rounded-3xl border border-slate-200 mb-4 overflow-hidden relative group`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
              </div>
              <p className="text-sm font-medium text-indigo-600 uppercase tracking-widest">{tpl.category}</p>
              <h4 className="text-xl font-semibold text-slate-900">{tpl.name}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}