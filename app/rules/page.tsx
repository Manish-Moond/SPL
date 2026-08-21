'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Receipt, Shield } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

export default function RulesPage() {
    const pathname = usePathname();
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="h-10 w-10 text-cyan-500" />
                            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
                                Tournament Rules
                            </h1>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-slate-300 mt-2">
                            टूर्नामेंट नियम
                        </p>
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

                    {/* Rules Card */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-cyan-500">
                                Important Rules & Regulations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Hindi Section */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    नियम और शर्तें (Hindi)
                                </h2>
                                
                                <div className="space-y-4 text-slate-300 leading-relaxed">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">1.</span>
                                        <p>
                                            टूर्नामेंट में वही खिलाड़ी खेलेगा, जिसका रजिस्ट्रेशन होगा, रजिस्ट्रेशन कराना अनिवार्य है।
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">2.</span>
                                        <p>
                                            रजिस्ट्रेशन फार्म में खिलाड़ी को अपना फोटो देना अनिवार्य है।
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">3.</span>
                                        <p>
                                            सुपर प्रीमियर लीग की समस्त अपडेट के लिए हमारे इंस्टाग्राम पेज <span className="text-cyan-400 font-semibold">Super Premier League (SPL)</span> को फॉलो करें।
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">4.</span>
                                        <p>
                                            सुपर प्रीमियर लीग में कोई भी निर्णय या किसी भी तरह का बदलाव करने का अधिकार आयोजन कमेटी के पास सुरक्षित रहेगा।
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">5.</span>
                                        <p>
                                            सुपर प्रीमियर लीग में केवल खंडवा जिले के खिलाड़ी ही रजिस्ट्रेशन करें (ग्रामीण और शहरी)।
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">6.</span>
                                        <p>
                                            जो खिलाड़ी नीलामी प्रक्रिया में बिक्री के लिए चयनित नहीं होंगे, उनके द्वारा भुगतान किया गया पंजीकरण शुल्क वापस नहीं किया जाएगा।
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-slate-800 my-8"></div>

                            {/* English Section */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    Rules & Regulations (English)
                                </h2>
                                
                                <div className="space-y-4 text-slate-300 leading-relaxed">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">1.</span>
                                        <p>
                                            Only registered players will be allowed to play in the tournament. Registration is mandatory.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">2.</span>
                                        <p>
                                            It is mandatory for players to upload their photo in the registration form.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">3.</span>
                                        <p>
                                            After completing the registration form, for all updates of the <span className="text-cyan-400 font-semibold">Super Premier League</span>, follow our Instagram page <span className="text-cyan-400 font-semibold">Super Premier League (SPL)</span>.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">4.</span>
                                        <p>
                                            In the Super Premier League, the organizing committee reserves the right to make any decision or any kind of change.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">5.</span>
                                        <p>
                                            In the Super Premier League, only players from the <span className="text-cyan-400 font-semibold">Khandwa district (both rural and urban)</span> are eligible to register.
                                        </p>
                                    </div>
                                    
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">6.</span>
                                        <p>
                                            Players who are not sold in the auction will not be eligible for a refund of their registration fee.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-sm text-slate-300">
                                    <span className="text-blue-400 font-semibold">Note:</span> Please ensure you have read and understood all the rules before registering. By registering, you agree to abide by all the rules and regulations set by the organizing committee.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

