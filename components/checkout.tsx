'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { load } from '@cashfreepayments/cashfree-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function Checkout() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const orderId = searchParams.get('order_id');

    const [cashfree, setCashfree] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const initCashfree = async () => {
            try {
                const cashfreeInstance = await load({
                    mode: 'production',
                });
                setCashfree(cashfreeInstance);
            } catch (err) {
                console.error('Failed to load Cashfree SDK', err);
                toast.error('Failed to load payment system');
            }
        };
        initCashfree();
    }, []);

    const handlePayment = async () => {
        if (!cashfree || !sessionId) {
            toast.error('Invalid payment session');
            return;
        }

        setIsProcessing(true);
        try {
            await cashfree.checkout({
                paymentSessionId: sessionId,
                returnUrl: `${window.location.origin}/pay?status=verified&order_id=${orderId}`,
                redirectTarget: '_modal', // Open in modal
            });
            // Note: If using _modal, the promise might effectively resolve when modal closes or redirects?
            // Actually standard behavior is it redirects or handles via callbacks if specified.
            // But we provided returnUrl, so it might redirect there.

        } catch (error) {
            console.error('Payment Error:', error);
            toast.error('Payment failed to launch');
            setIsProcessing(false);
        }
    };

    if (!sessionId && !searchParams.get('status')) {
        return (
            <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white">
                <CardContent className="pt-6">
                    <p className="text-center text-red-500">Invalid Session. Please register again.</p>
                </CardContent>
            </Card>
        );
    }

    // Handle Verify/Success State loosely (Webhook is source of truth, but UI needs feedback)
    // If we came back from payment with status=verified (based on our returnUrl logic)
    // Realistically, Cashfree redirects to returnUrl.

    return (
        <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-white shadow-xl">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-cyan-500">
                    Complete Payment
                </CardTitle>
                <CardDescription className="text-center text-slate-400">
                    Entry Fee: ₹500.00
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <p className="text-sm text-slate-400 text-center">
                    Click the button below to open the secure payment gateway.
                </p>
                <Button
                    onClick={handlePayment}
                    className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3"
                    disabled={!cashfree || isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Pay Now'
                    )}
                </Button>
            </CardContent>
        </Card>
    );
}
