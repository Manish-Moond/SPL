export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

/** Publishable key (replaces legacy anon key). */
export const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/** Secret key (replaces legacy service_role key). Server-only. */
export const supabaseSecretKey =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY!;
