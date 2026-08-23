import type { ReactNode } from 'react';
import { Oswald } from 'next/font/google';
import { cn } from '@/lib/utils';

const oswald = Oswald({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
});

export function PageShell({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#FF6B00]/20 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#FF6B00]/10 blur-3xl" />
            </div>
            <div className={cn('relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-10', className)}>
                {children}
            </div>
        </div>
    );
}

export function PageHeading({
    accent,
    title,
    subtitle,
}: {
    accent?: string;
    title: string;
    subtitle?: ReactNode;
}) {
    return (
        <div className="mb-10 text-center">
            <h1 className={`${oswald.className} text-4xl font-bold uppercase tracking-wide sm:text-5xl`}>
                {accent ? (
                    <>
                        <span className="text-[#FF6B00]">{accent}</span>{' '}
                        <span className="text-white">{title}</span>
                    </>
                ) : (
                    <span className="text-white">{title}</span>
                )}
            </h1>
            {subtitle && <div className="mt-3 text-sm text-neutral-400 sm:text-base">{subtitle}</div>}
            <div className="mt-6 flex items-center justify-center gap-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
                <div className="h-2 w-2 rounded-full bg-[#FF6B00]" />
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent" />
            </div>
        </div>
    );
}

export const themeCardClass = 'bg-white/5 border-white/10 text-white shadow-xl backdrop-blur';
export const themePanelClass = 'bg-white/5 border border-white/10 rounded-lg';
export const themeNoticeClass = 'bg-[#FF6B00]/10 border border-[#FF6B00]/30 rounded-lg';
