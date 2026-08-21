-- Create storage bucket for payment screenshots
-- Run this in your Supabase SQL Editor

-- Create the bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('payment-screenshots', 'payment-screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policy for payment screenshots (private - only service role can access)
-- Allow service role to upload payment screenshots
DROP POLICY IF EXISTS "Service role can upload payment screenshots" ON storage.objects;
CREATE POLICY "Service role can upload payment screenshots"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'payment-screenshots' );

-- Allow service role to view payment screenshots
DROP POLICY IF EXISTS "Service role can view payment screenshots" ON storage.objects;
CREATE POLICY "Service role can view payment screenshots"
ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-screenshots' );

