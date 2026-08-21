'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 mb-4">
                            Contact Us
                        </h1>
                        <p className="text-xl text-slate-400">
                            Get in touch with us
                        </p>
                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Contact Information Card */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-cyan-500 mb-6">Contact Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Contact Persons */}
                                <div className="space-y-6">
                                    {/* Contact Person 1 */}
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                        <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-slate-700">
                                            <img
                                                src="/Bhim.jpg"
                                                alt="Bhim Yadav"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                            <p className="font-semibold text-slate-300 mb-2">Bhim Yadav</p>
                                            <a href="mailto:Bhim6386@gmail.com" className="text-slate-400 hover:text-cyan-500 transition-colors block mb-1 break-words">
                                                <Mail className="inline h-4 w-4 mr-2" />
                                                <span className="break-all">Bhim6386@gmail.com</span>
                                            </a>
                                            <a href="tel:+916265468287" className="text-slate-400 hover:text-cyan-500 transition-colors block">
                                                <Phone className="inline h-4 w-4 mr-2" />
                                                +91 62654 68287
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Contact Person 2 */}
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                        <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-slate-700">
                                            <img
                                                src="/Himanshu.jpg"
                                                alt="Himanshu Nakul"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                            <p className="font-semibold text-slate-300 mb-2">Himanshu Nakul</p>
                                            <a href="mailto:goatsharma2356@gmail.com" className="text-slate-400 hover:text-cyan-500 transition-colors block mb-1 break-words">
                                                <Mail className="inline h-4 w-4 mr-2" />
                                                <span className="break-all">himanshunakul010@gmail.com</span>
                                            </a>
                                            <a href="tel:+918319274699" className="text-slate-400 hover:text-cyan-500 transition-colors block">
                                                <Phone className="inline h-4 w-4 mr-2" />
                                                +91 83192 74699
                                            </a>
                                        </div>
                                    </div>
                                    
                                    {/* Contact Person 3 */}
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-800">
                                        <div className="relative w-[200px] h-[200px] flex-shrink-0 rounded-full overflow-hidden border-2 border-cyan-500/50 bg-slate-700">
                                            <img
                                                src="/Abhishek.jpg"
                                                alt="Abhishek Raghuvanshi"
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                                            <p className="font-semibold text-slate-300 mb-2">Abhishek Raghuvanshi</p>
                                            <a href="mailto:araghuvanshi488@gmail.com" className="text-slate-400 hover:text-cyan-500 transition-colors block mb-1 break-words">
                                                <Mail className="inline h-4 w-4 mr-2" />
                                                <span className="break-all">araghuanshi488@gmail.com</span>
                                            </a>
                                            <a href="tel:+919174290702" className="text-slate-400 hover:text-cyan-500 transition-colors block">
                                                <Phone className="inline h-4 w-4 mr-2" />
                                                +91 91742 90702
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

