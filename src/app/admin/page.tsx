import { AdminStats } from '@/components/admin/AdminStats';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { TopProducts } from '@/components/admin/TopProducts';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { getOrders } from '@/lib/supabase/orders';
import { getProducts } from '@/lib/supabase/products';
import { Product, Order } from '@/lib/types';

export default async function AdminDashboard() {
  // Fetch data from Supabase
  let orders: Order[] = [];
  let products: Product[] = [];
  
  try {
    [orders, products] = await Promise.all([
      getOrders(),
      getProducts()
    ]);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    // Fallback to empty arrays if there's an error
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">لوحة التحكم</h1>
        <p className="text-text-secondary">مرحباً بك في لوحة تحكم MyNature</p>
      </div>

      {/* Stats Cards */}
      <AdminStats />

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart orders={orders} />
        <TopProducts products={products} />
      </div>

      {/* Recent Orders */}
      <RecentOrders orders={orders} />
    </div>
  );
}
