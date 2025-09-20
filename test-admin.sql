-- Test admin user setup
SELECT 
    id, 
    email, 
    name, 
    role, 
    is_active, 
    password_hash,
    created_at
FROM admin_users 
WHERE email = 'admin@mynature.com';

-- Check if the admin user exists at all
SELECT COUNT(*) as admin_count FROM admin_users;

-- Check all admin users
SELECT * FROM admin_users;

