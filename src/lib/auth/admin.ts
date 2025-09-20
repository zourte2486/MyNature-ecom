import { supabaseAdmin } from '@/lib/supabase-admin';

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
}

export async function authenticateAdmin(credentials: AdminCredentials): Promise<{
  success: boolean;
  admin?: AdminUser;
  error?: string;
}> {
  try {
    // Check if admin exists in the admin_users table
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, is_active')
      .eq('email', credentials.email)
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

        // For now, we'll use a simple password check
        // In production, you should hash passwords and use proper authentication
        const { data: adminWithPassword } = await supabaseAdmin
          .from('admin_users')
          .select('password_hash')
          .eq('id', admin.id)
          .single();

    // Simple password validation (replace with proper hashing in production)
    if (adminWithPassword?.password_hash !== credentials.password) {
      return {
        success: false,
        error: 'Invalid credentials'
      };
    }

    return {
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        is_active: admin.is_active
      }
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return {
      success: false,
      error: 'Authentication failed'
    };
  }
}

export async function getAdminById(adminId: string): Promise<AdminUser | null> {
  try {
    const { data: admin, error } = await supabaseAdmin
      .from('admin_users')
      .select('id, email, name, is_active')
      .eq('id', adminId)
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      return null;
    }

    return {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      is_active: admin.is_active
    };
  } catch (error) {
    console.error('Error fetching admin:', error);
    return null;
  }
}
