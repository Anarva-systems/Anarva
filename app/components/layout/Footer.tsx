import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-black pt-20 pb-10 z-10 rounded-t-6xl overflow-y-hidden rounded-t-4xl">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                            Anarva
                        </Link>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            We build industrial-grade digital products for forward-thinking companies.
                            Turning complex requirements into seamless experiences.
                        </p>
                        <div className="flex gap-4 text-zinc-400">
                            <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                            <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-medium mb-6">Company</h3>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/projects" className="hover:text-white transition-colors">Our Work</Link></li>
                            <li><Link href="/process" className="hover:text-white transition-colors">The Process</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-medium mb-6">Services</h3>
                        <ul className="space-y-4 text-sm text-zinc-400">
                            <li><Link href="/services" className="hover:text-white transition-colors">Web Design</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Development</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">UI/UX Design</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors">Support & Scaling</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-medium mb-6">Stay Updated</h3>
                        <p className="text-zinc-400 text-sm mb-4">
                            Get the latest insights on web tech and design.
                        </p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="bg-zinc-900 border border-zinc-800 rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
                    <p>© 2026 Anarva Design Studio. All rights reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-zinc-300">Privacy Policy</Link>
                        <Link href="#" className="hover:text-zinc-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
