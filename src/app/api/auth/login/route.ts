import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'البريد الإلكتروني وكلمة المرور مطلوبان'
      }, { status: 400 });
    }

    // Check admin user in database
    const { data: admin, error } = await supabase
      .from('admin_users')
      .select('id, email, name, password_hash, is_active')
      .eq('email', email)
      .eq('is_active', true)
      .single();

    if (error || !admin) {
      return NextResponse.json({
        success: false,
        error: 'بيانات الدخول غير صحيحة'
      }, { status: 401 });
    }

    // Simple password check (in production, use proper hashing)
    if (admin.password_hash !== password) {
      return NextResponse.json({
        success: false,
        error: 'بيانات الدخول غير صحيحة'
      }, { status: 401 });
    }

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });

    // Set session cookie (48 hours)
    const expires = new Date();
    expires.setTime(expires.getTime() + (48 * 60 * 60 * 1000));
    
    // Use Secure only in production (not on localhost)
    const isProduction = process.env.NODE_ENV === 'production';
    const secureFlag = isProduction ? 'Secure; ' : '';
    
    response.headers.set('Set-Cookie', 
      `admin_session=${admin.id}; Path=/; HttpOnly; ${secureFlag}SameSite=Strict; Expires=${expires.toUTCString()}`
    );

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في الخادم'
    }, { status: 500 });
  }
}
