import { formatPrice } from '@/lib/utils';
import { TrendingUp, Package } from 'lucide-react';

interface TopProductsProps {
  products: Array<{
    id: string;
    name: string;
    name_ar: string;
    price: number;
    stock_quantity?: number;
    category?: {
      name: string;
      name_ar: string;
    };
  }>;
}

export function TopProducts({ products }: TopProductsProps) {
  // Get top 5 products by stock quantity (or you could sort by sales)
  const topProducts = products
    .sort((a, b) => (b.stock_quantity || 0) - (a.stock_quantity || 0))
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-text-primary">أفضل المنتجات</h3>
          <div className="flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 ml-1" />
            <span>+12.5%</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {topProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <Package className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p>لا توجد منتجات</p>
          </div>
        ) : (
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="mr-3">
                    <div className="text-sm font-medium text-text-primary">
                      {product.name_ar || product.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {product.category?.name_ar || product.category?.name}
                    </div>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-text-primary">
                    {formatPrice(product.price)}
                  </div>
                  <div className="text-sm text-text-secondary">
                    المخزون: {product.stock_quantity || 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}