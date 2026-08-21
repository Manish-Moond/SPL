-- Create new table for registrations with UPI payment fields
-- This table stores all registration data including payment screenshot and UPI transaction ID

CREATE TABLE IF NOT EXISTS registrations_upi (
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
  amount DECIMAL(10, 2) NOT NULL DEFAULT 500.00,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'verified', 'rejected')),
  payment_screenshot_url TEXT,
  upi_transaction_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index on UPI transaction ID for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_upi_transaction_id ON registrations_upi(upi_transaction_id);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_upi_email ON registrations_upi(email);

-- Create index on phone for faster lookups
CREATE INDEX IF NOT EXISTS idx_registrations_upi_phone ON registrations_upi(phone);

-- Create index on payment status for filtering
CREATE INDEX IF NOT EXISTS idx_registrations_upi_payment_status ON registrations_upi(payment_status);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_registrations_upi_updated_at ON registrations_upi;
CREATE TRIGGER update_registrations_upi_updated_at
    BEFORE UPDATE ON registrations_upi
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for payment screenshots (if using Supabase Storage)
-- Note: You may want to create a separate bucket for payment screenshots
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

