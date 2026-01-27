import { StepForward, CheckCircle, Smartphone, Code, Rocket } from "lucide-react";

export default function ProcessPage() {
    const steps = [
        {
            num: "01",
            icon: <StepForward className="w-6 h-6" />,
            title: "Discovery & Strategy",
            desc: "We dive deep into your business goals, target audience, and functional requirements. We don't write a line of code until we understand exactly what you need."
        },
        {
            num: "02",
            icon: <Smartphone className="w-6 h-6" />,
            title: "Wireframing & UX Design",
            desc: "We create skeletal frameworks and interactive prototypes. This ensures the user flow is logical and intuitive before we apply visual design."
        },
        {
            num: "03",
            icon: <Code className="w-6 h-6" />,
            title: "UI Design & Development",
            desc: "Our designers craft a stunning high-fidelity interface while our developers build the robust backend and frontend architecture using the latest tech stack."
        },
        {
            num: "04",
            icon: <CheckCircle className="w-6 h-6" />,
            title: "QA & Testing",
            desc: "Rigorous testing across devices, browsers, and network conditions to ensure your site is bug-free and performs flawlessly."
        },
        {
            num: "05",
            icon: <Rocket className="w-6 h-6" />,
            title: "Launch & Scale",
            desc: "We handle the deployment process and provide post-launch support to help you scale as your user base grows."
        }
    ];

    return (
        <main className="min-h-screen bg-white pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tighter text-slate-900 mb-6">
                        The Anarva Process
                    </h1>
                    <p className="text-slate-500 text-lg uppercase tracking-widest text-sm font-medium text-indigo-600">
                        Precision Engineered
                    </p>
                </div>

                <div className="relative border-l border-slate-200 ml-6 md:ml-12 space-y-12">
                    {steps.map((step, index) => (
                        <div key={index} className="relative pl-8 md:pl-12">
                            <span className="absolute -left-[14px] top-0 flex items-center justify-center w-7 h-7 rounded-full bg-white border border-indigo-500 text-indigo-600 text-xs font-bold">
                                {index + 1}
                            </span>

                            <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-indigo-500/50 hover:shadow-lg transition-all duration-300">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-2xl font-medium text-slate-900">{step.title}</h3>
                                </div>
                                <p className="text-slate-500 leading-relaxed">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
