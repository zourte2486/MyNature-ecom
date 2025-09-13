'use client';

import { useState } from 'react';
import { Category } from '@/lib/types';
import { X } from 'lucide-react';

interface ProductFilterProps {
  categories: Category[];
}

export function ProductFilter({ categories }: ProductFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
    setInStockOnly(false);
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
                checked={selectedCategories.includes(category.id)}
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
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="number"
            placeholder="إلى"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stock Filter */}
      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="mr-2 text-sm text-text-secondary">
            متوفر فقط
          </span>
        </label>
      </div>

      {/* Apply Filters Button */}
      <button className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-dark transition-colors duration-200">
        تطبيق التصفية
      </button>
    </div>
  );
}
