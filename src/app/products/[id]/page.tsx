import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Truck, Shield, Heart } from 'lucide-react';
import { ProductOrderForm } from '@/components/products/ProductOrderForm';
import { formatPrice } from '@/lib/utils';
import { getProductById, getProductsByCategory } from '@/lib/supabase/products';
import { Product } from '@/lib/types';

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Await params before accessing properties (Next.js 15 requirement)
  const { id } = await params;
  
  // Fetch product from Supabase
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same category
  let relatedProducts: Product[] = [];
  try {
    relatedProducts = await getProductsByCategory(product.category_id);
    // Filter out the current product and limit to 2
    relatedProducts = relatedProducts
      .filter(p => p.id !== product.id)
      .slice(0, 2);
  } catch (error) {
    console.error('Error fetching related products:', error);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
            <Link href="/" className="text-text-secondary hover:text-primary">
              الرئيسية
            </Link>
            <ArrowRight className="w-4 h-4 text-text-secondary" />
            <Link href="/products" className="text-text-secondary hover:text-primary">
              المنتجات
            </Link>
            <ArrowRight className="w-4 h-4 text-text-secondary" />
            <span className="text-text-primary">{product.name_ar}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl shadow-honey overflow-hidden">
              {((product.images && product.images.length > 0) || (product.image_urls && product.image_urls.length > 0)) ? (
                <Image
                  src={product.images?.[0] || product.image_urls?.[0] || '/images/placeholder-honey.svg'}
                  alt={product.name_ar}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <Image
                    src="/images/placeholder-honey.svg"
                    alt="Placeholder"
                    width={200}
                    height={200}
                    className="opacity-80"
                  />
                </div>
              )}
            </div>
            
            {/* Additional Images */}
            {((product.images && product.images.length > 1) || (product.image_urls && product.image_urls.length > 1)) && (
              <div className="grid grid-cols-3 gap-2">
                {(product.images?.slice(1) || product.image_urls?.slice(1) || []).map((image, index) => (
                  <div key={index} className="aspect-square bg-white rounded-lg shadow-sm overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.name_ar} ${index + 2}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="text-primary font-medium">
              {product.category?.name_ar}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-text-primary">
              {product.name_ar}
            </h1>

            {/* Price */}
            <div className="text-4xl font-bold text-primary price">
              {formatPrice(product.price)}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-text-secondary">(4.8) - 24 تقييم</span>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-text-primary">الوصف</h3>
              <p className="text-text-secondary leading-relaxed">
                {product.description_ar}
              </p>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary">المميزات</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Heart className="w-5 h-5 text-primary" />
                  <span className="text-sm text-text-secondary">100% طبيعي</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-text-secondary">جودة مضمونة</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm text-text-secondary">توصيل سريع</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <span className="text-sm text-text-secondary">المنشأ: {product.origin}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-text-primary">العلامات</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent text-primary text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {product.in_stock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">
                    متوفر ({product.stock_quantity} قطعة)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">نفذ المخزون</span>
                </>
              )}
            </div>

            {/* Order Form */}
            <ProductOrderForm product={product} />
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8">منتجات ذات صلة</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-honey p-4 hover:shadow-honey-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg mb-4 flex items-center justify-center">
                  {(product.image_urls && product.image_urls.length > 0) ? (
                    <Image
                      src={product.image_urls[0]}
                      alt={product.name_ar}
                      width={80}
                      height={80}
                      className="object-cover rounded-lg"
                    />
                  ) : (
                    <Image
                      src="/images/placeholder-honey.svg"
                      alt="Placeholder"
                      width={80}
                      height={80}
                      className="opacity-80"
                    />
                  )}
                </div>
                <h3 className="font-semibold text-text-primary mb-2">{product.name_ar}</h3>
                <p className="text-sm text-text-secondary mb-3">{product.description_ar}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary price">{formatPrice(product.price)}</span>
                  <Link
                    href={`/products/${product.id}`}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
