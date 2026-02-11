"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
            setScrolled(window.scrollY > 50);
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
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "py-4" : "py-6"}`}>
            <div className="px-6 md:px-12 flex items-center justify-between">
                {/* Logo - Left */}
                <div className="flex-shrink-0 z-50">
                    <Link href="/" className="block" onClick={() => setIsMenuOpen(false)}>
                        <div className="w-10 h-10 flex items-center justify-center relative">
                            {/* Dynamic Logo Color based on Menu State */}
                            <div className={`transition-opacity duration-300 absolute inset-0 ${isMenuOpen ? "opacity-0" : "opacity-100"}`}>
                                <Image src="/Logo-dark1.png" alt="Logo" width={100} height={100} className="object-contain" />
                            </div>
                            {/* Dark Logo for White Menu */}
                            <div className={`transition-opacity duration-300 absolute inset-0 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}>
                                <Image src="/Logo.png" alt="Logo" width={100} height={100} className="object-contain invert brightness-0" />
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Desktop Menu - Glass Pill */}
                <nav className={`hidden md:flex items-center gap-1 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full p-1.5 absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${scrolled ? "bg-black/80 shadow-lg" : ""}`}>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`relative px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wide transition-all duration-300 ${isActive
                                    ? "bg-white text-black font-semibold"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Contact & Mobile Toggle - Right */}
                <div className="flex items-center gap-4 z-50">
                    <Link
                        href="/contact"
                        className={`hidden md:block text-xs font-bold uppercase tracking-widest border border-white/20 px-6 py-2.5 rounded-full transition-all hover:bg-white hover:text-black ${isMenuOpen ? "text-black border-black/20 hover:bg-black hover:text-white" : "text-white"}`}
                    >
                        Contact
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden relative p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Toggle Menu</span>
                        <div className="flex flex-col gap-1.5 items-end">
                            <span className={`block h-[2px] transition-all duration-300 ${isMenuOpen ? "w-6 rotate-45 translate-y-2 bg-black" : "w-8 bg-white"}`} />
                            <span className={`block h-[2px] transition-all duration-300 ${isMenuOpen ? "opacity-0 bg-black" : "w-6 bg-white"}`} />
                            <span className={`block h-[2px] transition-all duration-300 ${isMenuOpen ? "w-6 -rotate-45 -translate-y-2 bg-black" : "w-4 bg-white"}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - BRIGHT (White Background) */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-40 bg-white text-black flex flex-col pt-32 px-8 overflow-hidden"
                    >
                        <div className="flex flex-col gap-6">
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
                                        className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-300 hover:text-black hover:pl-4 transition-all duration-300 block"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-auto pb-12 border-t border-black/5 pt-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Get in touch</span>
                                <a href="mailto:hello@anarva.tech" className="text-2xl font-medium tracking-tight hover:underline">hello@anarva.tech</a>
                            </div>
                            <div className="flex gap-4 mt-6">
                                {["Twitter", "LinkedIn", "Instagram"].map(social => (
                                    <a key={social} href="#" className="text-sm font-medium border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors">
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
