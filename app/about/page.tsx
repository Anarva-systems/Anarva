"use client"
import { KineticText } from "../components/KineticText";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-black pt-32 pb-20 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Introduction */}
                <div className="mb-20">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        We are Anarva.
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
                        A digital product studio based in San Francisco, operating globally. We bridge the gap between heavy engineering and delicate design.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 border-y border-white/10 py-12">
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">5+</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Years</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">10+</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Projects</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">1m+</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Users Reached</div>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-white mb-2">100%</div>
                        <div className="text-sm text-zinc-500 uppercase tracking-wider">Success Rate</div>
                    </div>
                </div>

                {/* Mission */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Our Mission</h2>
                    <div className="prose prose-lg text-zinc-400">
                        <p className="mb-4 leading-relaxed">
                            The web is becoming increasingly complex. Users demand speed, interactivity, and beauty, while businesses need scalability and security.
                        </p>
                        <p className="mb-4 leading-relaxed">
                            At Anarva, our mission is to simplify this complexity. We build digital products that feel simple and intuitive to the user, but are powered by robust, industrial-grade engineering under the hood.
                        </p>
                        <p className="leading-relaxed">
                            We believe in &quot;weightless interfaces&quot;—designs that don&apos;t burden the user, but rather guide them effortlessly to their goal.
                        </p>
                    </div>
                </section>
                <KineticText />
            </div>
        </main>
    );
}
