import { createClient } from '@supabase/supabase-js';
import { supabasePublishableKey, supabaseUrl } from '@/lib/supabase-env';

if (!supabaseUrl || !supabasePublishableKey) {
    console.warn('Supabase credentials missing in environment variables.');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
