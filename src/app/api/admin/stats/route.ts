import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET(request: NextRequest) {
  try {
    // Get total orders count
    const { count: totalOrders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true });

    if (ordersError) {
      console.error('Error fetching orders count:', ordersError);
      return NextResponse.json({
        error: `Failed to fetch orders count: ${ordersError.message}`
      }, { status: 500 });
    }

    // Get orders by status
    const { data: ordersByStatus, error: statusError } = await supabaseAdmin
      .from('orders')
      .select('status')
      .not('status', 'is', null);

    if (statusError) {
      console.error('Error fetching orders by status:', statusError);
      return NextResponse.json({
        error: `Failed to fetch orders by status: ${statusError.message}`
      }, { status: 500 });
    }

    // Count orders by status
    const statusCounts = ordersByStatus?.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>) || {};

    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabaseAdmin
      .from('orders')
      .select('total_amount')
      .not('total_amount', 'is', null);

    if (revenueError) {
      console.error('Error fetching revenue data:', revenueError);
      return NextResponse.json({
        error: `Failed to fetch revenue data: ${revenueError.message}`
      }, { status: 500 });
    }

    const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

    // Get recent orders (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { count: recentOrders, error: recentError } = await supabaseAdmin
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', sevenDaysAgo.toISOString());

    if (recentError) {
      console.error('Error fetching recent orders:', recentError);
      return NextResponse.json({
        error: `Failed to fetch recent orders: ${recentError.message}`
      }, { status: 500 });
    }

    return NextResponse.json({
      totalOrders: totalOrders || 0,
      totalRevenue: totalRevenue,
      recentOrders: recentOrders || 0,
      ordersByStatus: {
        pending: statusCounts.pending || 0,
        confirmed: statusCounts.confirmed || 0,
        shipped: statusCounts.shipped || 0,
        delivered: statusCounts.delivered || 0,
        cancelled: statusCounts.cancelled || 0,
      }
    });

  } catch (error) {
    console.error('Error in GET /api/admin/stats:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
