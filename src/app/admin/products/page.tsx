import { ProductManagement } from '@/components/admin/ProductManagement';
import { getProducts } from '@/lib/supabase/products';
import { getCategories } from '@/lib/supabase/categories';
import { Product, Category } from '@/lib/types';

export default async function AdminProductsPage() {
  // Fetch data from Supabase
  let products: Product[] = [];
  let categories: Category[] = [];
  
  try {
    [products, categories] = await Promise.all([
      getProducts(),
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
      <ProductManagement products={products} categories={categories} />
    </div>
  );
}
