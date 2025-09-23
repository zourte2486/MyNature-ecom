import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login pages, API routes, and static files
  if (
    pathname === '/login' || 
    pathname === '/admin/login' || 
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Only protect admin routes
  if (pathname.startsWith('/admin')) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession) {
      // Redirect to login if no session cookie
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // For now, just check if cookie exists (simplified validation)
    // In production, you might want to add more validation
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};
