'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilter } from '@/components/products/ProductFilter';
import { Search, Filter, Loader2, AlertCircle, RefreshCw, Grid, List, SortAsc } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
        setProducts(data.products || []);
      } else {
        setProducts(prev => [...prev, ...(data.products || [])]);
      }
      
      setHasMore(data.hasMore || false);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [filters]);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  }, []);

  // Load more products
  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchProducts(currentPage + 1, false);
    }
  }, [fetchProducts, currentPage, loadingMore, hasMore]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  // Handle refresh
  const handleRefresh = useCallback(() => {
    fetchProducts(1, true);
  }, [fetchProducts]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts(1, true);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, fetchProducts]);

  // Initial load
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name_ar.toLowerCase().includes(searchLower) ||
        (product.description_ar && product.description_ar.toLowerCase().includes(searchLower)) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        product.category && filters.categories.includes(product.category.id)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min !== null) {
      filtered = filtered.filter(product => product.price >= filters.priceRange.min!);
    }
    if (filters.priceRange.max !== null) {
      filtered = filtered.filter(product => product.price <= filters.priceRange.max!);
    }

    // Apply stock filter
    if (filters.inStockOnly) {
      filtered = filtered.filter(product => product.in_stock);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name_ar.localeCompare(b.name_ar));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
    }

    return filtered;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              منتجاتنا الطبيعية
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف مجموعة واسعة من المنتجات الطبيعية الأصيلة من قلب الطبيعة المغربية
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Filter className="w-5 h-5" />
              <span className="font-medium">تصفية المنتجات</span>
              <SortAsc className="w-4 h-4" />
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <ProductFilter 
                categories={categories}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Search and Controls */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="ابحث عن منتج..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange({ search: e.target.value })}
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-300"
                  />
                </div>

                {/* Sort Dropdown */}
                <select 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as 'name' | 'price-low' | 'price-high' | 'newest' })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-300"
                >
                  <option value="newest">الأحدث</option>
                  <option value="name">ترتيب حسب الاسم</option>
                  <option value="price-low">السعر: من الأقل للأعلى</option>
                  <option value="price-high">السعر: من الأعلى للأقل</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={loading}
                  className="p-3 text-amber-600 hover:bg-amber-50 rounded-xl transition-all duration-300 disabled:opacity-50"
                  title="تحديث"
                >
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Results Count */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-gray-600">
                  عرض <span className="font-bold text-amber-600">{filteredProducts.length}</span> منتج
                  {filters.search && ` من "${filters.search}"`}
                </p>
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
                    className="px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-all duration-300 font-medium"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && !error && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                <span className="mr-3 text-gray-600 font-medium">جاري تحميل المنتجات...</span>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && (
              <>
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <p className="text-gray-600 text-lg mb-4">
                      {filters.search ? 'لم يتم العثور على منتجات تطابق البحث' : 'لا توجد منتجات متاحة'}
                    </p>
                    {filters.search && (
                      <button
                        onClick={() => handleFilterChange({ search: '' })}
                        className="text-amber-600 hover:text-amber-700 font-medium"
                      >
                        مسح البحث
                      </button>
                    )}
                  </div>
                ) : (
                  <>
                    <div className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1'
                    }`}>
                      {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Load More Button */}
                    {hasMore && (
                      <div className="text-center mt-8">
                        <button
                          onClick={loadMore}
                          disabled={loadingMore}
                          className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          {loadingMore ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin inline-block ml-2" />
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}