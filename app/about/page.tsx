"use client"
import HoverRevealText from "../components/ui/HoverRevealText";
import KineticSectionTitle from "../components/ui/KineticSectionTitle";
import Navbar from "../components/layout/Navbar"; // Assuming we want navbar here too since it's a page

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 relative overflow-hidden">
            {/* Tech Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto max-w-5xl relative z-10">
                {/* Introduction */}
                <div className="mb-32">
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-6">/// WHO WE ARE</span>
                    <KineticSectionTitle title="WE ARE ANARVA" className="text-6xl md:text-8xl font-light text-white mb-12 tracking-[-0.03em] leading-[0.9]" />

                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-3xl tracking-wide">
                        A digital product studio engineering the unseen. We bridge the gap between heavy technical infrastructure and delicate, weightless design.
                    </p>
                </div>


                {/* Stats - Technical Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-32">
                    {[
                        { val: "05+", label: "YEARS OPERATION" },
                        { val: "15+", label: "SYSTEMS DEPLOYED" },
                        { val: "12+", label: "GLOBAL NODES" },
                        { val: "99%", label: "UPTIME RETENTION" }
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#050505] p-8 hover:bg-[#0a0a0a] transition-colors group">
                            <div className="text-3xl md:text-4xl font-light text-white mb-2 group-hover:text-white transition-colors">{stat.val}</div>
                            <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest group-hover:text-zinc-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Mission */}
                <section className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-4">
                        <h2 className="text-xs font-mono text-white uppercase tracking-widest sticky top-32">/// OUR MISSION</h2>
                    </div>
                    <div className="md:col-span-8 prose prose-invert prose-lg text-zinc-400 font-light">
                        <p className="mb-8 leading-relaxed">
                            The web is becoming increasingly complex. Users demand speed, interactivity, and beauty, while businesses need scalability and security.
                        </p>
                        <p className="mb-8 leading-relaxed">
                            At Anarva, our mission is to simplify this complexity. We build digital products that feel simple and intuitive to the user, but are powered by robust, industrial-grade engineering under the hood.
                        </p>
                        <p className="leading-relaxed">
                            We believe in "weightless interfaces"—designs that don't burden the user, but rather guide them effortlessly to their goal with precision.
                        </p>
                    </div>
                </section>
                {/* Kinetic Text Interaction (User Request) */}
                <div className="mb-32 py-20 border-y border-white/5 flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-12">HOVER TO DECRYPT</span>
                    <div className="text-6xl md:text-9xl font-bold tracking-tighter text-white">
                        <HoverRevealText text="ANARVA" className="tracking-[-0.05em]" revealRadius={80} />
                    </div>
                </div>
            </div>
        </main>
    );
}
