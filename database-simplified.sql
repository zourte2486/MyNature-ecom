-- =====================================================
-- MYNATURE ECOMMERCE DATABASE SCHEMA (Simplified)
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

-- Create orders table
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

-- No RLS needed since we removed authentication

-- =====================================================
-- 4. INSERT SAMPLE DATA
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

-- =====================================================
-- DATABASE SETUP COMPLETE
-- =====================================================