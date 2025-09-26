import Link from 'next/link';
import LoginForm from '@/components/admin/LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            تسجيل دخول الإدارة
          </h1>
          <p className="text-gray-600">MyNature - لوحة إدارة المتجر</p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm">
            ← العودة إلى المتجر
          </Link>
        </div>
      </div>
    </div>
  );
}