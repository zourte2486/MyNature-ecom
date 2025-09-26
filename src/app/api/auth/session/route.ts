import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin-session');

  return NextResponse.json({
    authenticated: !!adminSession,
  });
}