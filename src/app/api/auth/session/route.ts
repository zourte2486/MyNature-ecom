import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth/session';
import { getAdminById } from '@/lib/auth/admin';

export async function GET(request: NextRequest) {
  try {
    const session = getSessionFromRequest(request);

    if (!session) {
      return NextResponse.json({
        authenticated: false,
        error: 'No valid session found'
      }, { status: 401 });
    }

    // Verify admin still exists and is active
    const admin = await getAdminById(session.adminId);

    if (!admin) {
      return NextResponse.json({
        authenticated: false,
        error: 'Admin account not found or inactive'
      }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      },
      session: {
        expiresAt: session.expiresAt,
        timeRemaining: session.expiresAt - Date.now()
      }
    });

  } catch (error) {
    console.error('Session validation error:', error);
    return NextResponse.json({
      authenticated: false,
      error: 'Session validation failed'
    }, { status: 500 });
  }
}
