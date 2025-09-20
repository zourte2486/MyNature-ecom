'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export function SearchBanner() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const categories = [
    { id: '', name: 'جميع التصنيفات' },
    { id: 'honey', name: 'العسل' },
    { id: 'argan-oil', name: 'زيت الأركان' },
    { id: 'herbs', name: 'الأعشاب الطبية' },
    { id: 'oils', name: 'الزيوت الطبيعية' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      if (selectedCategory) {
        params.set('categories', selectedCategory);
      }
      router.push(`/products?${params.toString()}`);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      if (categoryId) {
        params.set('categories', categoryId);
      }
      router.push(`/products?${params.toString()}`);
    }
  };

  return (
    <section className="bg-gradient-to-r from-amber-100 to-orange-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            ابحث عن منتجاتك المفضلة
          </h2>
          <p className="text-lg text-amber-700">
            اكتشف أجود أنواع العسل والمنتجات الطبيعية
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-amber-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن العسل، زيت الأركان، الأعشاب..."
              className="w-full pl-4 pr-10 py-4 border border-amber-300 rounded-lg text-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent shadow-sm bg-white"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-800 hover:bg-amber-600 hover:text-white border border-amber-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search Button */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center px-8 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Search className="w-5 h-5 ml-2" />
              بحث
            </button>
          </div>
        </form>

        {/* Quick Search Suggestions */}
        <div className="mt-8">
          <p className="text-sm text-amber-700 text-center mb-4">ابحث عن:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['عسل طبيعي', 'زيت الأركان', 'أعشاب طبية', 'عسل السدر', 'زيت الزيتون'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchQuery(suggestion);
                  router.push(`/products?search=${encodeURIComponent(suggestion)}`);
                }}
                className="px-3 py-1 bg-white text-amber-700 hover:text-amber-600 hover:bg-amber-50 rounded-full text-sm transition-colors border border-amber-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




