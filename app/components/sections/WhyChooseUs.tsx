import { ShieldCheck, Zap, Layers } from "lucide-react";

const features = [
    {
        icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
        title: "Requirement-Driven",
        description: "We don't just guess. We build exactly what your business needs based on detailed analysis."
    },
    {
        icon: <Zap className="w-6 h-6 text-indigo-400" />,
        title: "High Performance",
        description: "Built on Next.js for blazing fast load times and SEO dominance."
    },
    {
        icon: <Layers className="w-6 h-6 text-indigo-400" />,
        title: "Scalable Architecture",
        description: "Clean, modular code that grows with your startup."
    }
];

export default function WhyChooseUs() {
    return (
        <section className="py-24 max-w-7xl mx-auto">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-slate-900 mb-4">
                        Why Visionaries Choose Anarva
                    </h2>
                    <p className="text-slate-500">
                        We bridge the gap between creative design and engineering rigor.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-8 rounded-2xl bg-transparent border border-slate-200 hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300">
                            <div className="mb-6 p-3 bg-indigo-50 rounded-lg w-fit">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-medium text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
