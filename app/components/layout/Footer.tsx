"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";
import KineticSectionTitle from "../ui/KineticSectionTitle";

type FooterLink = {
    name: string;
    href: string;
    icon?: any;
};

const FOOTER_NAV: { title: string; links: FooterLink[] }[] = [
    {
        title: "SITEMAP", links: [ // Uppercase technical title
            { name: "HOME", href: "/" },
            { name: "SERVICES", href: "/services" },
            { name: "WORK", href: "/work" },
            { name: "PROCESS", href: "/process" },
        ]
    },
    {
        title: "COMPANY", links: [
            { name: "ABOUT", href: "/about" },
            { name: "CONTACT", href: "/contact" },
        ]
    },
    {
        title: "SOCIAL PROTOCOLS", links: [
            { name: "TWITTER", href: "https://x.com/AnarvaS55263", icon: Twitter },
            { name: "LINKEDIN", href: "https://www.linkedin.com/in/anarva-systems-1865163b1/", icon: Linkedin },
            { name: "INSTAGRAM", href: "https://www.instagram.com/anarva_systems/", icon: Instagram },
        ]
    }
];

export default function Footer() {
    return (
        <footer className="relative w-full bg-[#030303] overflow-hidden pt-24 border-t border-white/5">
            {/* Technical Grid Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />

            <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
                {/* 1. CTA Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-32 border-b border-white/5 pb-20">
                    <div className="max-w-3xl">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] block mb-8">/// INITIATE SEQUENCE</span>
                        <div className="mb-12">
                            {/* Replaced KineticSectionTitle with simple motion for reliability */}
                            <h2 className="text-5xl md:text-8xl font-light text-white tracking-[-0.04em] leading-[0.9]">
                                READY TO ARCHITECT THE IMPOSSIBLE?
                            </h2>
                        </div>

                        <Link href="/contact" className="group flex items-center gap-6 text-xl text-white font-mono uppercase tracking-widest hover:text-white transition-colors">
                            <span className="border-b border-white/30 pb-2 group-hover:border-white transition-all duration-300">Start System Deployment</span>
                            <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4" />
                            </div>
                        </Link>
                    </div>
                </div>

                {/* 2. Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-8">
                        <div className="w-10 h-10 opacity-80">
                            <Image src="/Logo.svg" alt="Logo" width={40} height={40} className="brightness-0 invert" />
                        </div>
                        <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest leading-relaxed max-w-xs">
                            ANARVA SYSTEMS<br />
                            PRECISION DIGITAL ENGINEERING<br />
                            EST. 2024 &bull; GLOBAL OPERATIONS
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
                        {FOOTER_NAV.map((section, idx) => (
                            <div key={idx} className="space-y-8">
                                <h4 className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.2em]">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest flex items-center gap-2 group">
                                                {link.name}
                                                {link.icon && <link.icon className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 duration-300" />}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Bottom Bar */}
                <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-600">
                    <span>&copy; {new Date().getFullYear()} ANARVA SYSTEMS INC.</span>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-zinc-400 transition-colors">Privacy Protocol</Link>
                        <Link href="/terms" className="hover:text-zinc-400 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
