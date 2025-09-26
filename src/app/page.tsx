import Link from 'next/link';
import { ArrowLeft, Truck, Shield, Heart } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { SearchBanner } from '@/components/home/SearchBanner';
import { getFeaturedProducts } from '@/lib/supabase/products';
import { Product } from '@/lib/types';
import { Suspense } from 'react';

export default async function Home() {
  // Fetch featured products from Supabase
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch (error) {
    console.error('Error fetching featured products:', error);
    // Fallback to empty array if there's an error
  }
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <HeroSection />

      {/* Search Banner */}
      <SearchBanner />

      {/* Features Section */}
      <FeaturesSection />

      {/* Featured Products */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-orange-900 mb-4">
              منتجاتنا المميزة
            </h2>
            <p className="text-lg text-orange-700 max-w-2xl mx-auto">
              اكتشف أجود أنواع العسل والمنتجات الطبيعية المغربية الأصيلة
            </p>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg h-80"></div>
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              عرض جميع المنتجات
              <ArrowLeft className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              لماذا تختار MyNature؟
            </h2>
            <p className="text-lg text-text-secondary">
              نحن ملتزمون بتقديم أفضل المنتجات الطبيعية المغربية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                100% طبيعي
              </h3>
              <p className="text-text-secondary">
                جميع منتجاتنا طبيعية 100% بدون أي إضافات كيميائية
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                جودة مضمونة
              </h3>
              <p className="text-text-secondary">
                نضمن جودة منتجاتنا من خلال فحص دقيق ومتابعة مستمرة
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                توصيل سريع
              </h3>
              <p className="text-text-secondary">
                نقدم خدمة توصيل سريعة وآمنة لجميع أنحاء المغرب
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
