'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Force dynamic rendering to prevent prerendering errors
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
            <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
                <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardContent className="pt-6 flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                        <p className="text-slate-400">Verifying your payment...</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
            <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-16 w-16 text-cyan-500" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-cyan-500">
                        Payment Successful!
                    </CardTitle>
                    <CardDescription className="text-slate-400 mt-2">
                        Your registration has been completed successfully
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <div className="text-center space-y-2">
                        <p className="text-slate-300">
                            Thank you for registering for the cricket tournament!
                        </p>
                        {orderId && (
                            <p className="text-sm text-slate-500">
                                Order ID: {orderId}
                            </p>
                        )}
                        {verificationStatus === 'success' && (
                            <p className="text-xs text-cyan-500 mt-2">
                                ✓ Payment verified and confirmed
                            </p>
                        )}
                    </div>
                    <div className="w-full space-y-3">
                        <p className="text-sm text-slate-400 text-center">
                            You will receive a confirmation email shortly with all the details.
                        </p>
                        <Button
                            asChild
                            className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3"
                        >
                            <Link href="/register">
                                Register Another Player
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
                <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
                    <CardContent className="pt-6 flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                        <p className="text-slate-400">Loading...</p>
                    </CardContent>
                </Card>
            </div>
        }>
            <SuccessPageContent />
        </Suspense>
    );
}

