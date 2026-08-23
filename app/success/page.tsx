'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageShell, themeCardClass } from '@/components/page-shell';

export const dynamic = 'force-dynamic';

function SuccessPageContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order_id');
    const [isVerifying, setIsVerifying] = useState(true);
    const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | 'pending' | null>(null);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!orderId) {
                setIsVerifying(false);
                return;
            }

            try {
                const response = await fetch('/api/verify-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ order_id: orderId }),
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    setVerificationStatus('success');
                } else {
                    setVerificationStatus('failed');
                }
            } catch (error) {
                console.error('Payment verification error:', error);
                setVerificationStatus('failed');
            } finally {
                setIsVerifying(false);
            }
        };

        verifyPayment();
    }, [orderId]);

    if (isVerifying) {
        return (
            <PageShell className="flex min-h-screen items-center justify-center">
                <Card className={`w-full max-w-md ${themeCardClass}`}>
                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
                        <p className="text-neutral-400">Verifying your payment...</p>
                    </CardContent>
                </Card>
            </PageShell>
        );
    }

    return (
        <PageShell className="flex min-h-screen items-center justify-center">
            <Card className={`w-full max-w-md ${themeCardClass}`}>
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <CheckCircle2 className="h-16 w-16 text-[#FF6B00]" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-[#FF6B00]">
                        Payment Successful!
                    </CardTitle>
                    <CardDescription className="mt-2 text-neutral-400">
                        Your registration has been completed successfully
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <div className="space-y-2 text-center">
                        <p className="text-neutral-300">
                            Thank you for registering for the cricket tournament!
                        </p>
                        {orderId && (
                            <p className="text-sm text-neutral-500">
                                Order ID: {orderId}
                            </p>
                        )}
                        {verificationStatus === 'success' && (
                            <p className="mt-2 text-xs text-[#FF6B00]">
                                ✓ Payment verified and confirmed
                            </p>
                        )}
                    </div>
                    <div className="w-full space-y-3">
                        <p className="text-center text-sm text-neutral-400">
                            You will receive a confirmation email shortly with all the details.
                        </p>
                        <Button
                            asChild
                            className="w-full bg-[#FF6B00] py-3 font-bold text-white hover:bg-[#e55f00]"
                        >
                            <Link href="/register">
                                Register Another Player
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </PageShell>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <PageShell className="flex min-h-screen items-center justify-center">
                <Card className={`w-full max-w-md ${themeCardClass}`}>
                    <CardContent className="flex flex-col items-center gap-4 pt-6">
                        <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
                        <p className="text-neutral-400">Loading...</p>
                    </CardContent>
                </Card>
            </PageShell>
        }>
            <SuccessPageContent />
        </Suspense>
    );
}
