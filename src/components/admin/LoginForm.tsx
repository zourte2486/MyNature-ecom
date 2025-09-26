'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    error: '',
    loading: false
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.email.trim() || !formState.password.trim()) {
      setFormState(prev => ({ ...prev, error: 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' }));
      return;
    }

    setFormState(prev => ({ ...prev, error: '', loading: true }));

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formState.email.trim(),
          password: formState.password.trim()
        }),
        credentials: 'same-origin'
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'فشل تسجيل الدخول');
      }

      router.replace('/admin');
      router.refresh();
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'فشل تسجيل الدخول'
      }));
    } finally {
      setFormState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleInputChange = (field: 'email' | 'password') => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formState.error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {formState.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          value={formState.email}
          onChange={handleInputChange('email')}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="admin@mynature.com"
          disabled={formState.loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          كلمة المرور
        </label>
        <input
          type="password"
          value={formState.password}
          onChange={handleInputChange('password')}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          placeholder="••••••••"
          disabled={formState.loading}
        />
      </div>

      <button
        type="submit"
        disabled={formState.loading}
        className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-medium py-3 px-4 rounded-lg transition-colors"
      >
        {formState.loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
      </button>
    </form>
  );
}