import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { getCategories } from '@/lib/supabase/categories';
import { getProductsByCategory } from '@/lib/supabase/products';
import { Category } from '@/lib/types';

interface CategoryWithProducts extends Category {
  product_count: number;
  featured_products: Array<{
    name: string;
    name_ar: string;
    price: number;
  }>;
}

export default async function CategoriesPage() {
  // Fetch categories from Supabase
  let categories: CategoryWithProducts[] = [];
  try {
    const fetchedCategories = await getCategories();
    
    // Fetch product counts and featured products for each category
    categories = await Promise.all(
      fetchedCategories.map(async (category) => {
        try {
          const products = await getProductsByCategory(category.id);
          return {
            ...category,
            product_count: products.length,
            featured_products: products.slice(0, 3).map(product => ({
              name: product.name,
              name_ar: product.name_ar,
              price: product.price
            }))
          };
        } catch (error) {
          console.error(`Error fetching products for category ${category.id}:`, error);
          return {
            ...category,
            product_count: 0,
            featured_products: []
          };
        }
      })
    );
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback to empty array if there's an error
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-accent-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              تصفح حسب التصنيف
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              اكتشف منتجاتنا الطبيعية منظمة حسب التصنيفات المختلفة
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-honey hover:shadow-honey-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Category Image */}
              <div className="relative h-64">
                {category.image_url ? (
                  <Image
                    src={category.image_url}
                    alt={category.name_ar}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                    <span className="text-6xl">🌿</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 right-4 text-white">
                  <div className="text-2xl font-bold">{category.product_count}</div>
                  <div className="text-sm">منتج</div>
                </div>
              </div>

              {/* Category Content */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  {category.name_ar}
                </h2>
                <p className="text-text-secondary mb-4">
                  {category.description_ar}
                </p>

                {/* Featured Products */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-text-primary mb-2">
                    منتجات مميزة:
                  </h3>
                  <div className="space-y-1">
                    {category.featured_products.slice(0, 3).map((product, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">{product.name_ar}</span>
                        <span className="text-primary font-medium price">{product.price} درهم</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={`/products?category=${category.id}`}
                  className="inline-flex items-center w-full justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
                >
                  عرض المنتجات
                  <ArrowLeft className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              لا تجد ما تبحث عنه؟
            </h2>
            <p className="text-text-secondary mb-6">
              تواصل معنا وسنساعدك في العثور على المنتج المناسب لك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200"
              >
                اتصل بنا
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border-2 border-primary text-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-colors duration-200"
              >
                عرض جميع المنتجات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
