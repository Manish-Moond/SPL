import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseSecretKey, supabaseUrl } from '@/lib/supabase-env';

const supabase = createClient(supabaseUrl, supabaseSecretKey);

export async function GET(request: Request) {
    try {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adm!n@2024#Secure$Dashboard&SLP';
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const password = url.searchParams.get('password') || authHeader?.replace('Bearer ', '');

        if (!password || password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: players, error } = await supabase
            .from('Players')
            .select(
                [
                    'id',
                    'full_name',
                    'email',
                    'phone',
                    'address',
                    'city',
                    'aadhar_number',
                    'role_type',
                    'batting_style',
                    'bowling_style',
                    'photo_url',
                    'player_status',
                    'sold_price',
                ].join(',')
            )
            .order('id', { ascending: true });

        if (error) {
            console.error('Error fetching players:', error);
            return NextResponse.json(
                { error: 'Failed to fetch players' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            data: players || [],
            count: players?.length || 0,
        });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
