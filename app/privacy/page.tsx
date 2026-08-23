'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeading, PageShell, themeCardClass, themeNoticeClass } from '@/components/page-shell';
import { PolicyNav } from '@/components/policy-nav';

export default function PrivacyPage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-4xl">
                <PageHeading accent="Privacy" title="Policy" />
                <PolicyNav />

                    <Card className={themeCardClass}>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center text-[#FF6B00]">
                                Privacy Policy
                            </CardTitle>
                            <p className="text-center text-neutral-400 mt-2">
                                Super Premier League ("SPL", "we", "our", or "us") values the privacy of our players, participants, and visitors. This Privacy Policy explains how we collect, use, and protect your personal information when you register, participate, or interact with SPL events and our website.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Section 1 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    1. Information We Collect
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    When you register or participate in SPL, we may collect the following information:
                                </p>
                                <div className="space-y-3 text-neutral-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Personal Information:</span> Name, phone number, email address, date of birth, Aadhaar number (for ID verification), and residential address.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Payment Information:</span> Payment details (processed securely via third-party payment providers such as Cashfree; we do not store card/UPI details).</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Player Profile Information:</span> Role preference (batsman, bowler, all-rounder), uploaded photo, and other information required for participation.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Technical Information:</span> IP address, device details, and usage data when you visit our website.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    2. How We Use Your Information
                                </h2>
                                <p className="text-neutral-300 leading-relaxed mb-3">
                                    We use the collected information for:
                                </p>
                                <div className="space-y-2 text-neutral-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Processing registrations and payments.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Verifying player eligibility and identity.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Creating team rosters and tournament schedules.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Communicating updates, match details, and announcements.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Ensuring fair play and maintaining league records.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Improving our website, services, and event management.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    3. Sharing of Information
                                </h2>
                                <p className="text-neutral-300 leading-relaxed mb-3">
                                    We do not sell or rent your personal data. Information may be shared with:
                                </p>
                                <div className="space-y-2 text-neutral-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Tournament Officials & Organizers:</span> For team formation, verification, and event logistics.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Payment Service Providers</span> (e.g., Cashfree): To process your transactions securely.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p><span className="text-[#FF6B00] font-semibold">Legal Authorities:</span> If required by law or to prevent fraud or misuse.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    4. Data Security
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, alteration, disclosure, or destruction. Payment transactions are encrypted and processed by secure third-party providers.
                                </p>
                            </div>

                            {/* Section 5 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    5. Player Consent
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    By registering for SPL, you consent to the collection and use of your information as described in this policy. You also agree that your name, photo, and performance statistics may be published on our website, social media platforms, and promotional materials related to the tournament.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    6. Your Rights
                                </h2>
                                <p className="text-neutral-300 leading-relaxed mb-3">
                                    As a participant, you have the right to:
                                </p>
                                <div className="space-y-2 text-neutral-300 ml-4">
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Request access to your personal information.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Correct or update inaccurate details.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Request deletion of your data (subject to eligibility verification and record-keeping requirements).</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="text-[#FF6B00] font-bold mt-1">•</span>
                                        <p>Withdraw consent for promotional usage at any time.</p>
                                    </div>
                                </div>
                                <p className="text-neutral-300 leading-relaxed mt-4">
                                    To exercise these rights, please contact us at <a href="mailto:araghuanshi488@gmail.com" className="text-[#FF6B00] hover:text-[#e55f00] underline">araghuanshi488@gmail.com</a> / <a href="tel:+919174290702" className="text-[#FF6B00] hover:text-[#e55f00] underline">+91 91742 90702</a>
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    7. Cookies & Website Tracking
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    Our website may use cookies and similar technologies to improve user experience, analyze traffic, and provide personalized content. You can manage or disable cookies in your browser settings.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    8. Third-Party Links
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    SPL's website or communications may include links to third-party sites (e.g., Cashfree payment pages). We are not responsible for the privacy practices of these external sites.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    9. Policy Updates
                                </h2>
                                <p className="text-neutral-300 leading-relaxed">
                                    We may update this Privacy Policy from time to time. Any changes will be posted on our website with the updated "Last Updated" date.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-[#FF6B00] border-b border-white/10 pb-2">
                                    10. Contact Us
                                </h2>
                                <p className="text-neutral-300 leading-relaxed mb-3">
                                    For questions or concerns about this Privacy Policy, please contact:
                                </p>
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
                                    <p className="text-neutral-300 font-semibold">Abhishek Raghuvanshi</p>
                                    <div className="space-y-1 text-neutral-300">
                                        <p>📧 Email: <a href="mailto:araghuanshi488@gmail.com" className="text-[#FF6B00] hover:text-[#e55f00] underline">araghuanshi488@gmail.com</a></p>
                                        <p>📞 Phone: <a href="tel:+919174290702" className="text-[#FF6B00] hover:text-[#e55f00] underline">+91 91742 90702</a></p>
                                        <p>📍 Location: Khandwa, Madhya Pradesh, India</p>
                                    </div>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className={`mt-8 p-4 ${themeNoticeClass}`}>
                                <p className="text-sm text-neutral-300">
                                    <span className="text-[#FF6B00] font-semibold">Note:</span> By using our services and registering for SPL events, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
            </div>
        </PageShell>
    );
}

