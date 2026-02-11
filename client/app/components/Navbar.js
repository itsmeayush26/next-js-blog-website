"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                    GIAKAA
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
                    <Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link>
                    <Link href="/services" className="hover:text-gray-300 transition-colors">Services</Link>
                    <Link href="/contact" className="btn-primary text-sm px-5 py-2">
                        Let's Talk
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-black border-t border-white/10">
                    <div className="flex flex-col p-6 space-y-4">
                        <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
                        <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
                        <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
                        <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
