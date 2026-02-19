"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Process", href: "/process" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Toggle body scroll
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMenuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-white/5 
            ${scrolled || isMenuOpen ? "bg-black/90 backdrop-blur-md py-4" : "bg-transparent py-6"}`}
        >
            <div className="px-6 md:px-12 flex items-center justify-between max-w-[1400px] mx-auto">
                {/* Logo - Left */}
                <div className="flex-shrink-0 z-50">
                    <Link href="/" className="block" onClick={() => setIsMenuOpen(false)}>
                        <div className="w-8 h-8 relative">
                            <Image
                                src="/Logo-dark1.png"
                                alt="Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu - Technical Bar */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${isActive
                                    ? "text-white"
                                    : "text-zinc-500 hover:text-white"
                                    }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 w-full h-[1px] bg-white"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Contact & Mobile Toggle - Right */}
                <div className="flex items-center gap-6 z-50">
                    <Link
                        href="/contact"
                        className="hidden md:flex items-center justify-center border border-white/20 px-6 py-2 text-[10px] font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Initialize Project
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="2" y1="8" x2="22" y2="8" />
                                <line x1="2" y1="16" x2="14" y2="16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - Technical Style */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-black text-white flex flex-col pt-32 px-8 overflow-hidden"
                    >
                        {/* Grid Texture */}
                        <div className="absolute inset-0 z-0 opacity-[0.05]"
                            style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                        />

                        <div className="flex flex-col gap-8 relative z-10">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-4xl font-light tracking-tight text-white/50 hover:text-white hover:pl-4 transition-all duration-300 block"
                                    >
                                        <span className="text-xs font-mono text-zinc-600 align-top mr-4">0{idx + 1}</span>
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto pb-12 border-t border-white/10 pt-8 relative z-10">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">System Contact</span>
                                <a href="mailto:hello@anarva.tech" className="text-xl font-light tracking-wide hover:text-zinc-300 transition-colors">hello@anarva.tech</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
