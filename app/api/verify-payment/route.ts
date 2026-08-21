import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Cashfree, CFEnvironment } from 'cashfree-pg';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    try {
        const { order_id } = await request.json();

        if (!order_id) {
            return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
        }

        // Initialize Cashfree instance
        const cashfree = new Cashfree(
            CFEnvironment.PRODUCTION,
            process.env.CASHFREE_APP_ID!,
            process.env.CASHFREE_SECRET_KEY!
        );

        // Fetch order status from Cashfree
        const orderResponse = await cashfree.PGFetchOrder(order_id);
        const orderData = orderResponse.data;

        // Check if payment was successful
        // order_status can be: ACTIVE, PAID, EXPIRED, TERMINATED, TERMINATION_REQUESTED
        const orderStatus = orderData.order_status;
        
        if (orderStatus === 'PAID') {
            // Update database securely
            const { error: updateError } = await supabase
                .from('registrations')
                .update({ payment_status: 'success' })
                .eq('cashfree_order_id', order_id);

            if (updateError) {
                console.error('Failed to update payment status:', updateError);
                return NextResponse.json(
                    { error: 'Failed to update payment status' },
                    { status: 500 }
                );
            }

            return NextResponse.json({
                success: true,
                payment_status: 'success',
                message: 'Payment verified and status updated'
            });
        } else if (orderStatus === 'EXPIRED' || orderStatus === 'TERMINATED') {
            // Update to failed status
            const { error: updateError } = await supabase
                .from('registrations')
                .update({ payment_status: 'failed' })
                .eq('cashfree_order_id', order_id);

            if (updateError) {
                console.error('Failed to update payment status:', updateError);
            }

            return NextResponse.json({
                success: false,
                payment_status: 'failed',
                message: 'Payment was not successful'
            });
        } else {
            // Payment still pending
            return NextResponse.json({
                success: false,
                payment_status: 'pending',
                message: 'Payment is still pending'
            });
        }

    } catch (error: any) {
        console.error('Payment verification error:', error);
        
        // Handle Cashfree API errors
        if (error.response?.status === 404) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: error.message || 'Failed to verify payment' },
            { status: 500 }
        );
    }
}

