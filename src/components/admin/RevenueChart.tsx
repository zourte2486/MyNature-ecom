'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  orders: Array<{
    total_amount: number;
    created_at: string;
  }>;
}

export function RevenueChart({ orders }: RevenueChartProps) {
  // Generate revenue data for the last 7 days
  const generateRevenueData = () => {
    const data = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.created_at);
        return orderDate.toDateString() === date.toDateString();
      });
      
      const revenue = dayOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
      
      data.push({
        name: date.toLocaleDateString('ar-EG', { weekday: 'short' }),
        revenue: revenue
      });
    }
    
    return data;
  };

  const data = generateRevenueData();

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-text-primary">إيرادات الأسبوع</h3>
        <p className="text-sm text-text-secondary">آخر 7 أيام</p>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `${value} د.م`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value} د.م`, 'الإيرادات']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#f59e0b" 
                strokeWidth={3}
                dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}