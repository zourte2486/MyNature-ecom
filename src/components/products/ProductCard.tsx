import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const getImageSrc = () => {
    if (imageError) return '/images/placeholder-honey.svg';
    return product.images?.[0] || product.image_urls?.[0] || product.image_url || '/images/placeholder-honey.svg';
  };

  const hasImages = (product.images && product.images.length > 0) || 
                   (product.image_urls && product.image_urls.length > 0) || 
                   product.image_url;

  return (
    <div className="group bg-white rounded-xl shadow-honey hover:shadow-honey-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {hasImages ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <Image
              src={getImageSrc()}
              alt={product.name_ar}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              quality={75}
              onError={handleImageError}
              onLoad={handleImageLoad}
              unoptimized={false}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
            <Image
              src="/images/placeholder-honey.svg"
              alt="Placeholder"
              width={100}
              height={100}
              className="opacity-80"
              priority={false}
            />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex space-x-2 rtl:space-x-reverse">
            <Link
              href={`/products/${product.id}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <Eye className="w-5 h-5" />
            </Link>
            <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stock Badge */}
        {!product.in_stock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            نفذ المخزون
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <div className="text-xs text-primary font-medium mb-2">
            {product.category.name_ar}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
          {product.name_ar}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {product.description_ar}
        </p>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent text-primary text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and Origin */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-primary price">
            {formatPrice(product.price)}
          </div>
          {product.origin && (
            <div className="text-xs text-text-secondary">
              {product.origin}
            </div>
          )}
        </div>

        {/* Stock Quantity */}
        {product.stock_quantity && (
          <div className="text-xs text-text-secondary mb-3">
            متوفر: {product.stock_quantity} قطعة
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/products/${product.id}`}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 text-center block"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}


          )}
        </div>

        {/* Stock Quantity */}
        {product.stock_quantity && (
          <div className="text-xs text-text-secondary mb-3">
            متوفر: {product.stock_quantity} قطعة
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/products/${product.id}`}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200 text-center block"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}

