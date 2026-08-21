'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Receipt } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container mx-auto py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Shield className="h-10 w-10 text-cyan-500" />
                            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
                                Privacy Policy
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
                                Privacy Policy
                            </CardTitle>
                            <p className="text-center text-slate-400 mt-2">
                                Super Premier League ("SPL", "we", "our", or "us") values the privacy of our players, participants, and visitors. This Privacy Policy explains how we collect, use, and protect your personal information when you register, participate, or interact with SPL events and our website.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    1. Information We Collect
                                </h2>
                                <p className="text-slate-300 leading-relaxed">
                                    When you register or participate in SPL, we may collect the following information:
                                </p>
                                <div className="space-y-3 text-slate-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Personal Information:</span> Name, phone number, email address, date of birth, Aadhaar number (for ID verification), and residential address.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Payment Information:</span> Payment details (processed securely via third-party payment providers such as Cashfree; we do not store card/UPI details).</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Player Profile Information:</span> Role preference (batsman, bowler, all-rounder), uploaded photo, and other information required for participation.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Technical Information:</span> IP address, device details, and usage data when you visit our website.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    2. How We Use Your Information
                                </h2>
                                <p className="text-slate-300 leading-relaxed mb-3">
                                    We use the collected information for:
                                </p>
                                <div className="space-y-2 text-slate-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Processing registrations and payments.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Verifying player eligibility and identity.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Creating team rosters and tournament schedules.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Communicating updates, match details, and announcements.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Ensuring fair play and maintaining league records.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Improving our website, services, and event management.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    3. Sharing of Information
                                </h2>
                                <p className="text-slate-300 leading-relaxed mb-3">
                                    We do not sell or rent your personal data. Information may be shared with:
                                </p>
                                <div className="space-y-2 text-slate-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Tournament Officials & Organizers:</span> For team formation, verification, and event logistics.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Payment Service Providers</span> (e.g., Cashfree): To process your transactions securely.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p><span className="text-cyan-400 font-semibold">Legal Authorities:</span> If required by law or to prevent fraud or misuse.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    4. Data Security
                                </h2>
                                <p className="text-slate-300 leading-relaxed">
                                    We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, alteration, disclosure, or destruction. Payment transactions are encrypted and processed by secure third-party providers.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    5. Player Consent
                                </h2>
                                <p className="text-slate-300 leading-relaxed">
                                    By registering for SPL, you consent to the collection and use of your information as described in this policy. You also agree that your name, photo, and performance statistics may be published on our website, social media platforms, and promotional materials related to the tournament.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    6. Your Rights
                                </h2>
                                <p className="text-slate-300 leading-relaxed mb-3">
                                    As a participant, you have the right to:
                                </p>
                                <div className="space-y-2 text-slate-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Request access to your personal information.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Correct or update inaccurate details.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Request deletion of your data (subject to eligibility verification and record-keeping requirements).</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-cyan-500 font-bold mt-1">•</span>
                                        <p>Withdraw consent for promotional usage at any time.</p>
                                    </div>
                                </div>
                                <p className="text-slate-300 leading-relaxed mt-4">
                                    To exercise these rights, please contact us at <a href="mailto:araghuanshi488@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline">araghuanshi488@gmail.com</a> / <a href="tel:+919174290702" className="text-cyan-400 hover:text-cyan-300 underline">+91 91742 90702</a>
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    7. Cookies & Website Tracking
                                </h2>
                                <p className="text-slate-300 leading-relaxed">
                                    Our website may use cookies and similar technologies to improve user experience, analyze traffic, and provide personalized content. You can manage or disable cookies in your browser settings.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    8. Third-Party Links
                                </h2>
                                <p className="text-slate-300 leading-relaxed">
                                    SPL's website or communications may include links to third-party sites (e.g., Cashfree payment pages). We are not responsible for the privacy practices of these external sites.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    9. Policy Updates
                                </h2>
                                <p className="text-slate-300 leading-relaxed">
                                    We may update this Privacy Policy from time to time. Any changes will be posted on our website with the updated "Last Updated" date.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-blue-400 border-b border-slate-800 pb-2">
                                    10. Contact Us
                                </h2>
                                <p className="text-slate-300 leading-relaxed mb-3">
                                    For questions or concerns about this Privacy Policy, please contact:
                                </p>
                                <div className="bg-slate-800/50 border border-slate-800 rounded-lg p-4 space-y-2">
                                    <p className="text-slate-300 font-semibold">Abhishek Raghuvanshi</p>
                                    <div className="space-y-1 text-slate-300">
                                        <p>📧 Email: <a href="mailto:araghuanshi488@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline">araghuanshi488@gmail.com</a></p>
                                        <p>📞 Phone: <a href="tel:+919174290702" className="text-cyan-400 hover:text-cyan-300 underline">+91 91742 90702</a></p>
                                        <p>📍 Location: Khandwa, Madhya Pradesh, India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                                <p className="text-sm text-slate-300">
                                    <span className="text-blue-400 font-semibold">Note:</span> By using our services and registering for SPL events, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

