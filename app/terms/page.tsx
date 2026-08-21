'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Receipt, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
                                Terms & Conditions
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

                    {/* Terms Card */}
                    <Card className="bg-slate-900 border-slate-800 text-white shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-cyan-500">
                                Terms & Conditions
                            </CardTitle>
                            <p className="text-center text-slate-400 mt-2">
                                These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding agreement by and between Abhishek Raghuvanshi, ("Website Owner" or "we" or "us" or "our") and you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as applicable) (collectively, "Services").
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to modify these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.
                                </p>
                                
                                <p className="font-semibold text-cyan-400 mt-6">
                                    The use of this website or availing of our Services is subject to the following terms of use:
                                </p>

                                <div className="space-y-4 mt-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">1.</span>
                                        <p>To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">2.</span>
                                        <p>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">3.</span>
                                        <p>Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">4.</span>
                                        <p>The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">5.</span>
                                        <p>You acknowledge that unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">6.</span>
                                        <p>You agree to pay us the charges associated with availing the Services.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">7.</span>
                                        <p>You agree not to use the website and/or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">8.</span>
                                        <p>You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">9.</span>
                                        <p>You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with the us for the Services.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">10.</span>
                                        <p>You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, than this would make you ineligible for a refund.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">11.</span>
                                        <p>Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">12.</span>
                                        <p>These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and construed in accordance with the laws of India.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">13.</span>
                                        <p>All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in Khandwa, Madhya Pradesh.</p>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">14.</span>
                                        <p>All concerns or communications relating to these Terms must be communicated to us using the contact information provided on this website.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-sm text-slate-300">
                                    <span className="text-blue-400 font-semibold">Note:</span> By using our website and availing the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

