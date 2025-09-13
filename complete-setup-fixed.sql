-- =====================================================
-- MyNature E-commerce Complete Database Setup (Fixed)
-- Run this entire script in your Supabase SQL Editor
-- This version handles existing policies gracefully
-- =====================================================

-- 1. DROP EXISTING POLICIES (to avoid conflicts)
-- =====================================================

-- Drop all existing policies
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop policies for all tables
    FOR r IN (SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON ' || r.schemaname || '.' || r.tablename;
    END LOOP;
END $$;

-- 2. CREATE TABLES
-- =====================================================

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    description TEXT,
    description_ar TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  description TEXT,
  description_ar TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  image_urls TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  weight_grams INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_email TEXT,
    customer_address TEXT NOT NULL,
    customer_city TEXT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'confirmed',
            'shipped',
            'delivered',
            'cancelled'
        )
    ),
    notes TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    order_id UUID REFERENCES orders (id) ON DELETE CASCADE,
    product_id UUID REFERENCES products (id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    user_id UUID REFERENCES auth.users (id) ON DELETE CASCADE UNIQUE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- 3. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 4. CREATE RLS POLICIES
-- =====================================================

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON categories FOR
SELECT USING (true);

CREATE POLICY "Only authenticated users can manage categories" ON categories FOR ALL USING (
    auth.role () = 'authenticated'
);

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON products FOR
SELECT USING (true);

CREATE POLICY "Only authenticated users can manage products" ON products FOR ALL USING (
    auth.role () = 'authenticated'
);

-- Orders policies
CREATE POLICY "Orders are viewable by everyone" ON orders FOR
SELECT USING (true);

CREATE POLICY "Anyone can create orders" ON orders FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Only authenticated users can update orders" ON orders FOR
UPDATE USING (
    auth.role () = 'authenticated'
);

-- Order items policies
CREATE POLICY "Order items are viewable by everyone" ON order_items FOR
SELECT USING (true);

CREATE POLICY "Anyone can create order items" ON order_items FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Only authenticated users can manage order items" ON order_items FOR ALL USING (
    auth.role () = 'authenticated'
);

-- Admin users policies
CREATE POLICY "Admin users can view all admin users" ON admin_users FOR
SELECT USING (
        auth.role () = 'authenticated'
    );

CREATE POLICY "Admin users can insert admin users" ON admin_users FOR
INSERT
WITH
    CHECK (
        auth.role () = 'authenticated'
    );

CREATE POLICY "Admin users can update admin users" ON admin_users FOR
UPDATE USING (
    auth.role () = 'authenticated'
);

-- 5. CREATE STORAGE BUCKET
-- =====================================================

-- Create storage bucket for product images
INSERT INTO
    storage.buckets (id, name, public)
VALUES (
        'product-images',
        'product-images',
        true
    ) ON CONFLICT (id) DO NOTHING;

-- 6. CREATE STORAGE POLICIES
-- =====================================================

-- Drop existing storage policies first
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE schemaname = 'storage' AND tablename = 'objects') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON storage.objects';
    END LOOP;
END $$;

-- Create policy to allow public access to view images
CREATE POLICY "Public Access" ON storage.objects FOR
SELECT USING (bucket_id = 'product-images');

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR
INSERT WITH CHECK (
    bucket_id = 'product-images' 
    AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to update images
CREATE POLICY "Authenticated users can update" ON storage.objects FOR
UPDATE USING (
    bucket_id = 'product-images' 
    AND auth.role() = 'authenticated'
);

-- Create policy to allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR 
DELETE USING (
    bucket_id = 'product-images' 
    AND auth.role() = 'authenticated'
);

-- 7. INSERT SAMPLE DATA
-- =====================================================

-- Clear existing data first
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM products;
DELETE FROM categories;

-- Insert sample categories
INSERT INTO categories (name, name_ar, description, description_ar, is_active, sort_order) VALUES
('Honey', 'عسل طبيعي', 'Pure natural honey from local beekeepers', 'عسل طبيعي خالص من النحالين المحليين', true, 1),
('Natural Products', 'منتجات طبيعية', 'Organic and natural health products', 'منتجات صحية عضوية وطبيعية', true, 2),
('Herbal Teas', 'شاي الأعشاب', 'Traditional herbal teas and infusions', 'شاي الأعشاب والمنقوعات التقليدية', true, 3),
('Cosmetics', 'مستحضرات التجميل', 'Natural beauty and skincare products', 'منتجات الجمال والعناية بالبشرة الطبيعية', true, 4);

-- Insert sample products
INSERT INTO products (name, name_ar, description, description_ar, price, category_id, stock_quantity, weight_grams, is_active) VALUES
('Wild Flower Honey', 'عسل الأزهار البرية', 'Pure wild flower honey collected from mountain regions', 'عسل الأزهار البرية الخالص المجمع من المناطق الجبلية', 45.00, (SELECT id FROM categories WHERE name = 'Honey'), 50, 500, true),
('Sidr Honey', 'عسل السدر', 'Premium Sidr honey with exceptional quality', 'عسل السدر الممتاز بجودة استثنائية', 85.00, (SELECT id FROM categories WHERE name = 'Honey'), 30, 500, true),
('Royal Jelly', 'غذاء ملكات النحل', 'Fresh royal jelly with high nutritional value', 'غذاء ملكات النحل الطازج بقيمة غذائية عالية', 120.00, (SELECT id FROM categories WHERE name = 'Natural Products'), 20, 100, true),
('Propolis Extract', 'مستخلص البروبوليس', 'Natural propolis extract for immune support', 'مستخلص البروبوليس الطبيعي لدعم المناعة', 65.00, (SELECT id FROM categories WHERE name = 'Natural Products'), 25, 50, true),
('Chamomile Tea', 'شاي البابونج', 'Organic chamomile tea for relaxation', 'شاي البابونج العضوي للاسترخاء', 25.00, (SELECT id FROM categories WHERE name = 'Herbal Teas'), 100, 100, true),
('Mint Tea', 'شاي النعناع', 'Fresh mint tea for digestion', 'شاي النعناع الطازج للهضم', 20.00, (SELECT id FROM categories WHERE name = 'Herbal Teas'), 80, 100, true),
('Honey Face Mask', 'قناع العسل للوجه', 'Natural honey face mask for glowing skin', 'قناع العسل الطبيعي للوجه لبشرة متوهجة', 35.00, (SELECT id FROM categories WHERE name = 'Cosmetics'), 40, 200, true),
('Argan Oil', 'زيت الأركان', 'Pure argan oil for hair and skin care', 'زيت الأركان الخالص للعناية بالشعر والبشرة', 55.00, (SELECT id FROM categories WHERE name = 'Cosmetics'), 35, 100, true);

-- Insert sample orders
INSERT INTO orders (customer_name, customer_phone, customer_email, customer_address, customer_city, total_amount, status) VALUES
('أحمد محمد', '+212612345678', 'ahmed@example.com', 'شارع الحسن الثاني، رقم 123', 'الدار البيضاء', 110.00, 'delivered'),
('فاطمة الزهراء', '+212698765432', 'fatima@example.com', 'حي المعاريف، عمارة 45', 'الرباط', 85.00, 'shipped'),
('محمد علي', '+212655443322', 'mohamed@example.com', 'شارع محمد الخامس، رقم 67', 'فاس', 60.00, 'pending');

-- Insert sample order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
((SELECT id FROM orders WHERE customer_name = 'أحمد محمد'), (SELECT id FROM products WHERE name = 'Wild Flower Honey'), 2, 45.00),
((SELECT id FROM orders WHERE customer_name = 'أحمد محمد'), (SELECT id FROM products WHERE name = 'Chamomile Tea'), 1, 20.00),
((SELECT id FROM orders WHERE customer_name = 'فاطمة الزهراء'), (SELECT id FROM products WHERE name = 'Sidr Honey'), 1, 85.00),
((SELECT id FROM orders WHERE customer_name = 'محمد علي'), (SELECT id FROM products WHERE name = 'Argan Oil'), 1, 55.00),
((SELECT id FROM orders WHERE customer_name = 'محمد علي'), (SELECT id FROM products WHERE name = 'Mint Tea'), 1, 5.00);

-- 8. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_user_id ON admin_users(user_id);

-- 9. CREATE FUNCTIONS FOR UPDATED_AT
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. INSERT ADMIN USER
-- =====================================================

-- Add the admin user to admin_users table
-- Note: Make sure to create this user in Supabase Authentication first
INSERT INTO
    admin_users (user_id, email, name, role)
VALUES (
        'd37ea05f-78bc-43b0-8492-d8d352f8bb99',
        'admin@mynature.com',
        'Admin User',
        'admin'
    ) ON CONFLICT (user_id) DO
UPDATE
SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    role = EXCLUDED.role;

-- =====================================================
-- SETUP COMPLETE!
-- =====================================================
--
-- Next steps:
-- 1. Create an admin user in Supabase Authentication with the same user_id
-- 2. Configure URL settings in Supabase Authentication:
--    - Site URL: http://localhost:3000
--    - Redirect URLs: http://localhost:3000/admin, http://localhost:3000/admin/login, etc.
-- 3. Test your application!
-- =====================================================