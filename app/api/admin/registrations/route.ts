import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { supabaseSecretKey, supabaseUrl } from '@/lib/supabase-env';

const supabase = createClient(supabaseUrl, supabaseSecretKey);

// Simple password authentication - STRONGLY RECOMMENDED: Set ADMIN_PASSWORD in .env.local
// Default password (change immediately in production):
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adm!n@2024#Secure$Dashboard&SLP';

export async function GET(request: Request) {
    try {
        // Check for password in Authorization header or query param
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const password = url.searchParams.get('password') || authHeader?.replace('Bearer ', '');

        if (!password || password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Fetch all registrations
        const { data: registrations, error } = await supabase
            .from('registrations_upi')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching registrations:', error);
            return NextResponse.json(
                { error: 'Failed to fetch registrations' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: registrations,
            count: registrations?.length || 0
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        // Check for password in Authorization header or query param
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const password = url.searchParams.get('password') || authHeader?.replace('Bearer ', '');
        const registrationId = url.searchParams.get('id');

        if (!password || password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (!registrationId) {
            return NextResponse.json(
                { error: 'Registration ID is required' },
                { status: 400 }
            );
        }

        // First, fetch the registration data to move to deleted_registrations table
        const { data: registration, error: fetchError } = await supabase
            .from('registrations_upi')
            .select('*')
            .eq('id', registrationId)
            .single();

        if (fetchError || !registration) {
            console.error('Error fetching registration:', fetchError);
            return NextResponse.json(
                { error: 'Registration not found' },
                { status: 404 }
            );
        }

        // Insert into deleted_registrations table
        const { error: insertError } = await supabase
            .from('deleted_registrations')
            .insert({
                original_id: registration.id,
                full_name: registration.full_name,
                email: registration.email,
                phone: registration.phone,
                address: registration.address,
                city: registration.city,
                aadhar_number: registration.aadhar_number,
                role_type: registration.role_type,
                batting_style: registration.batting_style,
                bowling_style: registration.bowling_style,
                photo_url: registration.photo_url,
                amount: registration.amount,
                payment_status: registration.payment_status,
                payment_screenshot_url: registration.payment_screenshot_url,
                upi_transaction_id: registration.upi_transaction_id,
                created_at: registration.created_at,
                updated_at: registration.updated_at,
                deleted_at: new Date().toISOString(),
            });

        if (insertError) {
            console.error('Error moving registration to deleted table:', insertError);
            return NextResponse.json(
                { error: 'Failed to archive deleted registration' },
                { status: 500 }
            );
        }

        // Now delete from registrations_upi table
        const { error: deleteError } = await supabase
            .from('registrations_upi')
            .delete()
            .eq('id', registrationId);

        if (deleteError) {
            console.error('Error deleting registration:', deleteError);
            return NextResponse.json(
                { error: 'Failed to delete registration' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Registration deleted successfully and moved to archive'
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        // Check for password in Authorization header or query param
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const password = url.searchParams.get('password') || authHeader?.replace('Bearer ', '');
        
        if (!password || password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();
        const registrationId = formData.get('id') as string;
        const screenshotFile = formData.get('payment_screenshot') as File;
        const photoFile = formData.get('photo') as File;

        if (!registrationId) {
            return NextResponse.json(
                { error: 'Registration ID is required' },
                { status: 400 }
            );
        }

        if (!screenshotFile && !photoFile) {
            return NextResponse.json(
                { error: 'Either payment screenshot or player photo file is required' },
                { status: 400 }
            );
        }

        // Validate file type
        const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
        const MAX_FILE_SIZE = 5000000;

        let payment_screenshot_url: string | undefined;
        let photo_url: string | undefined;

        // Handle payment screenshot update
        if (screenshotFile) {
            if (!ACCEPTED_IMAGE_TYPES.includes(screenshotFile.type)) {
                return NextResponse.json(
                    { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
                    { status: 400 }
                );
            }

            if (screenshotFile.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: 'File size exceeds 5MB limit.' },
                    { status: 400 }
                );
            }

            // Upload new payment screenshot to Supabase Storage
            const screenshotExt = screenshotFile.name.split('.').pop();
            const screenshotFileName = `${randomUUID()}.${screenshotExt}`;
            const screenshotFilePath = `screenshots/${screenshotFileName}`;

            const screenshotBuffer = await screenshotFile.arrayBuffer();

            const { error: screenshotUploadError } = await supabase.storage
                .from('payment-screenshots')
                .upload(screenshotFilePath, screenshotBuffer, {
                    contentType: screenshotFile.type,
                    upsert: false
                });

            if (screenshotUploadError) {
                console.error('Screenshot Upload Error:', screenshotUploadError);
                return NextResponse.json(
                    { error: `Failed to upload payment screenshot: ${screenshotUploadError.message}` },
                    { status: 500 }
                );
            }

            // Get public URL for payment screenshot
            const { data: screenshotUrlData } = supabase.storage
                .from('payment-screenshots')
                .getPublicUrl(screenshotFilePath);

            payment_screenshot_url = screenshotUrlData.publicUrl;
        }

        // Handle player photo update
        if (photoFile) {
            if (!ACCEPTED_IMAGE_TYPES.includes(photoFile.type)) {
                return NextResponse.json(
                    { error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.' },
                    { status: 400 }
                );
            }

            if (photoFile.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: 'File size exceeds 5MB limit.' },
                    { status: 400 }
                );
            }

            // Upload new player photo to Supabase Storage
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
                return NextResponse.json(
                    { error: `Failed to upload player photo: ${photoUploadError.message}` },
                    { status: 500 }
                );
            }

            // Get public URL for player photo
            const { data: photoUrlData } = supabase.storage
                .from('player-photos')
                .getPublicUrl(photoFilePath);

            photo_url = photoUrlData.publicUrl;
        }

        // Update the registration with new URLs
        const updateData: { payment_screenshot_url?: string; photo_url?: string } = {};
        if (payment_screenshot_url) updateData.payment_screenshot_url = payment_screenshot_url;
        if (photo_url) updateData.photo_url = photo_url;

        const { error: updateError } = await supabase
            .from('registrations_upi')
            .update(updateData)
            .eq('id', registrationId);

        if (updateError) {
            console.error('Error updating registration:', updateError);
            return NextResponse.json(
                { error: 'Failed to update registration' },
                { status: 500 }
            );
        }

        const messages = [];
        if (payment_screenshot_url) messages.push('payment screenshot');
        if (photo_url) messages.push('player photo');

        return NextResponse.json({
            success: true,
            message: `${messages.join(' and ')} updated successfully`,
            payment_screenshot_url,
            photo_url
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

