"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Process", href: "/process" },
    { name: "Work", href: "/work" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Navigate then close — ensures touch tap registers before overlay animates away
    const handleMobileNav = (href: string) => {
        router.push(href);
        setTimeout(() => setIsMenuOpen(false), 50);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Handle window resize to close mobile menu on desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Toggle body scroll — restore on unmount too
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 border-b border-white/5 
                ${scrolled || isMenuOpen ? "bg-black/95 backdrop-blur-md py-4" : "bg-black/20 backdrop-blur-sm py-6"}`}
            >
                <div className="px-6 md:px-12 flex items-center justify-between max-w-[1400px] mx-auto">
                    {/* Logo - Left */}
                    <div className="flex-shrink-0 z-50">
                        <Link href="/" className="block" onClick={() => setIsMenuOpen(false)}>
                            <div className="w-8 h-8 relative">
                                <Image
                                    src="/Logo.svg"
                                    alt="Logo"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Menu - High Breakpoint for Tablet Clutter */}
                    <nav className="hidden lg:flex items-center gap-10">
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
                            className="hidden lg:flex items-center justify-center border border-white/20 px-6 py-2 text-[10px] font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Initialize Project
                        </Link>

                        {/* Mobile Menu Toggle - Shows on MD and LG */}
                        <button
                            className="lg:hidden text-white z-60"
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
            </header>

            {/* Mobile Menu Overlay - Technical Style */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[90] bg-black text-white flex flex-col pt-32 px-8 overflow-hidden md:hidden"
                    >
                        {/* Grid Texture */}
                        <div className="absolute inset-0 z-0 opacity-[0.05]"
                            style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                        />

                        <motion.div
                            className="flex flex-col gap-8 relative z-10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                        >
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.3 }}
                                >
                                    <button
                                        onClick={() => handleMobileNav(link.href)}
                                        className={`text-4xl font-light tracking-tight transition-all duration-300 block w-full text-left hover:pl-4
                                            ${pathname === link.href ? "text-white" : "text-white/50 hover:text-white"}`}
                                    >
                                        <span className="text-xs font-mono text-zinc-600 align-top mr-4">0{idx + 1}</span>
                                        {link.name}
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="mt-auto pb-12 border-t border-white/10 pt-8 relative z-10">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">System Contact</span>
                                <a href="mailto:anarvasystems2026@gmail.com" className="text-xl font-light tracking-wide hover:text-zinc-300 transition-colors">Say Hello!</a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
