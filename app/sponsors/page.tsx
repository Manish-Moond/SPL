import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Handshake, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function SponsorsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Handshake className="h-10 w-10 text-cyan-500" />
                            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
                                Sponsors
                            </h1>
                        </div>
                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Main Content Card */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl mb-8">
                        <CardContent className="pt-6">
                            <div className="space-y-6">
                                <p className="text-lg text-slate-300 leading-relaxed text-center">
                                    The <span className="text-cyan-400 font-semibold">Super Premier League (SPL)</span> is a community-driven cricket tournament that brings together talent from across Khandwa district. We are always looking for partners and sponsors who share our vision of promoting grassroots cricket and nurturing local talent.
                                </p>
                                
                                <p className="text-lg text-slate-300 leading-relaxed text-center">
                                    By sponsoring SPL, you'll be supporting a platform that:
                                </p>
                                
                                <ul className="space-y-3 text-slate-300 max-w-2xl mx-auto">
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-500 mt-1">•</span>
                                        <span>Promotes local cricket talent and provides opportunities for young players</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-500 mt-1">•</span>
                                        <span>Brings the community together through the spirit of cricket</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-500 mt-1">•</span>
                                        <span>Creates visibility and engagement for your brand within the Khandwa community</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-cyan-500 mt-1">•</span>
                                        <span>Supports a professional, well-organized tournament with growing reach</span>
                                    </li>
                                </ul>
                                
                                <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                                    <p className="text-xl text-slate-200 mb-4 font-semibold">
                                        Anyone wants to sponsor our tournament
                                    </p>
                                    <p className="text-slate-300 mb-6">
                                        We welcome businesses, organizations, and individuals who want to be part of this exciting journey. Your sponsorship will help us make SPL bigger, better, and more impactful for the cricketing community of Khandwa.
                                    </p>
                                    
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                        <Link href="/#contact">
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 text-lg">
                                                Contact Us
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold py-3 px-8 text-lg">
                                                Register as Player
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Contact Info */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-bold text-cyan-400 mb-2 text-center">
                                Get in Touch
                            </h2>
                            <p className="text-slate-300 font-semibold text-center mb-6">Abhishek Raghuvanshi</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <Mail className="h-6 w-6 text-cyan-500" />
                                    <p className="text-sm text-slate-400">Email</p>
                                    <a href="mailto:araghuvanshi488@gmail.com" className="text-slate-300 hover:text-cyan-400 transition-colors">
                                        araghuvanshi488@gmail.com
                                    </a>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <Phone className="h-6 w-6 text-cyan-500" />
                                    <p className="text-sm text-slate-400">Phone</p>
                                    <a href="tel:+919174290702" className="text-slate-300 hover:text-cyan-400 transition-colors">
                                        +91 91742 90702
                                    </a>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <MapPin className="h-6 w-6 text-cyan-500" />
                                    <p className="text-sm text-slate-400">Location</p>
                                    <p className="text-slate-300">Khandwa, India</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

