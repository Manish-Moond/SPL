-- Create table for storing deleted registrations
-- This table preserves deleted registration data for audit/history purposes

CREATE TABLE IF NOT EXISTS deleted_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  original_id UUID NOT NULL, -- Reference to the original registration ID
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
  created_at TIMESTAMP WITH TIME ZONE NOT NULL, -- Original creation timestamp
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL, -- Last update timestamp before deletion
  deleted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL -- When it was deleted
);

-- Create index on original_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_deleted_registrations_original_id ON deleted_registrations(original_id);

-- Create index on deleted_at for filtering by deletion date
CREATE INDEX IF NOT EXISTS idx_deleted_registrations_deleted_at ON deleted_registrations(deleted_at);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_deleted_registrations_email ON deleted_registrations(email);

-- Create index on phone for faster lookups
CREATE INDEX IF NOT EXISTS idx_deleted_registrations_phone ON deleted_registrations(phone);

-- Create index on aadhar_number for faster lookups
CREATE INDEX IF NOT EXISTS idx_deleted_registrations_aadhar ON deleted_registrations(aadhar_number);

