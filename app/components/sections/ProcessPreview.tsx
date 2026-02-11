import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
    { num: "01", title: "Discovery", desc: "We analyze your requirements." },
    { num: "02", title: "Strategy", desc: "Planning & Wireframing." },
    { num: "03", title: "Design", desc: "Crafting the visual experience." },
    { num: "04", title: "Development", desc: "Clean, robust coding." },
    { num: "05", title: "Launch", desc: "Deployment & Support." },
];

export default function ProcessPreview() {
    return (
        <section className="py-24 border-t border-slate-100 overflow-hidden relative max-w-7xl mx-auto">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-slate-900 mb-4">
                            Our Process
                        </h2>
                        <p className="text-slate-500">From concept to deployment in 5 steps.</p>
                    </div>
                    <Link href="/process" className="hidden md:flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors mt-4 md:mt-0">
                        View Full Process <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative p-6 pt-12 border-l border-slate-200 hover:bg-slate-50 transition-colors group">
                            <span className="absolute top-0 left-0 p-4 text-5xl font-bold text-slate-200/80 group-hover:text-indigo-100 transition-colors select-none">
                                {step.num}
                            </span>
                            <h3 className="text-lg font-medium text-slate-900 mb-2 relative z-10 pt-4">{step.title}</h3>
                            <p className="text-sm text-slate-500 relative z-10">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 md:hidden">
                    <Link href="/process" className="flex items-center gap-2 text-indigo-600 text-sm">
                        View Full Process <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
