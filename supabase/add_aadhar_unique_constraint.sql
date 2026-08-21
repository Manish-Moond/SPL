-- Migration: Add unique constraint on Aadhar number to prevent duplicate registrations
-- This ensures each person (identified by Aadhar) can only register once

-- Add unique constraint on Aadhar number
ALTER TABLE registrations_upi 
ADD CONSTRAINT unique_aadhar UNIQUE (aadhar_number);

-- Note: Before running this, check for existing duplicates:
-- SELECT aadhar_number, COUNT(*) as count 
-- FROM registrations_upi 
-- GROUP BY aadhar_number 
-- HAVING COUNT(*) > 1;

