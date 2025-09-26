'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Home,
  LogOut
} from 'lucide-react';

const navigation = [
  { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { name: 'المنتجات', href: '/admin/products', icon: Package },
  { name: 'الطلبات', href: '/admin/orders', icon: ShoppingCart },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-amber-50 shadow-lg h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-amber-200">
        <Link href="/admin" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍯</span>
          </div>
          <div>
            <div className="text-lg font-bold text-amber-900">MyNature</div>
            <div className="text-xs text-amber-700">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-3">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm text-amber-700 hover:text-amber-600 hover:bg-amber-100 rounded-lg mb-2"
          >
            <Home className="w-5 h-5 ml-3" />
            العودة للموقع
          </Link>
        </div>
        
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                prefetch={true}
                className={`flex items-center px-3 py-2 text-sm rounded-lg mb-1 transition-all duration-200 ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-amber-700 hover:text-amber-600 hover:bg-amber-100 hover:shadow-sm'
                }`}
              >
                <item.icon className="w-5 h-5 ml-3" />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Info */}
      <div className="absolute bottom-0 w-64 p-4 border-t border-amber-200">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-amber-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-amber-800">أ</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-amber-900">Admin User</div>
            <div className="text-xs text-amber-700">admin@mynature.ma</div>
          </div>
          <button className="text-amber-700 hover:text-red-500">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}