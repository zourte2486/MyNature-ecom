import { AdminStats } from '@/components/admin/AdminStats';
import { RecentOrders } from '@/components/admin/RecentOrders';
import { TopProducts } from '@/components/admin/TopProducts';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { Product, Order } from '@/lib/types';

export default async function AdminDashboard() {
  // For now, pass empty arrays to prevent fetch errors
  // The components will handle their own data fetching
  const orders: Order[] = [];
  const products: Product[] = [];
  
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-amber-900">لوحة التحكم</h1>
        <p className="text-amber-700">مرحباً بك في لوحة تحكم MyNature</p>
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
