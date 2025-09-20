'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();

  // Check if already logged in (only once on mount)
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            const redirectTo = searchParams.get('redirect') || '/admin';
            window.location.href = redirectTo;
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };
    
    checkSession();
  }, [searchParams]); // Include searchParams in dependencies

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Force redirect using window.location to prevent Fast Refresh issues
        const redirectTo = searchParams.get('redirect') || '/admin';
        window.location.href = redirectTo;
      } else {
        setError(data.error || 'خطأ في تسجيل الدخول');
        setLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('حدث خطأ في الاتصال بالخادم');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-800 mb-2">
            تسجيل دخول الإدارة
          </h1>
          <p className="text-slate-600">MyNature - لوحة إدارة المتجر</p>
          {loading && (
            <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
              <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600"></div>
                <span className="text-teal-700 text-sm">جاري تسجيل الدخول...</span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="admin@mynature.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-teal-600 hover:text-teal-700 text-sm"
          >
            ← العودة إلى المتجر
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto"></div>
          <p className="mt-4 text-slate-600">جاري التحميل...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
