import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/auth/admin';
import { createAdminSession, setSessionCookie } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'البريد الإلكتروني وكلمة المرور مطلوبان'
      }, { status: 400 });
    }

    // Authenticate admin
    const authResult = await authenticateAdmin({ email, password });

    if (!authResult.success || !authResult.admin) {
      return NextResponse.json({
        success: false,
        error: authResult.error || 'بيانات الدخول غير صحيحة'
      }, { status: 401 });
    }

    // Create session
    const session = createAdminSession({
      adminId: authResult.admin.id,
      email: authResult.admin.email,
      name: authResult.admin.name
    });

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      admin: {
        id: authResult.admin.id,
        email: authResult.admin.email,
        name: authResult.admin.name
      }
    });

    // Set session cookie
    response.headers.set('Set-Cookie', setSessionCookie(session));

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في الخادم'
    }, { status: 500 });
  }
}
