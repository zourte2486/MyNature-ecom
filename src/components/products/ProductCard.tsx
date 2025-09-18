'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Eye, ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

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
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        {hasImages ? (
          <>
            {imageLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-amber-200 border-t-amber-500"></div>
              </div>
            )}
            <Image
              src={getImageSrc()}
              alt={product.name_ar}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
              quality={85}
              onError={handleImageError}
              onLoad={handleImageLoad}
              unoptimized={false}
            />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
            <div className="text-6xl opacity-60">🍯</div>
          </div>
        )}
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex space-x-3 rtl:space-x-reverse">
            <Link
              href={`/products/${product.id}`}
              className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <Eye className="w-5 h-5 text-gray-700" />
            </Link>
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-red-50'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center hover:bg-amber-600 hover:scale-110 transition-all duration-300 shadow-lg">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stock Badge */}
        {!product.in_stock && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            نفذ المخزون
          </div>
        )}

        {/* Like Button (Mobile) */}
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 lg:hidden ${
            isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-white/90 backdrop-blur-sm text-gray-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 sm:p-5">
        {/* Category */}
        {product.category && (
          <div className="text-xs text-amber-600 font-semibold mb-2 uppercase tracking-wide">
            {product.category.name_ar}
          </div>
        )}

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-base sm:text-lg leading-tight">
          {product.name_ar}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {product.description_ar}
        </p>

        {/* Rating (Mock) */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
            ))}
          </div>
          <span className="text-xs text-gray-500 mr-2">(4.8)</span>
        </div>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price and Origin */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl sm:text-3xl font-bold text-amber-600">
            {formatPrice(product.price)}
          </div>
          {product.origin && (
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.origin}
            </div>
          )}
        </div>

        {/* Stock Quantity */}
        {product.stock_quantity && (
          <div className="text-xs text-gray-500 mb-4 flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            متوفر: {product.stock_quantity} قطعة
          </div>
        )}

        {/* Action Button */}
        <Link
          href={`/products/${product.id}`}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-4 rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 text-center block transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}