'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Wrench, Clock } from 'lucide-react';

export function Maintenance() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardContent className="pt-8 pb-8 px-6 md:px-8">
                        <div className="text-center space-y-6">
                            {/* Icon */}
                            <div className="flex justify-center">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
                                    <div className="relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6 rounded-full border border-cyan-500/30">
                                        <Wrench className="h-16 w-16 text-cyan-400" />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
                                    Under Maintenance
                                </h1>
                                <div className="flex items-center justify-center gap-4 my-4">
                                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                                    <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="space-y-4">
                                <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
                                    We're currently performing some updates to improve your experience.
                                </p>
                                <p className="text-base text-slate-400 leading-relaxed">
                                    Our website is temporarily unavailable while we work on enhancements. 
                                    We'll be back soon!
                                </p>
                            </div>

                            {/* Status Indicator */}
                            <div className="flex items-center justify-center gap-2 pt-4">
                                <Clock className="h-5 w-5 text-cyan-500 animate-pulse" />
                                <p className="text-sm text-slate-400 italic">
                                    Please check back later
                                </p>
                            </div>

                            {/* Additional Info */}
                            <div className="pt-6 border-t border-slate-800">
                                <p className="text-sm text-slate-500">
                                    Thank you for your patience and understanding.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

