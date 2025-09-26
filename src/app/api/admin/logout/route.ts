import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Clear the session cookie
    const response = NextResponse.json({ success: true });
    response.cookies.delete('admin-session');
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}