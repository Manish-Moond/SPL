import Link from 'next/link';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RegistrationClosed() {
    return (
        <div className="rounded-2xl border border-[#38BDF8]/60 bg-gradient-to-br from-[#0B2233]/30 via-[#081826]/25 to-[#050F1A]/30 p-6 text-center shadow-[0_12px_48px_rgba(0,0,0,0.25),0_0_40px_rgba(56,189,248,0.14)] backdrop-blur-sm sm:p-8 md:p-10">
            <div className="flex justify-center">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#FF6B00]/25 blur-2xl" />
                    <div className="relative flex size-20 items-center justify-center rounded-full border border-[#FF6B00]/60 bg-[#FF6B00]/10">
                        <Lock className="size-9 text-[#FF6B00]" />
                    </div>
                </div>
            </div>

            <h2 className="mt-6 text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl">
                Registration <span className="text-[#FF6B00]">Closed</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base text-neutral-300 sm:text-lg">
                We are no longer accepting new player registrations.
            </p>
            <p className="mx-auto mt-2 max-w-xl text-sm text-neutral-400 sm:text-base">
                Thank you for your interest in the Super Premier League. Stay tuned for further updates.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm text-neutral-400">Have a question about your registration?</p>
                <Link href="/contact">
                    <Button className="mt-4 h-11 rounded-md bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] px-8 font-bold tracking-wide text-white shadow-[0_8px_24px_rgba(255,107,0,0.35)] hover:from-[#FF6B00] hover:to-[#e55f00]">
                        Contact Us
                    </Button>
                </Link>
            </div>
        </div>
    );
}
