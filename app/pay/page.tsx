'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { load } from '@cashfreepayments/cashfree-js';
import { Loader2 } from 'lucide-react';

// Force dynamic rendering to prevent prerendering errors
export const dynamic = 'force-dynamic';

function PayPageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAndRedirect = async () => {
            if (!sessionId) {
                router.push('/register');
                return;
            }

            try {
                // Load Cashfree SDK
                const cashfree = await load({
                    mode: 'production',
                });

                // Automatically redirect to Cashfree payment
                await cashfree.checkout({
                    paymentSessionId: sessionId,
                    returnUrl: `${window.location.origin}/success?order_id=${orderId}`,
                    redirectTarget: '_self', // Redirect in same window
                });
            } catch (error) {
                console.error('Payment Error:', error);
                router.push('/register?error=payment_failed');
            }
        };

        initAndRedirect();
    }, [sessionId, orderId, router]);

    return (
        <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                <p className="text-slate-400">Redirecting to payment gateway...</p>
            </div>
        </div>
    );
}

export default function PayPage() {
    return (
        <Suspense fallback={
            <div className="container mx-auto py-10 flex justify-center min-h-screen items-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                    <p className="text-slate-400">Loading...</p>
                </div>
            </div>
        }>
            <PayPageContent />
        </Suspense>
    );
}
