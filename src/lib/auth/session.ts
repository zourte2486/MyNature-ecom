import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 48 * 60 * 60 * 1000; // 48 hours in milliseconds

export interface AdminSession {
  adminId: string;
  email: string;
  name: string;
  expiresAt: number;
}

export function createAdminSession(adminData: {
  adminId: string;
  email: string;
  name: string;
}): AdminSession {
  return {
    ...adminData,
    expiresAt: Date.now() + SESSION_DURATION
  };
}

export function isSessionValid(session: AdminSession | null): boolean {
  if (!session) return false;
  return Date.now() < session.expiresAt;
}

export function getSessionFromRequest(request: NextRequest): AdminSession | null {
  try {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) return null;

    const session = JSON.parse(sessionCookie.value) as AdminSession;
    return isSessionValid(session) ? session : null;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}

export function getSessionFromCookies(): AdminSession | null {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie) return null;

    const session = JSON.parse(sessionCookie.value) as AdminSession;
    return isSessionValid(session) ? session : null;
  } catch (error) {
    console.error('Error parsing session cookie:', error);
    return null;
  }
}

export function setSessionCookie(session: AdminSession): string {
  const cookieValue = JSON.stringify(session);
  const expires = new Date(session.expiresAt);
  
  return `${SESSION_COOKIE_NAME}=${encodeURIComponent(cookieValue)}; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${expires.toUTCString()}`;
}

export function clearSessionCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
