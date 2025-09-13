import { OrderManagement } from '@/components/admin/OrderManagement';
import { getOrders } from '@/lib/supabase/orders';
import { Order } from '@/lib/types';

export default async function AdminOrdersPage() {
  // Fetch orders from Supabase
  let orders: Order[] = [];
  
  try {
    orders = await getOrders();
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Fallback to empty array if there's an error
  }
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">إدارة الطلبات</h1>
          <p className="text-text-secondary">عرض وإدارة طلبات العملاء</p>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            تصدير
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            فلترة
          </button>
        </div>
      </div>

      {/* Order Management Component */}
      <OrderManagement orders={orders} />
    </div>
  );
}
