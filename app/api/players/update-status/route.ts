import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
    try {
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Adm!n@2024#Secure$Dashboard&SLP';
        const authHeader = request.headers.get('authorization');
        const url = new URL(request.url);
        const password = url.searchParams.get('password') || authHeader?.replace('Bearer ', '');

        if (!password || password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const id = Number(body?.id);
        const playerStatus = body?.player_status as 'sold' | 'unsold' | undefined;
        const soldPrice = body?.sold_price ?? null;

        if (!id || Number.isNaN(id)) {
            return NextResponse.json({ error: 'Valid player id is required' }, { status: 400 });
        }

        if (!playerStatus || !['sold', 'unsold'].includes(playerStatus)) {
            return NextResponse.json({ error: 'Invalid player status' }, { status: 400 });
        }

        let normalizedPrice: number | null = null;
        if (playerStatus === 'sold') {
            const numericPrice = Number(soldPrice);
            if (Number.isNaN(numericPrice) || numericPrice <= 0) {
                return NextResponse.json({ error: 'Valid sold_price is required' }, { status: 400 });
            }
            normalizedPrice = numericPrice;
        }

        const updatePayload: { player_status: 'sold' | 'unsold'; sold_price: number | null } = {
            player_status: playerStatus,
            sold_price: normalizedPrice,
        };

        const { error } = await supabase
            .from('Players')
            .update(updatePayload)
            .eq('id', id);

        if (error) {
            console.error('Error updating player status:', error);
            return NextResponse.json({ error: 'Failed to update player status' }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}
