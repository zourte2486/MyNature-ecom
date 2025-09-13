-- Safe setup for orders system
-- This script handles existing objects gracefully

-- 1. Fix image_urls column (if not exists)
ALTER TABLE products ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

-- 2. Create orders table (if not exists)
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    shipping_address JSONB NOT NULL,
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

-- 3. Create order_items table (if not exists)
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

-- 4. Create indexes (if not exists)
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items (product_id);

-- 5. Enable RLS (safe to run multiple times)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- 6. Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Orders are viewable by everyone" ON orders;

DROP POLICY IF EXISTS "Orders are insertable by everyone" ON orders;

DROP POLICY IF EXISTS "Orders are updatable by admins" ON orders;

DROP POLICY IF EXISTS "Order items are viewable by everyone" ON order_items;

DROP POLICY IF EXISTS "Order items are insertable by everyone" ON order_items;

-- 7. Create RLS policies
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
            admin_users.id = auth.uid ()
    )
);

CREATE POLICY "Order items are viewable by everyone" ON order_items FOR
SELECT USING (true);

CREATE POLICY "Order items are insertable by everyone" ON order_items FOR
INSERT
WITH
    CHECK (true);

-- 8. Create or replace function for updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. Drop and recreate trigger (safe)
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 10. Verify setup
SELECT 'Setup completed successfully!' as message;
