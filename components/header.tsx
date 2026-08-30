'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { SplLogo } from '@/components/spl-logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (pathname === '/register' || pathname === '/players/info') {
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
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#050505]/95 backdrop-blur supports-[backdrop-filter]:bg-[#050505]/80">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5">
                        <div className="relative">
                            <div className="absolute inset-0 rounded-full bg-[#FF6B00]/25 blur-lg" />
                            <SplLogo className="relative h-12 w-12" />
                        </div>
                        <span className="hidden whitespace-nowrap text-xl font-bold text-white sm:block lg:hidden xl:block">Super Premier League</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`whitespace-nowrap px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    isActive(link.href)
                                        ? 'text-[#FF6B00] bg-white/10'
                                        : 'text-neutral-300 hover:text-[#FF6B00] hover:bg-white/10'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link href="/register">
                            <Button className="ml-3 bg-[#FF6B00] hover:bg-[#e55f00] text-white">
                                Register
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile / Tablet Menu Button */}
                    <button
                        className="lg:hidden p-2 text-neutral-300 hover:text-[#FF6B00]"
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

                {/* Mobile / Tablet Navigation */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-white/10 py-4">
                        <nav className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                        isActive(link.href)
                                        ? 'text-[#FF6B00] bg-white/10'
                                        : 'text-neutral-300 hover:text-[#FF6B00] hover:bg-white/10'
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

