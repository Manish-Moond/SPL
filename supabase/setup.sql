-- Consolidated Setup Script for Cricket Registration App

-- 1. Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  aadhar_number TEXT,
  role_type TEXT,
  batting_style TEXT,
  bowling_style TEXT,
  photo_url TEXT,
  team_name TEXT, 
  amount DECIMAL(10, 2) NOT NULL DEFAULT 500.00,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'success', 'failed')),
  cashfree_order_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Storage Bucket for photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('player-photos', 'player-photos', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies (Optional but recommended for public access)
-- Allow public access to view photos
DROP POLICY IF EXISTS "Public View Photos" ON storage.objects;
CREATE POLICY "Public View Photos"
ON storage.objects FOR SELECT
USING ( bucket_id = 'player-photos' );

-- Allow public uploads (Since we're uploading from server with Service Key, this isn't strictly necessary for the app to function, 
-- but helpful if you want to test upload from dashboard or client-side later)
DROP POLICY IF EXISTS "Public Upload Photos" ON storage.objects;
CREATE POLICY "Public Upload Photos"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'player-photos' );
