import { ProductManagement } from '@/components/admin/ProductManagement';
import { AdminTableSkeleton } from '@/components/admin/AdminSkeleton';
import { getAdminProducts } from '@/lib/supabase/products';
import { getCategories } from '@/lib/supabase/categories';
import { Product, Category } from '@/lib/types';
import { Suspense } from 'react';

export default async function AdminProductsPage() {
  // Fetch data from Supabase
  let products: Product[] = [];
  let categories: Category[] = [];
  
  try {
    [products, categories] = await Promise.all([
      getAdminProducts(),
      getCategories()
    ]);
  } catch (error) {
    console.error('Error fetching admin products data:', error);
    // Fallback to empty arrays if there's an error
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">إدارة المنتجات</h1>
        <p className="text-text-secondary">إضافة وتعديل وحذف المنتجات</p>
      </div>

      {/* Product Management Component */}
      <Suspense fallback={<AdminTableSkeleton />}>
        <ProductManagement products={products} categories={categories} />
      </Suspense>
    </div>
  );
}
