import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        success: false,
        error: 'البريد الإلكتروني وكلمة المرور مطلوبان'
      }, { status: 400 });
    }

    // Simple hardcoded admin check for now
    if (email === 'admin@mynature.ma' && password === 'admin123') {
      // Create response with simple session cookie
      const response = NextResponse.json({
        success: true,
        admin: {
          id: 'admin-1',
          email: 'admin@mynature.ma',
          name: 'Admin User'
        }
      });

      // Set simple session cookie
      const expires = new Date();
      expires.setTime(expires.getTime() + (48 * 60 * 60 * 1000)); // 48 hours
      
      response.headers.set('Set-Cookie', 
        `admin_session=authenticated; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expires.toUTCString()}`
      );

      return response;
    }

    return NextResponse.json({
      success: false,
      error: 'بيانات الدخول غير صحيحة'
    }, { status: 401 });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في الخادم'
    }, { status: 500 });
  }
}
