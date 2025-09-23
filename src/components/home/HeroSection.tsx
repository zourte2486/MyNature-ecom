import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-right">
            <div className="inline-flex items-center px-4 py-2 bg-orange-200 text-orange-900 font-medium rounded-full mb-6 shadow-sm">
              <Star className="w-4 h-4 ml-2" />
              عسل طبيعي 100%
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-orange-900 mb-6 leading-tight">
              <span className="text-orange-600">عسل</span> ومنتجات طبيعية
              <br />
              <span className="arabic-text text-orange-800">مغربية أصيلة</span>
            </h1>
            
            <p className="text-xl text-orange-800 mb-8 max-w-2xl mx-auto lg:mx-0">
              اكتشف أجود أنواع العسل وزيت الأركان والأعشاب الطبية من قلب المغرب. 
              منتجات طبيعية 100% لجمالك وصحتك.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                تسوق الآن
                <ArrowLeft className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
              </Link>
              
              <Link
                href="/about"
                className="inline-flex items-center px-8 py-4 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-all duration-200"
              >
                تعرف علينا
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">500+</div>
                <div className="text-sm text-orange-700">عميل راضي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">50+</div>
                <div className="text-sm text-orange-700">منتج طبيعي</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">100%</div>
                <div className="text-sm text-orange-700">طبيعي</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-orange-200 to-orange-400 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
                <div className="text-center relative">
                  <div className="text-8xl mb-4 animate-float">🍯</div>
                  <div className="text-2xl font-bold text-orange-900">عسل طبيعي خالص</div>
                  <div className="text-orange-700">من جبال الأطلس</div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-300 rounded-full opacity-60 animate-float"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-400 rounded-full opacity-60 animate-honey-drip"></div>
            <div className="absolute top-1/2 -left-8 w-12 h-12 bg-orange-200 rounded-full opacity-40 animate-float"></div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-300 rounded-full opacity-20 animate-honey-drip"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200 rounded-full opacity-30 animate-float"></div>
      </div>
    </section>
  );
}
