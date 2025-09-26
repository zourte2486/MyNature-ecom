import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Ensure request is JSON
    const contentType = request.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Invalid content type. Expected application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Redirect to admin login endpoint if trying to login with admin credentials
    if (email === process.env.ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/api/admin/login', request.url));
    }

    // Normal user authentication would go here
    // For now, we don't support regular user login
    return NextResponse.json(
      { error: 'Regular user login is not supported' },
      { status: 403 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}