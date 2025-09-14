'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter } from '@/components/products/ProductFilter';
import { Search, Filter, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { Product, Category } from '@/lib/types';

// Types for filters and sorting
interface ProductFilters {
  search: string;
  categories: string[];
  priceRange: { min: number | null; max: number | null };
  inStockOnly: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest';
}

export default function ProductsPage() {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filters state
  const [filters, setFilters] = useState<ProductFilters>({
    search: '',
    categories: [],
    priceRange: { min: null, max: null },
    inStockOnly: false,
    sortBy: 'newest'
  });

  // Fetch products from API
  const fetchProducts = useCallback(async (page = 1, reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams({
        page: page.toString(),
        search: filters.search,
        categories: filters.categories.join(','),
        minPrice: filters.priceRange.min?.toString() || '',
        maxPrice: filters.priceRange.max?.toString() || '',
        inStockOnly: filters.inStockOnly.toString(),
        sortBy: filters.sortBy
      });

      const response = await fetch(`/api/products?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      
      if (reset) {
        setProducts(data.products);
        setCurrentPage(1);
      } else {
        setProducts(prev => [...prev, ...data.products]);
        setCurrentPage(page);
      }
      
      setHasMore(data.hasMore);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ في تحميل المنتجات');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
    fetchProducts(1, true);
  }, [fetchCategories, fetchProducts]);

  // Refetch when filters change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchProducts(1, true);
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [filters, fetchProducts]);

  // Filter products locally (for immediate UI updates)
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.name_ar.toLowerCase().includes(searchTerm) ||
        product.description?.toLowerCase().includes(searchTerm) ||
        product.description_ar?.toLowerCase().includes(searchTerm)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        filters.categories.includes(product.category_id)
      );
    }

    // Price range filter
    if (filters.priceRange.min !== null) {
      filtered = filtered.filter(product => product.price >= filters.priceRange.min!);
    }
    if (filters.priceRange.max !== null) {
      filtered = filtered.filter(product => product.price <= filters.priceRange.max!);
    }

    // Stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.in_stock);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name_ar.localeCompare(b.name_ar);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [products, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Handle load more
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchProducts(currentPage + 1, false);
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    fetchProducts(1, true);
  };

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
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <ProductFilter 
              categories={categories}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
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
                  value={filters.search}
                  onChange={(e) => handleFilterChange({ search: e.target.value })}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange({ sortBy: e.target.value as 'name' | 'price-low' | 'price-high' | 'newest' })}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="newest">الأحدث</option>
                <option value="name">ترتيب حسب الاسم</option>
                <option value="price-low">السعر: من الأقل للأعلى</option>
                <option value="price-high">السعر: من الأعلى للأقل</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                تصفية
              </button>
            </div>

            {/* Products Count and Actions */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-text-secondary">
                عرض {filteredProducts.length} منتج
                {filters.search && ` من "${filters.search}"`}
              </p>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-2 text-primary hover:bg-primary-50 rounded-lg transition-colors disabled:opacity-50"
                  title="تحديث"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && !error && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="mr-2 text-text-secondary">جاري تحميل المنتجات...</span>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-text-secondary text-lg mb-4">
                      {filters.search ? 'لم يتم العثور على منتجات تطابق البحث' : 'لا توجد منتجات متاحة'}
                    </p>
                    {filters.search && (
                      <button
                        onClick={() => handleFilterChange({ search: '' })}
                        className="text-primary hover:text-primary-dark"
                      >
                        مسح البحث
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}

                {/* Load More Button */}
                {hasMore && !loading && (
                  <div className="text-center mt-12">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          جاري التحميل...
                        </>
                      ) : (
                        'تحميل المزيد'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
