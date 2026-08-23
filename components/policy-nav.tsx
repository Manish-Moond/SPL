'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Receipt, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LINKS = [
    { href: '/rules', label: 'Rules & Regulations', icon: FileText },
    { href: '/cancellation-refund', label: 'Cancellation & Refund Policy', icon: Receipt },
    { href: '/privacy', label: 'Privacy Policy', icon: Shield },
    { href: '/terms', label: 'Terms & Conditions', icon: FileText },
];

export function PolicyNav() {
    const pathname = usePathname();

    return (
        <div className="mb-8 flex justify-center">
            <div className="flex flex-wrap gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
                {LINKS.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link key={href} href={href}>
                            <Button
                                variant="ghost"
                                className={`text-neutral-300 hover:bg-white/10 hover:text-[#FF6B00] ${
                                    isActive ? 'bg-[#FF6B00]/15 text-[#FF6B00]' : ''
                                }`}
                            >
                                <Icon className="mr-2 h-4 w-4" />
                                {label}
                            </Button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
