import { Oswald } from 'next/font/google';
import Image from 'next/image';
import { BadgeCheck, Shield, Trophy, Zap } from 'lucide-react';
import { RegistrationForm } from '@/components/registration-form';

const oswald = Oswald({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
});

const TRUST_ITEMS = [
    {
        icon: Shield,
        title: 'Secure Registration',
        subtitle: 'Your data is safe with us',
    },
    {
        icon: Zap,
        title: 'Quick & Easy Process',
        subtitle: 'Takes less than 2 minutes',
    },
    {
        icon: BadgeCheck,
        title: '100% Verified Information',
        subtitle: 'Trusted & reliable',
    },
    {
        icon: Trophy,
        title: 'For Players, By Players',
        subtitle: 'Built for cricketers',
    },
];

export function RegistrationPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
            <div className="pointer-events-none absolute inset-0 bg-[#050505]">
                <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
                    <div className="relative h-full w-full">
                        <Image
                            src="/images/spl-batsman-hero.jpg"
                            alt="SPL batsman in orange stadium lighting"
                            fill
                            priority
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            className="object-cover object-[center_20%] opacity-70 lg:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent lg:via-[#050505]/25" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/70 via-transparent to-[#050505]/20" />
                    </div>
                </div>
                <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#FF6B00]/20 blur-3xl" />
                <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#FF6B00]/10 blur-3xl" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
                <div className="mb-8 text-center lg:max-w-3xl lg:text-left">
                    <h1
                        className={`${oswald.className} text-4xl font-bold uppercase tracking-wide sm:text-5xl lg:text-6xl`}
                    >
                        <span className="text-[#FF6B00]">SP(L)</span>{' '}
                        <span className="text-white">REGISTRATION</span>
                    </h1>
                    <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                        Please fill in the details to register
                    </p>
                </div>

                <div className="lg:max-w-3xl">
                    <RegistrationForm />
                </div>

                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-4xl lg:grid-cols-4">
                    {TRUST_ITEMS.map(({ icon: Icon, title, subtitle }) => (
                        <div key={title} className="flex items-center gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#FF6B00]">
                                <Icon className="size-5 text-white" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{title}</p>
                                <p className="text-xs text-neutral-400">{subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
