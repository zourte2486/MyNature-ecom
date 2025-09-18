-- URGENT FIX: City Column Issue
-- This script fixes the city column constraint issue

-- Step 1: Check current table structure
SELECT '=== CURRENT TABLE STRUCTURE ===' as info;

SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE
    table_name = 'orders'
    AND column_name IN ('city', 'customer_city')
ORDER BY column_name;

-- Step 2: Check for NULL values in city column
SELECT '=== NULL VALUES CHECK ===' as info;

SELECT
    COUNT(*) as total_orders,
    COUNT(city) as orders_with_city,
    COUNT(*) - COUNT(city) as orders_with_null_city
FROM orders;

-- Step 3: Fix NULL values in city column
UPDATE orders
SET
    city = COALESCE(customer_city, 'غير محدد')
WHERE
    city IS NULL
    OR city = '';

-- Step 4: Make city column NOT NULL (if it isn't already)
ALTER TABLE orders ALTER COLUMN city SET NOT NULL;

-- Step 5: Add default value for future inserts
ALTER TABLE orders ALTER COLUMN city SET DEFAULT 'غير محدد';

-- Step 6: Verify the fix
SELECT '=== VERIFICATION ===' as info;

SELECT
    COUNT(*) as total_orders,
    COUNT(city) as orders_with_city,
    COUNT(*) - COUNT(city) as orders_without_city
FROM orders;

-- Step 7: Test insert
SELECT '=== TESTING INSERT ===' as info;

INSERT INTO
    orders (
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        city,
        total_amount,
        notes,
        status
    )
VALUES (
        'TEST CUSTOMER',
        'test@example.com',
        '1234567890',
        'Test Address',
        'Test City',
        100.00,
        'Test order',
        'pending'
    );

-- Check if the test order was created
SELECT '=== TEST ORDER CREATED ===' as info;

SELECT id, customer_name, city, status
FROM orders
WHERE
    customer_name = 'TEST CUSTOMER';

-- Clean up test data
DELETE FROM orders WHERE customer_name = 'TEST CUSTOMER';

SELECT '=== CITY FIX COMPLETE ===' as info;

SELECT 'Orders can now be created successfully!' as message;