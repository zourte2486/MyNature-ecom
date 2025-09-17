'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingCart, Heart, Search } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
        : 'bg-surface shadow-honey'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-xl">🍯</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary group-hover:text-primary-dark transition-colors">MyNature</span>
              <span className="text-xs text-text-secondary arabic-text">طبيعة</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary'
                      : 'text-text-primary hover:text-primary'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-text-primary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg border border-gray-100">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-text-primary hover:text-primary hover:bg-primary/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile Actions */}
              <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse pt-2 border-t border-gray-100 mt-2">
                <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200">
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

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
              {/* Admin button removed for client navigation */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10 font-medium'
                        : 'text-text-primary hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

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
              {/* Admin button removed for client navigation */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
