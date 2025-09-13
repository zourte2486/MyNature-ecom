-- Quick fix for missing image_urls column
-- Copy and paste this into Supabase SQL Editor

ALTER TABLE products ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';