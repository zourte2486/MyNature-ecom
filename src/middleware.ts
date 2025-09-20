import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
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
    // Simple check for admin session cookie
    const adminSession = request.cookies.get('admin_session');
    
    if (!adminSession) {
      // Redirect to login if no session cookie
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If session exists, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
};
