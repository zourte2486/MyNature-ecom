'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', href: '/', nameEn: 'Home' },
    { name: 'المنتجات', href: '/products', nameEn: 'Products' },
    { name: 'التصنيفات', href: '/categories', nameEn: 'Categories' },
    { name: 'من نحن', href: '/about', nameEn: 'About' },
    { name: 'اتصل بنا', href: '/contact', nameEn: 'Contact' },
  ];

  return (
    <header className="bg-surface shadow-honey sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🍯</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">MyNature</span>
              <span className="text-xs text-text-secondary arabic-text">طبيعة</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-text-primary hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <Link
              href="/admin"
              className="flex items-center space-x-1 rtl:space-x-reverse text-text-secondary hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="text-sm">Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-primary hover:text-primary transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-accent rounded-lg mt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-text-primary hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/admin"
                className="block px-3 py-2 text-text-secondary hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
