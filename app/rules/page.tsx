'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeading, PageShell, themeCardClass, themeNoticeClass } from '@/components/page-shell';
import { PolicyNav } from '@/components/policy-nav';

export default function RulesPage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-4xl">
                <PageHeading accent="Tournament" title="Rules" subtitle="टूर्नामेंट नियम" />
                <PolicyNav />

                <Card className={themeCardClass}>
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-[#FF6B00]">
                            Important Rules & Regulations
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-6">
                            <h2 className="border-b border-white/10 pb-2 text-xl font-bold text-[#FF6B00]">
                                नियम और शर्तें (Hindi)
                            </h2>

                            <div className="space-y-4 leading-relaxed text-neutral-300">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">1.</span>
                                    <p>
                                        टूर्नामेंट में वही खिलाड़ी खेलेगा, जिसका रजिस्ट्रेशन होगा, रजिस्ट्रेशन कराना अनिवार्य है।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">2.</span>
                                    <p>
                                        रजिस्ट्रेशन फार्म में खिलाड़ी को अपना फोटो देना अनिवार्य है।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">3.</span>
                                    <p>
                                        सुपर प्रीमियर लीग की समस्त अपडेट के लिए हमारे इंस्टाग्राम पेज <span className="font-semibold text-[#FF6B00]">Super Premier League (SPL)</span> को फॉलो करें।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">4.</span>
                                    <p>
                                        सुपर प्रीमियर लीग में कोई भी निर्णय या किसी भी तरह का बदलाव करने का अधिकार आयोजन कमेटी के पास सुरक्षित रहेगा।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">5.</span>
                                    <p>
                                        सुपर प्रीमियर लीग में केवल खंडवा जिले के खिलाड़ी ही रजिस्ट्रेशन करें (ग्रामीण और शहरी)।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">6.</span>
                                    <p>
                                        जो खिलाड़ी नीलामी प्रक्रिया में बिक्री के लिए चयनित नहीं होंगे, उनके द्वारा भुगतान किया गया पंजीकरण शुल्क वापस नहीं किया जाएगा।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">7.</span>
                                    <p>
                                        टूर्नामेंट में होने वाले प्रत्येक मैच के लिए टीम के सभी खिलाड़ियों की उपस्थिति आवश्यक होगी। यदि कोई खिलाड़ी किसी भी कारणवश मैच में उपस्थित नहीं होता है, तो उसकी एक मैच की फीस काट ली जाएगी।
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">8.</span>
                                    <p>
                                        रजिस्ट्रेशन के समय यदि किसी खिलाड़ी द्वारा फर्जी फोटो या गलत जानकारी दर्ज की जाती है, तो उसका रजिस्ट्रेशन रद्द किया जा सकता है और टूर्नामेंट आयोजकों द्वारा आवश्यक कार्रवाई की जाएगी।
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="my-8 border-t border-white/10"></div>

                        <div className="space-y-6">
                            <h2 className="border-b border-white/10 pb-2 text-xl font-bold text-[#FF6B00]">
                                Rules & Regulations (English)
                            </h2>

                            <div className="space-y-4 leading-relaxed text-neutral-300">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">1.</span>
                                    <p>
                                        Only registered players will be allowed to play in the tournament. Registration is mandatory.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">2.</span>
                                    <p>
                                        It is mandatory for players to upload their photo in the registration form.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">3.</span>
                                    <p>
                                        After completing the registration form, for all updates of the <span className="font-semibold text-[#FF6B00]">Super Premier League</span>, follow our Instagram page <span className="font-semibold text-[#FF6B00]">Super Premier League (SPL)</span>.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">4.</span>
                                    <p>
                                        In the Super Premier League, the organizing committee reserves the right to make any decision or any kind of change.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">5.</span>
                                    <p>
                                        In the Super Premier League, only players from the <span className="font-semibold text-[#FF6B00]">Khandwa district (both rural and urban)</span> are eligible to register.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">6.</span>
                                    <p>
                                        Players who are not sold in the auction will not be eligible for a refund of their registration fee.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">7.</span>
                                    <p>
                                        All team players must be present for every match in the tournament. If a player is absent from a match for any reason, one match fee will be deducted.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <span className="mt-1 font-bold text-[#FF6B00]">8.</span>
                                    <p>
                                        If a player submits a fake photo or incorrect information during registration, their registration may be cancelled and necessary action will be taken by the tournament organizers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`mt-8 p-4 ${themeNoticeClass}`}>
                            <p className="text-sm text-neutral-300">
                                <span className="font-semibold text-[#FF6B00]">Note:</span> Please ensure you have read and understood all the rules before registering. By registering, you agree to abide by all the rules and regulations set by the organizing committee.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageShell>
    );
}
