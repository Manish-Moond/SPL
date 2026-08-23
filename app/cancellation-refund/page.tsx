'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeading, PageShell, themeCardClass, themeNoticeClass } from '@/components/page-shell';
import { PolicyNav } from '@/components/policy-nav';

export default function CancellationRefundPage() {
    return (
        <PageShell>
            <div className="mx-auto max-w-4xl">
                <PageHeading accent="Cancellation" title="& Refund" />
                <PolicyNav />

                <Card className={themeCardClass}>
                    <CardHeader>
                        <CardTitle className="text-center text-2xl font-bold text-[#FF6B00]">
                            Policy Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4 leading-relaxed text-neutral-300">
                            <p className="text-lg">
                                <span className="font-semibold text-[#FF6B00]">Abhishek Raghuvanshi</span> believes in helping its customers as far as possible, and has therefore a liberal cancellation policy.
                            </p>

                            <div className={`mt-6 p-4 ${themeNoticeClass}`}>
                                <p className="text-neutral-300">
                                    <span className="font-semibold text-[#FF6B00]">Refund Processing:</span> If approved, we will credit the amount in the customer's bank account within <span className="font-semibold text-[#FF6B00]">16-30 days</span>.
                                </p>
                            </div>
                        </div>

                        <div className={`mt-8 p-4 ${themeNoticeClass}`}>
                            <p className="text-sm text-neutral-300">
                                <span className="font-semibold text-[#FF6B00]">Note:</span> For any queries or concerns regarding cancellations or refunds, please contact us through our contact page or reach out to Abhishek Raghuvanshi directly.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </PageShell>
    );
}
