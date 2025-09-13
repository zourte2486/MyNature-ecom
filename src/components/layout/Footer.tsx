import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🍯</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-primary">MyNature</span>
                <span className="text-sm text-gray-300 arabic-text">طبيعة</span>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              متجر عسل ومنتجات طبيعية مغربية أصيلة. نحن نقدم أجود أنواع العسل وزيت الأركان والأعشاب الطبية من قلب المغرب.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-primary transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-primary transition-colors">
                  المنتجات
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-300 hover:text-primary transition-colors">
                  التصنيفات
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-primary transition-colors">
                  من نحن
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-gray-300 phone">+212 6 12 34 56 78</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-gray-300">info@mynature.ma</span>
              </div>
              <div className="flex items-start space-x-2 rtl:space-x-reverse">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className="text-gray-300">
                  الدار البيضاء، المغرب
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 MyNature. جميع الحقوق محفوظة.
            </p>
            <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-primary text-sm transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-primary text-sm transition-colors">
                شروط الاستخدام
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
