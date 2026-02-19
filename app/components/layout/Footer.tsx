"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram } from "lucide-react";
import Image from "next/image";

type FooterLink = {
    name: string;
    href: string;
    icon?: any;
};

const FOOTER_NAV: { title: string; links: FooterLink[] }[] = [
    {
        title: "Sitemap", links: [
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: "Work", href: "/work" },
            { name: "Process", href: "/process" },
        ]
    },
    {
        title: "Company", links: [
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
        ]
    },
    {
        title: "Socials", links: [
            { name: "Twitter", href: "https://x.com/AnarvaS55263", icon: Twitter },
            { name: "LinkedIn", href: "https://www.linkedin.com/in/anarva-systems-1865163b1/", icon: Linkedin },
            { name: "Instagram", href: "https://www.instagram.com/anarva_systems/", icon: Instagram },
            { name: "GitHub", href: "https://github.com/Anarva-systems", icon: Github },
        ]
    }
];

export default function Footer() {
    return (
        <footer className="relative w-full bg-[var(--obsidian)] overflow-hidden pt-20 border-t border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
            />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* 1. CTA Section */}
                <div className="flex flex-col md:flex-row justify-between items-start mb-32">
                    <div className="max-w-2xl">
                        <h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
                            Ready to <br />
                            <span className="text-zinc-500 italic font-serif">transcend?</span>
                        </h2>
                        <Link href="/contact" className="group flex items-center gap-4 text-xl text-white font-medium hover:text-[var(--cyber-cyan)] transition-colors">
                            <span className="border-b border-white/30 pb-1 group-hover:border-[var(--cyber-cyan)] transition-colors">Start a Project</span>
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* 2. Navigation Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-1 space-y-8">
                        <div className="w-12 h-12">
                            <Image src="/Logo-dark.png" alt="Logo" width={40} height={40} />
                        </div>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                            Engineering digital reality. <br />
                            India &bull; <Image src="/globe.svg" alt="Globe" width={20} height={20} />
                        </p>
                    </div>

                    {FOOTER_NAV.map((section, idx) => (
                        <div key={idx} className="space-y-6">
                            <h4 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link href={link.href} className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                                            {link.name}
                                            {link.icon && <link.icon className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 transition-opacity" />}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
