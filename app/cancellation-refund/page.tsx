'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Receipt, FileText, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function CancellationRefundPage() {
    const pathname = usePathname();
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Receipt className="h-10 w-10 text-cyan-500" />
                            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
                                Cancellation & Refund Policy
                            </h1>
                        </div>
                        <div className="flex items-center justify-center gap-4 my-6">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                            <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                            <div className="h-px w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-8">
                        <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                            <Link href="/rules">
                                <Button 
                                    variant="ghost" 
                                    className={`text-slate-300 hover:text-cyan-400 hover:bg-slate-800 ${
                                        pathname === '/rules' ? 'bg-slate-800 text-cyan-400' : ''
                                    }`}
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Rules & Regulations
                                </Button>
                            </Link>
                            <Link href="/cancellation-refund">
                                <Button 
                                    variant="ghost" 
                                    className={`text-slate-300 hover:text-cyan-400 hover:bg-slate-800 ${
                                        pathname === '/cancellation-refund' ? 'bg-slate-800 text-cyan-400' : ''
                                    }`}
                                >
                                    <Receipt className="h-4 w-4 mr-2" />
                                    Cancellation & Refund Policy
                                </Button>
                            </Link>
                            <Link href="/privacy">
                                <Button 
                                    variant="ghost" 
                                    className={`text-slate-300 hover:text-cyan-400 hover:bg-slate-800 ${
                                        pathname === '/privacy' ? 'bg-slate-800 text-cyan-400' : ''
                                    }`}
                                >
                                    <Shield className="h-4 w-4 mr-2" />
                                    Privacy Policy
                                </Button>
                            </Link>
                            <Link href="/terms">
                                <Button 
                                    variant="ghost" 
                                    className={`text-slate-300 hover:text-cyan-400 hover:bg-slate-800 ${
                                        pathname === '/terms' ? 'bg-slate-800 text-cyan-400' : ''
                                    }`}
                                >
                                    <FileText className="h-4 w-4 mr-2" />
                                    Terms & Conditions
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Policy Card */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-cyan-500">
                                Policy Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p className="text-lg">
                                    <span className="text-cyan-400 font-semibold">Abhishek Raghuvanshi</span> believes in helping its customers as far as possible, and has therefore a liberal cancellation policy.
                                </p>
                                
                                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                    <p className="text-slate-300">
                                        <span className="text-blue-400 font-semibold">Refund Processing:</span> If approved, we will credit the amount in the customer's bank account within <span className="text-cyan-400 font-semibold">16-30 days</span>.
                                    </p>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="mt-8 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                                <p className="text-sm text-slate-300">
                                    <span className="text-cyan-400 font-semibold">Note:</span> For any queries or concerns regarding cancellations or refunds, please contact us through our contact page or reach out to Abhishek Raghuvanshi directly.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

