-- Migration script to update the default amount from 550.00 to 500.00
-- This script safely updates the table schema without affecting existing records

-- Update the default value for the amount column
ALTER TABLE registrations 
ALTER COLUMN amount SET DEFAULT 500.00;

-- Optional: If you want to update existing pending registrations with amount = 550.00 to 500.00
-- Uncomment the line below if you want to update existing records
-- UPDATE registrations SET amount = 500.00 WHERE amount = 550.00 AND payment_status = 'pending';

