import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth/session';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for an admin route
  if (pathname.startsWith('/admin')) {
    // Skip middleware for login page
    if (pathname === '/login') {
      return NextResponse.next();
    }

    // Check for valid admin session
    const session = getSessionFromRequest(request);
    
    if (!session) {
      // Redirect to login if no valid session
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Add session info to headers for server components
    const response = NextResponse.next();
    response.headers.set('x-admin-session', JSON.stringify(session));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login'
  ]
};
