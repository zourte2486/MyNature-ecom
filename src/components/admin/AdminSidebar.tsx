'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';

const navigation = [
  { name: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard },
  { name: 'المنتجات', href: '/admin/products', icon: Package },
  { name: 'الطلبات', href: '/admin/orders', icon: ShoppingCart },
  { name: 'التقارير', href: '/admin/reports', icon: BarChart3 },
  { name: 'الإعدادات', href: '/admin/settings', icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center space-x-2 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍯</span>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">MyNature</div>
            <div className="text-xs text-text-secondary">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-3">
          <Link
            href="/"
            className="flex items-center px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg mb-2"
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
                className={`flex items-center px-3 py-2 text-sm rounded-lg mb-1 ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-text-secondary hover:text-primary hover:bg-primary/10'
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
      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">أ</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-text-primary">Admin User</div>
            <div className="text-xs text-text-secondary">admin@mynature.ma</div>
          </div>
          <button className="text-text-secondary hover:text-red-500">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
