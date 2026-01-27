"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
            <div className="container mx-auto px-6 h-20 flex justify-between items-center whitespace-nowrap">

                {/* [Logo Sector] */}
                <div className="flex items-center border-r border-black/5 pr-8 relative h-full">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-8 h-8 overflow-hidden rounded-full bg-slate-900 flex items-center justify-center text-white">
                            <Image src='/logo.png' alt="logo" width={30} height={30} className="object-cover" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-slate-900 group-hover:text-indigo-600 transition-colors">
                            Anarva
                        </span>
                    </Link>
                </div>

                {/* [Navigation Sector] */}
                <div className="flex items-center justify-end flex-1 pl-8">

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 mr-8">
                        {['Services', 'Process', 'Work', 'About'].map((item) => (
                            <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-indigo-600 transition-colors relative group">
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-indigo-600 transition-all group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/submit-requirements"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-indigo-600 transition-colors"
                        >
                            Start Project
                            <ArrowRight className="w-3 h-3" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-slate-900 z-50 relative"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-[#FAFAFA] z-40 flex flex-col justify-center items-center md:hidden">
                    <nav className="flex flex-col items-center gap-8 text-2xl font-bold tracking-tight text-slate-900">
                        <Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
                        <Link href="/process" onClick={() => setIsMenuOpen(false)}>Process</Link>
                        <Link href="/projects" onClick={() => setIsMenuOpen(false)}>Work</Link>
                        <Link href="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
                        <Link
                            href="/submit-requirements"
                            className="mt-4 flex items-center gap-2 px-8 py-4 bg-slate-900 text-white text-sm font-mono uppercase tracking-widest"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Start Project <ArrowRight className="w-4 h-4" />
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
