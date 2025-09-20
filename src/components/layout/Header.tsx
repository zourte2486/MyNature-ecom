'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Heart, Search, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navigation = [
    { name: 'الرئيسية', href: '/', nameEn: 'Home' },
    { name: 'المنتجات', href: '/products', nameEn: 'Products' },
    { name: 'التصنيفات', href: '/categories', nameEn: 'Categories' },
    { name: 'من نحن', href: '/about', nameEn: 'About' },
    { name: 'اتصل بنا', href: '/contact', nameEn: 'Contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? 'bg-amber-50/98 backdrop-blur-xl shadow-2xl border-b border-amber-200' 
          : 'bg-gradient-to-r from-amber-50/95 to-orange-50/95 backdrop-blur-md shadow-lg border-b border-amber-200/30'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 rtl:space-x-reverse group"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <span className="text-white font-bold text-sm sm:text-lg" suppressHydrationWarning>🍯</span>
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-lg sm:text-xl transition-all duration-300 ${
                  isScrolled ? 'text-amber-900' : 'text-amber-800 drop-shadow-lg'
                }`}>
                  MyNature
                </span>
                <span className={`text-xs transition-all duration-300 ${
                  isScrolled ? 'text-amber-700' : 'text-amber-700'
                }`}>
                  عسل طبيعي
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse absolute left-1/2 transform -translate-x-1/2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                      isActive
                        ? 'text-amber-600 bg-amber-50'
                        : isScrolled 
                          ? 'text-amber-800 hover:text-amber-600 hover:bg-amber-50' 
                          : 'text-amber-800 hover:text-amber-600 hover:bg-amber-100/30 drop-shadow-md'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-amber-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-2 rtl:space-x-reverse">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                  isScrolled 
                    ? 'text-amber-700 hover:bg-amber-100' 
                    : 'text-amber-700 hover:bg-amber-100/30'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'text-amber-700 hover:bg-amber-100' 
                  : 'text-amber-700 hover:bg-amber-100/30'
              }`}>
                <Heart className="w-5 h-5" />
              </button>
              <button className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 relative ${
                isScrolled 
                  ? 'text-amber-700 hover:bg-amber-100' 
                  : 'text-amber-700 hover:bg-amber-100/30'
              }`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'text-amber-700 hover:bg-amber-100' 
                  : 'text-amber-700 hover:bg-amber-100/30'
              }`}>
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center space-x-1 rtl:space-x-reverse">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'text-amber-700 hover:bg-amber-100' 
                    : 'text-amber-700 hover:bg-amber-100/30'
                }`}
              >
                <Search className="w-5 h-5" />
              </button>
              <button className={`p-2 rounded-xl transition-all duration-300 relative ${
                isScrolled 
                  ? 'text-amber-700 hover:bg-amber-100' 
                  : 'text-amber-700 hover:bg-amber-100/30'
              }`}>
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${
                  isScrolled 
                    ? 'text-amber-700 hover:bg-amber-100' 
                    : 'text-amber-700 hover:bg-amber-100/30'
                }`}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden px-3 pb-3">
            <div className="bg-amber-50/95 backdrop-blur-xl rounded-2xl shadow-xl border border-amber-200 p-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث عن عسل طبيعي..."
                  className="w-full pr-10 pl-4 py-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-right"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-500 ease-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-3 pb-4">
            <div className="bg-amber-50/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-amber-100 overflow-hidden">
              <div className="p-2">
                {navigation.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                        isActive
                          ? 'bg-amber-100 text-amber-700 shadow-sm'
                          : 'text-amber-800 hover:bg-amber-50'
                      }`}
                      style={{
                        animationDelay: `${index * 50}ms`
                      }}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                
                {/* Mobile Additional Actions */}
                <div className="pt-3 border-t border-amber-100 mt-2">
                  <div className="flex items-center justify-around">
                    <button className="flex flex-col items-center p-3 text-amber-800 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105">
                      <Heart className="w-5 h-5 mb-1" />
                      <span className="text-xs">المفضلة</span>
                    </button>
                    <button className="flex flex-col items-center p-3 text-amber-800 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105">
                      <User className="w-5 h-5 mb-1" />
                      <span className="text-xs">حسابي</span>
                    </button>
                    <button className="flex flex-col items-center p-3 text-amber-800 hover:bg-amber-50 rounded-xl transition-all duration-300 hover:scale-105">
                      <ShoppingCart className="w-5 h-5 mb-1" />
                      <span className="text-xs">السلة</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16" />
    </>
  );
}