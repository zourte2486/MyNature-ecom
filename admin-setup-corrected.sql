-- =====================================================
-- ADMIN USER SETUP SQL - CORRECTED FOR YOUR TABLE STRUCTURE
-- =====================================================

-- 1. INSERT ADMIN USER INTO admin_users TABLE
-- =====================================================

-- Insert the admin user with the provided UID as the primary key
INSERT INTO admin_users (id, email, name, role)
VALUES (
    'f730f464-7d4b-49fb-b047-61ed60e6b3a1',
    'admin@mynature.com',
    'Admin User',
    'admin'
) ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    updated_at = NOW();

-- 2. VERIFY ADMIN USER WAS CREATED
-- =====================================================

-- Check if admin user was created successfully
SELECT 
    id,
    email,
    name,
    role,
    created_at
FROM admin_users 
WHERE id = 'f730f464-7d4b-49fb-b047-61ed60e6b3a1';

-- 3. UPDATE RLS POLICIES FOR ADMIN ACCESS
-- =====================================================

-- Ensure admin users can access all admin functions
-- Note: We'll use the id field to match with auth.uid()
CREATE POLICY "Admin users can manage all products" ON products FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()
    )
);

CREATE POLICY "Admin users can manage all categories" ON categories FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()
    )
);

CREATE POLICY "Admin users can manage all orders" ON orders FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()
    )
);

CREATE POLICY "Admin users can manage all order items" ON order_items FOR ALL USING (
    EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()
    )
);

-- 4. VERIFY SETUP
-- =====================================================

-- Check all admin users
SELECT 
    au.id,
    au.email,
    au.name,
    au.role,
    au.created_at,
    u.email_confirmed_at,
    u.created_at as auth_created_at
FROM admin_users au
LEFT JOIN auth.users u ON au.id = u.id
ORDER BY au.created_at DESC;

