-- Complete database fix for orders table
-- This script ensures all required columns exist and are properly configured

-- First, let's check the current structure
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE
    table_name = 'orders'
ORDER BY ordinal_position;

-- Add missing columns if they don't exist
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_city TEXT;

ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_address TEXT;

-- Update existing records that might have null values
UPDATE orders
SET
    customer_city = COALESCE(customer_city, 'غير محدد')
WHERE
    customer_city IS NULL;

UPDATE orders
SET
    customer_address = COALESCE(customer_address, 'غير محدد')
WHERE
    customer_address IS NULL;

-- Make sure the columns are not null going forward
ALTER TABLE orders ALTER COLUMN customer_city SET NOT NULL;

ALTER TABLE orders ALTER COLUMN customer_address SET NOT NULL;

-- Add default values for new records
ALTER TABLE orders
ALTER COLUMN customer_city
SET DEFAULT 'غير محدد';

ALTER TABLE orders
ALTER COLUMN customer_address
SET DEFAULT 'غير محدد';

-- Verify the final structure
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE
    table_name = 'orders'
ORDER BY ordinal_position;

-- Test insert to make sure it works
INSERT INTO
    orders (
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        customer_city,
        total_amount,
        status
    )
VALUES (
        'Test Customer',
        'test@example.com',
        '0612345678',
        'Test Address',
        'Test City',
        100.00,
        'pending'
    );

-- Clean up test record
DELETE FROM orders WHERE customer_name = 'Test Customer';

