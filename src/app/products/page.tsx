import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter } from '@/components/products/ProductFilter';
import { Search, Filter } from 'lucide-react';
import { getProducts } from '@/lib/supabase/products';
import { getCategories } from '@/lib/supabase/categories';
import { Product, Category } from '@/lib/types';

export default async function ProductsPage() {
  // Fetch products and categories from Supabase
  let products: Product[] = [];
  let categories: Category[] = [];
  
  try {
    [products, categories] = await Promise.all([
      getProducts(),
      getCategories()
    ]);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Fallback to empty arrays if there's an error
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              منتجاتنا الطبيعية
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              اكتشف مجموعة واسعة من العسل والمنتجات الطبيعية المغربية الأصيلة
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <ProductFilter categories={categories} />
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="name">ترتيب حسب الاسم</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
                <option value="newest">الأحدث</option>
              </select>
            </div>

            {/* Products Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                عرض {products.length} منتج
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-sm text-text-secondary">عرض:</span>
                <button className="p-2 bg-primary text-white rounded">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200">
                تحميل المزيد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
