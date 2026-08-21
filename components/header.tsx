'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (pathname === '/' || pathname === '/register' || pathname === '/players/info') {
        return null;
    }

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/contact', label: 'Contact Us' },
        { href: '/rules', label: 'Rules & Regulations' },
        { href: '/sponsors', label: 'Sponsors' },
        { href: '/about', label: 'About Us' },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/80">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative">
                            {/* SPL Logo - Stylized version based on description */}
                            <div className="relative flex items-center justify-center">
                                {/* Background glow effect */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-orange-500/20 blur-xl"></div>
                                
                                {/* Logo container */}
                                <div className="relative flex items-center space-x-1 px-3 py-2">
                                    {/* S Letter */}
                                    <span className="text-3xl font-black bg-gradient-to-b from-pink-500 via-magenta-500 to-orange-500 bg-clip-text text-transparent">
                                        S
                                    </span>
                                    {/* P Letter */}
                                    <span className="text-3xl font-black bg-gradient-to-b from-orange-500 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                                        P
                                    </span>
                                    {/* L Letter */}
                                    <span className="text-3xl font-black bg-gradient-to-b from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                                        L
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">Super Premier League</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? 'text-[#FF6B00] bg-slate-800'
                                        : 'text-slate-300 hover:text-[#FF6B00] hover:bg-slate-800/50'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/register">
                            <Button className="ml-4 bg-[#FF6B00] hover:bg-[#e55f00] text-white">
                                Register
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-slate-300 hover:text-[#FF6B00]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-slate-800 py-4">
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(link.href)
                                        ? 'text-[#FF6B00] bg-slate-800'
                                        : 'text-slate-300 hover:text-[#FF6B00] hover:bg-slate-800/50'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full mt-2 bg-[#FF6B00] hover:bg-[#e55f00] text-white">
                                    Register
                                </Button>
                            </Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

