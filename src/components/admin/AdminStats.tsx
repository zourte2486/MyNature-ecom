import { ShoppingCart, Package, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface AdminStatsProps {
  orders: Array<{
    total_amount?: number;
    status: string;
  }>;
  products: Array<{
    id: string;
  }>;
}

export function AdminStats({ orders, products }: AdminStatsProps) {
  // Calculate stats from real data
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total_amount || 0), 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const pendingOrders = orders.filter(order => order.status === 'PENDING').length;

  const stats = [
    {
      title: 'إجمالي المبيعات',
      value: totalRevenue.toLocaleString('en-US'),
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'الطلبات',
      value: totalOrders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'المنتجات',
      value: totalProducts.toString(),
      change: '+3.1%',
      trend: 'up',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'الطلبات المعلقة',
      value: pendingOrders.toString(),
      change: '-2.4%',
      trend: 'down',
      icon: Users,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary">{stat.title}</p>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <div className="flex items-center mt-2">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 ml-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 ml-1" />
                )}
                <span className={`text-sm font-medium ${stat.color}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-text-secondary mr-1">من الشهر الماضي</span>
              </div>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
