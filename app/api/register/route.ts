import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Set to false to close registration
const REGISTRATION_OPEN = true;

export async function POST(request: Request) {
    try {
        // Registration is currently closed
        if (!REGISTRATION_OPEN) {
            return NextResponse.json(
                { error: 'Registration is currently closed. We are no longer accepting new registrations.' },
                { status: 403 }
            );
        }

        const formData = await request.formData();

        const full_name = formData.get('full_name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const village = formData.get('address') as string;
        const state = (formData.get('state') as string) || '';
        const address = [village, state].filter(Boolean).join(', ');
        const city = formData.get('city') as string;
        const aadhar_number = formData.get('aadhar_number') as string;
        const role_type = formData.get('role_type') as string;
        const player_style = formData.get('player_style') as string;
        const photoFile = formData.get('photo') as File;
        const paymentScreenshotFile = formData.get('payment_screenshot') as File;
        const upi_transaction_id = formData.get('upi_transaction_id') as string;

        if (!photoFile) {
            return NextResponse.json({ error: 'Photo is required' }, { status: 400 });
        }

        if (!paymentScreenshotFile) {
            return NextResponse.json({ error: 'Payment screenshot is required' }, { status: 400 });
        }

        if (!upi_transaction_id) {
            return NextResponse.json({ error: 'UPI Transaction ID is required' }, { status: 400 });
        }

        // Validate UPI Transaction ID is exactly 12 digits
        if (!/^\d{12}$/.test(upi_transaction_id)) {
            return NextResponse.json(
                { error: 'UPI Transaction ID must be exactly 12 digits' },
                { status: 400 }
            );
        }

        // Normalize Aadhar number (remove any spaces, dashes, etc.)
        const normalizedAadhar = aadhar_number.replace(/\D/g, '');

        // Check for duplicate registration using Aadhar number and UPI Transaction ID BEFORE uploading files
        const duplicateChecks = await Promise.all([
            supabase.from('registrations_upi').select('id').eq('aadhar_number', normalizedAadhar).maybeSingle(),
            supabase.from('registrations_upi').select('id').eq('upi_transaction_id', upi_transaction_id).maybeSingle(),
        ]);

        if (duplicateChecks[0].error || duplicateChecks[1].error) {
            console.error('Duplicate check error:', duplicateChecks[0].error || duplicateChecks[1].error);
            return NextResponse.json({ error: 'Error checking for duplicate registration' }, { status: 500 });
        }

        if (duplicateChecks[0].data) {
            return NextResponse.json(
                { error: 'This Aadhar number is already registered. Each person can only register once.' },
                { status: 409 }
            );
        }

        if (duplicateChecks[1].data) {
            return NextResponse.json(
                { error: 'This UPI transaction ID has already been used. Please use a different transaction ID.' },
                { status: 409 }
            );
        }

        // 1. Upload Player Photo to Supabase Storage
        const photoExt = photoFile.name.split('.').pop();
        const photoFileName = `${randomUUID()}.${photoExt}`;
        const photoFilePath = `photos/${photoFileName}`;

        const photoBuffer = await photoFile.arrayBuffer();

        const { error: photoUploadError } = await supabase.storage
            .from('player-photos')
            .upload(photoFilePath, photoBuffer, {
                contentType: photoFile.type,
                upsert: false
            });

        if (photoUploadError) {
            console.error('Photo Upload Error:', photoUploadError);
            return NextResponse.json({ error: `Failed to upload photo: ${photoUploadError.message}` }, { status: 500 });
        }

        const { data: photoUrlData } = supabase.storage
            .from('player-photos')
            .getPublicUrl(photoFilePath);

        const photo_url = photoUrlData.publicUrl;

        // 2. Upload Payment Screenshot to Supabase Storage
        const screenshotExt = paymentScreenshotFile.name.split('.').pop();
        const screenshotFileName = `${randomUUID()}.${screenshotExt}`;
        const screenshotFilePath = `screenshots/${screenshotFileName}`;

        const screenshotBuffer = await paymentScreenshotFile.arrayBuffer();

        const { error: screenshotUploadError } = await supabase.storage
            .from('payment-screenshots')
            .upload(screenshotFilePath, screenshotBuffer, {
                contentType: paymentScreenshotFile.type,
                upsert: false
            });

        if (screenshotUploadError) {
            console.error('Screenshot Upload Error:', screenshotUploadError);
            return NextResponse.json({ error: `Failed to upload payment screenshot: ${screenshotUploadError.message}` }, { status: 500 });
        }

        // Get public URL for payment screenshot (same as player photos)
        const { data: screenshotUrlData } = supabase.storage
            .from('payment-screenshots')
            .getPublicUrl(screenshotFilePath);

        const payment_screenshot_url = screenshotUrlData.publicUrl;

        // 3. Prepare Data for DB
        let batting_style = null;
        let bowling_style = null;

        if (role_type === 'batsman') {
            batting_style = player_style;
        } else if (role_type === 'bowler') {
            bowling_style = player_style;
        } else if (role_type === 'all_rounder') {
            const parts = player_style.split('/');
            if (parts.length === 2) {
                bowling_style = parts[0];
                batting_style = parts[1];
            } else {
                batting_style = player_style;
                bowling_style = player_style;
            }
        }

        // 4. Insert into Supabase (using registrations_upi table)
        // Use normalized Aadhar number for consistency
        const { data: insertData, error: insertError } = await supabase
            .from('registrations_upi')
            .insert({
                full_name,
                email,
                phone,
                address,
                city,
                aadhar_number: normalizedAadhar,
                role_type,
                batting_style,
                bowling_style,
                photo_url,
                amount: 500.00,
                payment_status: 'pending',
                payment_screenshot_url,
                upi_transaction_id,
            })
            .select()
            .single();

        if (insertError) {
            console.error('DB Insert Error:', insertError);
            
            // Handle unique constraint violations
            if (insertError.code === '23505') { // PostgreSQL unique violation error code
                if (insertError.message.includes('unique_aadhar')) {
                    return NextResponse.json(
                        { error: 'This Aadhar number is already registered. Each person can only register once.' },
                        { status: 409 }
                    );
                } else if (insertError.message.includes('unique_upi_transaction')) {
                    return NextResponse.json(
                        { error: 'This UPI transaction ID has already been used. Please use a different transaction ID.' },
                        { status: 409 }
                    );
                }
            }
            
            return NextResponse.json({ error: `Failed to save registration: ${insertError.message}` }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            registration_id: insertData.id,
            message: 'Registration submitted successfully. Payment verification pending.'
        });

    } catch (error: any) {
        console.error('API Error:', error);
        
        return NextResponse.json({ 
            error: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}
