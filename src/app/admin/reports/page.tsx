'use client';

import { useState, useEffect } from 'react';

interface RecentOrder {
  id: string;
  customer_name?: string;
  created_at: string;
  status?: string;
}

interface Reports {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  recentOrders: RecentOrder[];
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Reports>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Fetch products count
      const productsResponse = await fetch('/api/admin/products');
      const products = await productsResponse.json();
      const productsCount = Array.isArray(products) ? products.length : 0;

      // Fetch orders count and recent orders
      const ordersResponse = await fetch('/api/orders');
      const orders = await ordersResponse.json();
      const ordersCount = Array.isArray(orders) ? orders.length : 0;

      // Calculate total revenue
      const totalRevenue = Array.isArray(orders) 
        ? orders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
        : 0;

      // Get recent orders (last 10)
      const recentOrders: RecentOrder[] = Array.isArray(orders) 
        ? orders.slice(0, 10)
        : [];

      setReports({
        totalProducts: productsCount,
        totalOrders: ordersCount,
        totalRevenue: totalRevenue,
        recentOrders: recentOrders
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">التقارير</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">إجمالي المنتجات</h3>
          <p className="text-3xl font-bold text-blue-600">{reports.totalProducts}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">إجمالي الطلبات</h3>
          <p className="text-3xl font-bold text-green-600">{reports.totalOrders}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">إجمالي الإيرادات</h3>
          <p className="text-3xl font-bold text-purple-600">{reports.totalRevenue} د.م</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">الطلبات الأخيرة</h3>
        </div>
        <div className="p-6">
          {reports.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      رقم الطلب
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      العميل
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      التاريخ
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الحالة
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.recentOrders.map((order: RecentOrder) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customer_name || 'غير محدد'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(order.created_at).toLocaleDateString('ar-SA')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {order.status || 'جديد'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">لا توجد طلبات بعد</p>
          )}
        </div>
      </div>
    </div>
  );
}
