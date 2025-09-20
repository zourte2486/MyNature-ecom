import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'تم تسجيل الخروج بنجاح'
    });

    // Clear session cookie
    response.headers.set('Set-Cookie', 
      'admin_session=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    );

    return response;

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في تسجيل الخروج'
    }, { status: 500 });
  }
}
