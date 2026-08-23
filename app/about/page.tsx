'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Sparkles, Trophy, Users, Award, Heart, Code, Phone, Mail } from 'lucide-react';
import { PageHeading, PageShell, themeCardClass, themePanelClass } from '@/components/page-shell';

export default function AboutPage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-5xl">
                <PageHeading accent="About" title="Us" subtitle="Super Premier League (SPL)" />

                <Card className={`${themeCardClass} mb-8`}>
                    <CardContent className="pt-6">
                        <p className="mb-6 text-center text-lg leading-relaxed text-neutral-300">
                            The <span className="font-semibold text-[#FF6B00]">Super Premier League (SPL)</span> is more than just a cricket tournament — it's a platform where passion meets opportunity. Built for both rural and urban talent, SPL gives players of Khandwa the chance to showcase their skills on a professional stage.
                        </p>
                        <p className="mb-6 text-center text-lg leading-relaxed text-neutral-300">
                            Our mission is simple: promote grassroots cricket, nurture young talent, and unite the community through the spirit of the game. With fair play, professionalism, and community pride at its core, SPL is shaping the future of cricket in Khandwa.
                        </p>
                        <p className="text-center text-lg leading-relaxed text-neutral-300">
                            At SPL, every run scored and every wicket taken is a step toward making Khandwa a true hub of cricketing excellence.
                        </p>
                    </CardContent>
                </Card>

                <Card className={`${themeCardClass} mb-8`}>
                    <CardContent className="pt-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Eye className="h-8 w-8 text-[#FF6B00]" />
                            <h2 className="text-2xl font-bold text-[#FF6B00]">Our Vision</h2>
                        </div>
                        <p className="leading-relaxed text-neutral-300">
                            To make Khandwa a recognized hub of cricketing talent, where players from both rural and urban backgrounds get equal opportunities to shine and progress to higher levels of the game.
                        </p>
                    </CardContent>
                </Card>

                <Card className={`${themeCardClass} mb-8`}>
                    <CardContent className="pt-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Target className="h-8 w-8 text-[#FF6B00]" />
                            <h2 className="text-2xl font-bold text-[#FF6B00]">Our Mission</h2>
                        </div>
                        <ul className="space-y-3 text-neutral-300">
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#FF6B00]">•</span>
                                <span>To promote grassroots cricket with world-class organization and fair play.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#FF6B00]">•</span>
                                <span>To give young players a chance to compete, learn, and grow in a professional environment.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="mt-1 text-[#FF6B00]">•</span>
                                <span>To build a community-driven event where fans, families, and businesses unite in their love for cricket.</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className={`${themeCardClass} mb-8`}>
                    <CardContent className="pt-6">
                        <div className="mb-6 flex items-center gap-3">
                            <Sparkles className="h-8 w-8 text-[#FF6B00]" />
                            <h2 className="text-2xl font-bold text-[#FF6B00]">What Makes SPL Special</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className={`flex items-start gap-4 p-4 ${themePanelClass}`}>
                                <Trophy className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF6B00]" />
                                <div>
                                    <h3 className="mb-2 font-semibold text-[#FF6B00]">Professional League Experience</h3>
                                    <p className="text-sm text-neutral-300">Organized with the same standards as top-tier leagues.</p>
                                </div>
                            </div>
                            <div className={`flex items-start gap-4 p-4 ${themePanelClass}`}>
                                <Users className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF6B00]" />
                                <div>
                                    <h3 className="mb-2 font-semibold text-[#FF6B00]">Community Focused</h3>
                                    <p className="text-sm text-neutral-300">A tournament built by the people of Khandwa, for the people of Khandwa.</p>
                                </div>
                            </div>
                            <div className={`flex items-start gap-4 p-4 ${themePanelClass}`}>
                                <Award className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF6B00]" />
                                <div>
                                    <h3 className="mb-2 font-semibold text-[#FF6B00]">Opportunities for All</h3>
                                    <p className="text-sm text-neutral-300">Players from both urban and rural regions are welcome.</p>
                                </div>
                            </div>
                            <div className={`flex items-start gap-4 p-4 ${themePanelClass}`}>
                                <Heart className="mt-1 h-6 w-6 flex-shrink-0 text-[#FF6B00]" />
                                <div>
                                    <h3 className="mb-2 font-semibold text-[#FF6B00]">Beyond Cricket</h3>
                                    <p className="text-sm text-neutral-300">A platform that boosts local pride, business sponsorships, and youth engagement.</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className={`${themeCardClass} mb-8 border-[#FF6B00]/30 bg-[#FF6B00]/10`}>
                    <CardContent className="pt-6">
                        <div className="mb-4 flex items-center gap-3">
                            <Trophy className="h-8 w-8 text-[#FF6B00]" />
                            <h2 className="text-2xl font-bold text-[#FF6B00]">The Spirit of SPL</h2>
                        </div>
                        <p className="text-lg leading-relaxed text-neutral-300">
                            At its heart, SPL is about more than just matches — it's about dreams, discipline, and dedication. Every ball bowled and every run scored reflects the determination of Khandwa's cricketing community to make its mark.
                        </p>
                    </CardContent>
                </Card>

                <Card className={themeCardClass}>
                    <CardContent className="pt-6">
                        <div className="mb-6 flex items-center gap-3">
                            <Code className="h-8 w-8 text-[#FF6B00]" />
                            <h2 className="text-2xl font-bold text-[#FF6B00]">Website Development</h2>
                        </div>
                        <p className="mb-6 text-center leading-relaxed text-neutral-300">
                            This website was developed with care and attention to detail to provide the best experience for players and visitors.
                        </p>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className={`flex flex-col items-center gap-4 p-4 sm:items-start ${themePanelClass}`}>
                                <div className="relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-full border-2 border-[#FF6B00]/50 bg-neutral-800">
                                    <img
                                        src="/raja.jpg"
                                        alt="Raja Tanwar"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }}
                                    />
                                </div>
                                <div className="w-full min-w-0 flex-1 text-center sm:text-left">
                                    <p className="mb-2 text-lg font-semibold text-neutral-200">Raja Tanwar</p>
                                    <p className="mb-1 text-sm text-neutral-400">Website Developer</p>
                                    <p className="mb-4 text-sm text-neutral-400">Village: Kotwada</p>
                                    <div className="space-y-2">
                                        <a href="mailto:rajatawar7284@gmail.com" className="block break-words text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                            <Mail className="mr-2 inline h-4 w-4" />
                                            <span className="break-all">rajatawar7284@gmail.com</span>
                                        </a>
                                        <a href="tel:+919399574803" className="block text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                            <Phone className="mr-2 inline h-4 w-4" />
                                            +91 93995 74803
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className={`flex flex-col items-center gap-4 p-4 sm:items-start ${themePanelClass}`}>
                                <div className="relative h-[200px] w-[200px] flex-shrink-0 overflow-hidden rounded-full border-2 border-[#FF6B00]/50 bg-neutral-800">
                                </div>
                                <div className="w-full min-w-0 flex-1 text-center sm:text-left">
                                    <p className="mb-2 text-lg font-semibold text-neutral-200">Manish</p>
                                    <p className="mb-1 text-sm text-neutral-400">Website Developer</p>
                                    <div className="space-y-2">
                                        <a href="mailto:mmanishmoond2000@gmail.com" className="block break-words text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                            <Mail className="mr-2 inline h-4 w-4" />
                                            <span className="break-all">mmanishmoond2000@gmail.com</span>
                                        </a>
                                        <a href="tel:+919950816184" className="block text-neutral-400 transition-colors hover:text-[#FF6B00]">
                                            <Phone className="mr-2 inline h-4 w-4" />
                                            +91 99508 16184
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageShell>
    );
}
