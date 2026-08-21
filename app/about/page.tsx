'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Sparkles, Trophy, Users, Award, Heart, Code, Phone, Mail } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 mb-4">
                            About Us
                        </h1>
                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-slate-300">
                            Super Premier League (SPL)
                        </p>
                    </div>

                    {/* Main About Section */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl mb-8">
                        <CardContent className="pt-6">
                            <p className="text-lg text-slate-300 leading-relaxed text-center mb-6">
                                The <span className="text-cyan-400 font-semibold">Super Premier League (SPL)</span> is more than just a cricket tournament — it's a platform where passion meets opportunity. Built for both rural and urban talent, SPL gives players of Khandwa the chance to showcase their skills on a professional stage.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed text-center mb-6">
                                Our mission is simple: promote grassroots cricket, nurture young talent, and unite the community through the spirit of the game. With fair play, professionalism, and community pride at its core, SPL is shaping the future of cricket in Khandwa.
                            </p>
                            <p className="text-lg text-slate-300 leading-relaxed text-center">
                                At SPL, every run scored and every wicket taken is a step toward making Khandwa a true hub of cricketing excellence.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Vision Section */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl mb-8">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="h-8 w-8 text-cyan-500" />
                                <h2 className="text-2xl font-bold text-cyan-400">Our Vision</h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                To make Khandwa a recognized hub of cricketing talent, where players from both rural and urban backgrounds get equal opportunities to shine and progress to higher levels of the game.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Mission Section */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl mb-8">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="h-8 w-8 text-blue-500" />
                                <h2 className="text-2xl font-bold text-blue-400">Our Mission</h2>
                            </div>
                            <ul className="space-y-3 text-slate-300">
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-500 mt-1">•</span>
                                    <span>To promote grassroots cricket with world-class organization and fair play.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-500 mt-1">•</span>
                                    <span>To give young players a chance to compete, learn, and grow in a professional environment.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-cyan-500 mt-1">•</span>
                                    <span>To build a community-driven event where fans, families, and businesses unite in their love for cricket.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* What Makes SPL Special */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl mb-8">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="h-8 w-8 text-cyan-500" />
                                <h2 className="text-2xl font-bold text-cyan-400">What Makes SPL Special</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                    <Trophy className="h-6 w-6 text-cyan-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-blue-400 mb-2">Professional League Experience</h3>
                                        <p className="text-sm text-slate-300">Organized with the same standards as top-tier leagues.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                    <Users className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-blue-400 mb-2">Community Focused</h3>
                                        <p className="text-sm text-slate-300">A tournament built by the people of Khandwa, for the people of Khandwa.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                    <Award className="h-6 w-6 text-cyan-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-blue-400 mb-2">Opportunities for All</h3>
                                        <p className="text-sm text-slate-300">Players from both urban and rural regions are welcome.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                    <Heart className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                                    <div>
                                        <h3 className="font-semibold text-blue-400 mb-2">Beyond Cricket</h3>
                                        <p className="text-sm text-slate-300">A platform that boosts local pride, business sponsorships, and youth engagement.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* The Spirit of SPL */}
                    <Card className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-500/10 border-cyan-500/30 text-white shadow-xl mb-8">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Trophy className="h-8 w-8 text-cyan-500" />
                                <h2 className="text-2xl font-bold text-cyan-400">The Spirit of SPL</h2>
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed">
                                At its heart, SPL is about more than just matches — it's about dreams, discipline, and dedication. Every ball bowled and every run scored reflects the determination of Khandwa's cricketing community to make its mark.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Website Development Section */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Code className="h-8 w-8 text-cyan-500" />
                                <h2 className="text-2xl font-bold text-cyan-400">Website Development</h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed mb-6 text-center">
                                This website was developed with care and attention to detail to provide the best experience for players and visitors.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Raja Tanwar */}
                                <div className="flex flex-col items-center sm:items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                    <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-slate-700">
                                        <img
                                            src="/raja.jpg"
                                            alt="Raja Tanwar"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                        <p className="font-semibold text-slate-300 mb-2 text-lg">Raja Tanwar</p>
                                        <p className="text-slate-400 mb-1 text-sm">Website Developer</p>
                                        <p className="text-slate-400 mb-4 text-sm">Village: Kotwada</p>
                                        <div className="space-y-2">
                                            <a href="mailto:rajatawar7284@gmail.com" className="text-slate-400 hover:text-cyan-500 transition-colors block break-words">
                                                <Mail className="inline h-4 w-4 mr-2" />
                                                <span className="break-all">rajatawar7284@gmail.com</span>
                                            </a>
                                            <a href="tel:+919399574803" className="text-slate-400 hover:text-cyan-500 transition-colors block">
                                                <Phone className="inline h-4 w-4 mr-2" />
                                                +91 93995 74803
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Manish */}
                                <div className="flex flex-col items-center sm:items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                    <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-slate-700">
                                    </div>
                                    <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                        <p className="font-semibold text-slate-300 mb-2 text-lg">Manish</p>
                                        <p className="text-slate-400 mb-1 text-sm">Website Developer</p>
                                        <div className="space-y-2">
                                            <a href="mailto:mmanishmoond2000@gmail.com" className="text-slate-400 hover:text-cyan-500 transition-colors block break-words">
                                                <Mail className="inline h-4 w-4 mr-2" />
                                                <span className="break-all">mmanishmoond2000@gmail.com</span>
                                            </a>
                                            <a href="tel:+919950816184" className="text-slate-400 hover:text-cyan-500 transition-colors block">
                                                <Phone className="inline h-4 w-4 mr-2" />
                                                +91 99508 16184
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

