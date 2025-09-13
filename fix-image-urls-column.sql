-- Fix missing image_urls column in products table
-- Run this in your Supabase SQL Editor

-- First, let's check the current structure
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE
    table_name = 'products'
ORDER BY ordinal_position;

-- Add the missing image_urls column
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

-- Update existing products to have empty image_urls array if they don't have it
UPDATE products SET image_urls = '{}' WHERE image_urls IS NULL;

-- If you have existing image_url column, you might want to migrate data
-- (Uncomment the following lines if you have an image_url column to migrate)
-- UPDATE products
-- SET image_urls = ARRAY[image_url]
-- WHERE image_url IS NOT NULL AND image_url != '';

-- Verify the column was added
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE
    table_name = 'products'
    AND column_name = 'image_urls';