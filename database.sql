-- =====================================================
-- MYNATURE ECOMMERCE DATABASE SCHEMA
-- Complete database setup for Morocco E-commerce Platform
-- =====================================================

-- =====================================================
-- 1. CREATE CORE TABLES
-- =====================================================

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    description TEXT,
    description_ar TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    description TEXT,
    description_ar TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    stock_quantity INTEGER DEFAULT 0,
    image_url TEXT,
    images TEXT[] DEFAULT '{}',
    image_urls TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table (updated schema)
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
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

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders (id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_is_active ON categories (is_active);

CREATE INDEX IF NOT EXISTS idx_categories_created_at ON categories (created_at);

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products (category_id);

CREATE INDEX IF NOT EXISTS idx_products_is_active ON products (is_active);

CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products (in_stock);

CREATE INDEX IF NOT EXISTS idx_products_created_at ON products (created_at);

CREATE INDEX IF NOT EXISTS idx_products_price ON products (price);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders (customer_email);

-- Order items indexes
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. CREATE RLS POLICIES
-- =====================================================

-- Categories policies
CREATE POLICY "Categories are viewable by everyone" ON categories FOR
SELECT USING (true);

CREATE POLICY "Categories are manageable by admins" ON categories FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_users
        WHERE
            id = auth.uid ()
    )
);

-- Products policies
CREATE POLICY "Products are viewable by everyone" ON products FOR
SELECT USING (true);

CREATE POLICY "Products are manageable by admins" ON products FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_users
        WHERE
            id = auth.uid ()
    )
);

-- Orders policies
CREATE POLICY "Orders are viewable by everyone" ON orders FOR
SELECT USING (true);

CREATE POLICY "Orders are insertable by everyone" ON orders FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Orders are updatable by admins" ON orders FOR
UPDATE USING (
    EXISTS (
        SELECT 1
        FROM admin_users
        WHERE
            id = auth.uid ()
    )
);

-- Order items policies
CREATE POLICY "Order items are viewable by everyone" ON order_items FOR
SELECT USING (true);

CREATE POLICY "Order items are insertable by everyone" ON order_items FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Order items are manageable by admins" ON order_items FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_users
        WHERE
            id = auth.uid ()
    )
);

-- Admin users policies
CREATE POLICY "Admin users are viewable by admins" ON admin_users FOR
SELECT USING (
        EXISTS (
            SELECT 1
            FROM admin_users
            WHERE
                id = auth.uid ()
        )
    );

CREATE POLICY "Admin users are manageable by admins" ON admin_users FOR ALL USING (
    EXISTS (
        SELECT 1
        FROM admin_users
        WHERE
            id = auth.uid ()
    )
);

-- =====================================================
-- 5. CREATE TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;

CREATE TRIGGER update_categories_updated_at 
    BEFORE UPDATE ON categories 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;

CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

CREATE TRIGGER update_orders_updated_at 
    BEFORE UPDATE ON orders 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

CREATE TRIGGER update_admin_users_updated_at 
    BEFORE UPDATE ON admin_users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 6. INSERT SAMPLE DATA
-- =====================================================

-- Insert sample categories
INSERT INTO
    categories (
        name,
        name_ar,
        description,
        description_ar
    )
VALUES (
        'Honey',
        'العسل',
        'Natural honey products',
        'منتجات العسل الطبيعي'
    ),
    (
        'Argan Oil',
        'زيت الأركان',
        'Pure argan oil products',
        'منتجات زيت الأركان الخالص'
    ),
    (
        'Herbs',
        'الأعشاب الطبية',
        'Medicinal herbs and plants',
        'الأعشاب والنباتات الطبية'
    ),
    (
        'Natural Oils',
        'الزيوت الطبيعية',
        'Natural oils and extracts',
        'الزيوت والمستخلصات الطبيعية'
    ) ON CONFLICT DO NOTHING;

-- Insert admin user
INSERT INTO
    admin_users (id, email, name, role)
VALUES (
        'f730f464-7d4b-49fb-b047-61ed60e6b3a1',
        'admin@mynature.com',
        'Admin User',
        'admin'
    ) ON CONFLICT (id) DO
UPDATE
SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- =====================================================
-- 7. VERIFY SETUP
-- =====================================================

-- Check all tables exist
SELECT table_name
FROM information_schema.tables
WHERE
    table_schema = 'public'
    AND table_name IN (
        'categories',
        'products',
        'orders',
        'order_items',
        'admin_users'
    )
ORDER BY table_name;

-- Check all indexes exist
SELECT indexname, tablename
FROM pg_indexes
WHERE
    schemaname = 'public'
    AND tablename IN (
        'categories',
        'products',
        'orders',
        'order_items',
        'admin_users'
    )
ORDER BY tablename, indexname;

-- Check RLS is enabled
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE
    schemaname = 'public'
    AND tablename IN (
        'categories',
        'products',
        'orders',
        'order_items',
        'admin_users'
    )
ORDER BY tablename;

-- =====================================================
-- DATABASE SETUP COMPLETE
-- =====================================================