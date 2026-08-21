-- Migration: Add unique constraint on UPI Transaction ID to prevent duplicate transaction IDs
-- This ensures each UPI transaction ID can only be used once

-- Add unique constraint on UPI Transaction ID
ALTER TABLE registrations_upi 
ADD CONSTRAINT unique_upi_transaction UNIQUE (upi_transaction_id);

-- Note: Before running this, check for existing duplicates:
-- SELECT upi_transaction_id, COUNT(*) as count 
-- FROM registrations_upi 
-- GROUP BY upi_transaction_id 
-- HAVING COUNT(*) > 1;

