import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { PageHeading, PageShell, themeCardClass, themeNoticeClass } from '@/components/page-shell';

export default function SponsorsPage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-4xl">
                <PageHeading accent="Our" title="Sponsors" />

                <Card className={`${themeCardClass} mb-8`}>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <p className="text-center text-lg leading-relaxed text-neutral-300">
                                The <span className="font-semibold text-[#FF6B00]">Super Premier League (SPL)</span> is a community-driven cricket tournament that brings together talent from across Khandwa district. We are always looking for partners and sponsors who share our vision of promoting grassroots cricket and nurturing local talent.
                            </p>

                            <p className="text-center text-lg leading-relaxed text-neutral-300">
                                By sponsoring SPL, you'll be supporting a platform that:
                            </p>

                            <ul className="mx-auto max-w-2xl space-y-3 text-neutral-300">
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-[#FF6B00]">•</span>
                                    <span>Promotes local cricket talent and provides opportunities for young players</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-[#FF6B00]">•</span>
                                    <span>Brings the community together through the spirit of cricket</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-[#FF6B00]">•</span>
                                    <span>Creates visibility and engagement for your brand within the Khandwa community</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="mt-1 text-[#FF6B00]">•</span>
                                    <span>Supports a professional, well-organized tournament with growing reach</span>
                                </li>
                            </ul>

                            <div className={`mt-8 p-6 text-center ${themeNoticeClass}`}>
                                <p className="mb-4 text-xl font-semibold text-neutral-200">
                                    Anyone wants to sponsor our tournament
                                </p>
                                <p className="mb-6 text-neutral-300">
                                    We welcome businesses, organizations, and individuals who want to be part of this exciting journey. Your sponsorship will help us make SPL bigger, better, and more impactful for the cricketing community of Khandwa.
                                </p>

                                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                    <Link href="/contact">
                                        <Button className="bg-[#FF6B00] px-8 py-3 text-lg font-bold text-white hover:bg-[#e55f00]">
                                            Contact Us
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button variant="outline" className="border-[#FF6B00] px-8 py-3 text-lg font-bold text-[#FF6B00] hover:bg-[#FF6B00]/10">
                                            Register as Player
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={themeCardClass}>
                    <CardContent className="pt-6">
                        <h2 className="mb-2 text-center text-2xl font-bold text-[#FF6B00]">
                            Get in Touch
                        </h2>
                        <p className="mb-6 text-center font-semibold text-neutral-300">Abhishek Raghuvanshi</p>
                        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
                            <div className="flex flex-col items-center gap-2">
                                <Mail className="h-6 w-6 text-[#FF6B00]" />
                                <p className="text-sm text-neutral-400">Email</p>
                                <a href="mailto:araghuvanshi488@gmail.com" className="text-neutral-300 transition-colors hover:text-[#FF6B00]">
                                    araghuvanshi488@gmail.com
                                </a>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Phone className="h-6 w-6 text-[#FF6B00]" />
                                <p className="text-sm text-neutral-400">Phone</p>
                                <a href="tel:+919174290702" className="text-neutral-300 transition-colors hover:text-[#FF6B00]">
                                    +91 91742 90702
                                </a>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <MapPin className="h-6 w-6 text-[#FF6B00]" />
                                <p className="text-sm text-neutral-400">Location</p>
                                <p className="text-neutral-300">Khandwa, India</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageShell>
    );
}
