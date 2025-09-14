'use client';

import { useState, useEffect } from 'react';
import { OrderManagement } from '@/components/admin/OrderManagement';

interface ShippingAddress {
  address: string;
  city: string;
  country: string;
}

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name_ar: string;
    price: number;
    image_urls: string[];
  };
}

interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: ShippingAddress;
  total_amount: number;
  status: string;
  notes?: string;
  created_at: string;
  order_items?: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">إدارة الطلبات</h1>
            <p className="text-text-secondary">عرض وإدارة طلبات العملاء</p>
          </div>
        </div>
        <div className="animate-pulse">
          <div className="bg-gray-200 h-64 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">إدارة الطلبات</h1>
            <p className="text-text-secondary">عرض وإدارة طلبات العملاء</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">خطأ في تحميل الطلبات: {error}</p>
          <button 
            onClick={fetchOrders}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">إدارة الطلبات</h1>
          <p className="text-text-secondary">عرض وإدارة طلبات العملاء ({orders.length} طلب)</p>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button 
            onClick={fetchOrders}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            تحديث
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            تصدير
          </button>
        </div>
      </div>

      {/* Order Management Component */}
      <OrderManagement orders={orders} onRefresh={fetchOrders} />
    </div>
  );
}
