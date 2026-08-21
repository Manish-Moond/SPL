-- Optional: Add check constraint to ensure UPI Transaction ID contains only numbers
-- This provides database-level validation as an additional safety measure

ALTER TABLE registrations_upi
ADD CONSTRAINT check_upi_transaction_id_numeric 
CHECK (upi_transaction_id ~ '^[0-9]+$');

-- Note: This constraint ensures that UPI Transaction ID contains only digits (0-9)
-- The regex pattern '^[0-9]+$' means:
-- ^ - Start of string
-- [0-9]+ - One or more digits
-- $ - End of string

