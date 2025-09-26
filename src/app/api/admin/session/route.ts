import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const adminSession = request.cookies.get('admin-session');

    if (!adminSession?.value) {
      return NextResponse.json(
        { 
          success: false,
          authenticated: false 
        },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'An unexpected error occurred' 
      },
      { status: 500 }
    );
  }
}