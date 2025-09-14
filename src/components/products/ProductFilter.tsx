'use client';

import { Category } from '@/lib/types';
import { X } from 'lucide-react';

interface ProductFilters {
  search: string;
  categories: string[];
  priceRange: { min: number | null; max: number | null };
  inStockOnly: boolean;
  sortBy: 'name' | 'price-low' | 'price-high' | 'newest';
}

interface ProductFilterProps {
  categories: Category[];
  filters: ProductFilters;
  onFilterChange: (filters: Partial<ProductFilters>) => void;
}

export function ProductFilter({ categories, filters, onFilterChange }: ProductFilterProps) {
  const handleCategoryToggle = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];
    
    onFilterChange({ categories: newCategories });
  };

  const handlePriceRangeChange = (field: 'min' | 'max', value: string) => {
    const numValue = value === '' ? null : Number(value);
    onFilterChange({
      priceRange: {
        ...filters.priceRange,
        [field]: numValue
      }
    });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      categories: [],
      priceRange: { min: null, max: null },
      inStockOnly: false,
      sortBy: 'newest'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-honey p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">تصفية المنتجات</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:text-primary-dark flex items-center"
        >
          <X className="w-4 h-4 ml-1" />
          مسح الكل
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">التصنيفات</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="mr-2 text-sm text-text-secondary">
                {category.name_ar}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">نطاق السعر (درهم)</h4>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="من"
            value={filters.priceRange.min || ''}
            onChange={(e) => handlePriceRangeChange('min', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="number"
            placeholder="إلى"
            value={filters.priceRange.max || ''}
            onChange={(e) => handlePriceRangeChange('max', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stock Filter */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="mr-2 text-sm text-text-secondary">
            متوفر فقط
          </span>
        </label>
      </div>

      {/* Active Filters Count */}
      {filters.categories.length > 0 || filters.priceRange.min !== null || filters.priceRange.max !== null || filters.inStockOnly ? (
        <div className="mb-4 p-3 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary font-medium">
            {filters.categories.length + 
             (filters.priceRange.min !== null ? 1 : 0) + 
             (filters.priceRange.max !== null ? 1 : 0) + 
             (filters.inStockOnly ? 1 : 0)} تصفية نشطة
          </p>
        </div>
      ) : null}
    </div>
  );
}
