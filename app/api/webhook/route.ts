import { NextResponse } from 'next/server';
import { Cashfree, CFEnvironment } from 'cashfree-pg';
import { createClient } from '@supabase/supabase-js';

// Use service role key for webhook to bypass RLS (same as verify-payment route)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    try {
        const signature = request.headers.get('x-webhook-signature');
        const timestamp = request.headers.get('x-webhook-timestamp');
        const rawBody = await request.text();

        if (!signature || !timestamp) {
            console.error('Webhook: Missing signature headers');
            return NextResponse.json({ error: 'Missing signature headers' }, { status: 400 });
        }

        // Initialize Cashfree instance
        const cashfree = new Cashfree(
            CFEnvironment.PRODUCTION,
            process.env.CASHFREE_APP_ID!,
            process.env.CASHFREE_SECRET_KEY!
        );

        // Verify Signature
        try {
            cashfree.PGVerifyWebhookSignature(signature, rawBody, timestamp);
        } catch (err) {
            console.error('Webhook: Signature verification failed:', err);
            return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
        }

        const payload = JSON.parse(rawBody);
        
        // Log the full payload for debugging
        console.log('Webhook payload received:', JSON.stringify(payload, null, 2));
        console.log('Webhook event type:', payload.type);

        // Extract order ID and payment status from different possible payload structures
        let orderId: string | null = null;
        let paymentStatus: string | null = null;
        let orderStatus: string | null = null;

        // Handle different webhook event types and payload structures
        if (payload.type === 'PAYMENT_SUCCESS_WEBHOOK' || payload.type === 'PAYMENT_SUCCESS') {
            // Standard PAYMENT_SUCCESS_WEBHOOK structure
            orderId = payload.data?.order?.order_id || payload.data?.order_id || payload.order_id;
            paymentStatus = payload.data?.payment?.payment_status || payload.data?.payment_status || payload.payment_status;
            orderStatus = payload.data?.order?.order_status || payload.data?.order_status || payload.order_status;
        } else if (payload.type === 'ORDER_PAID' || payload.type === 'PAYMENT_USER_DROPPED') {
            // ORDER_PAID or other order-related events
            orderId = payload.data?.order?.order_id || payload.data?.order_id || payload.order_id;
            orderStatus = payload.data?.order?.order_status || payload.data?.order_status || payload.order_status;
            if (orderStatus === 'PAID') {
                paymentStatus = 'SUCCESS';
            }
        } else if (payload.order_id) {
            // Direct order_id in payload (fallback)
            orderId = payload.order_id;
            paymentStatus = payload.payment_status || payload.status;
            orderStatus = payload.order_status;
        } else if (payload.data) {
            // Nested data structure
            orderId = payload.data.order_id || payload.data.order?.order_id;
            paymentStatus = payload.data.payment_status || payload.data.payment?.payment_status || payload.data.status;
            orderStatus = payload.data.order_status || payload.data.order?.order_status;
        }

        console.log(`Webhook extracted - orderId: ${orderId}, paymentStatus: ${paymentStatus}, orderStatus: ${orderStatus}`);

        // Update database if payment is successful
        if (orderId && (paymentStatus === 'SUCCESS' || orderStatus === 'PAID')) {
            console.log(`Attempting to update order ${orderId} to success status`);
            
            const { data: updatedRecords, error } = await supabase
                .from('registrations')
                .update({ payment_status: 'success' })
                .eq('cashfree_order_id', orderId)
                .select();

            if (error) {
                console.error('Webhook: Failed to update Supabase:', error);
                console.error('Error details:', JSON.stringify(error, null, 2));
                // Return 500 to trigger Cashfree retry
                return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
            }

            if (updatedRecords && updatedRecords.length > 0) {
                console.log(`Webhook: Successfully updated ${updatedRecords.length} record(s) for order ${orderId}`);
                console.log('Updated records:', JSON.stringify(updatedRecords, null, 2));
            } else {
                console.warn(`Webhook: Order ${orderId} not found in database or no records updated`);
                // This might happen if the order_id doesn't match - log for investigation
            }
        } else {
            console.log(`Webhook: Not processing - orderId: ${orderId}, paymentStatus: ${paymentStatus}, orderStatus: ${orderStatus}, type: ${payload.type}`);
        }

        return NextResponse.json({ received: true, processed: !!orderId });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        console.error('Error stack:', error.stack);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
