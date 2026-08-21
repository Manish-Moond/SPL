-- Update payment-screenshots bucket to be public (like player-photos)
-- This allows payment screenshots to be accessed via public URLs

-- Update bucket to be public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'payment-screenshots';

-- Update storage policies to allow public access
-- Allow public view of payment screenshots
DROP POLICY IF EXISTS "Public View Payment Screenshots" ON storage.objects;
CREATE POLICY "Public View Payment Screenshots"
ON storage.objects FOR SELECT
USING ( bucket_id = 'payment-screenshots' );

-- Allow service role to upload payment screenshots
DROP POLICY IF EXISTS "Service role can upload payment screenshots" ON storage.objects;
CREATE POLICY "Service role can upload payment screenshots"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'payment-screenshots' );

