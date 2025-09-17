import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// GET - Fetch all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let query = supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(
            id,
            name_ar,
            price,
            images
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: orders, error } = await query;

    if (error) {
      console.error('Error fetching orders:', error);
      return NextResponse.json({
        error: `Failed to fetch orders: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json(orders || []);
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// POST - Create new order
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    
    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      customer_city,
      items,
      total_amount,
      notes
    } = orderData;

    // Validate required fields
    if (!customer_name || !customer_email || !items || items.length === 0) {
      return NextResponse.json({
        error: 'Missing required fields: customer_name, customer_email, and items are required'
      }, { status: 400 });
    }

    // Create order
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name,
        customer_email,
        customer_phone,
        customer_address,
        customer_city,
        total_amount,
        notes,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json({
        error: `Failed to create order: ${orderError.message}`
      }, { status: 500 });
    }

    // Create order items
    interface OrderItem {
      product_id: string;
      quantity: number;
      price: number;
    }
    
    const orderItems = items.map((item: OrderItem) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      console.error('Error creating order items:', itemsError);
      // Rollback order creation
      await supabaseAdmin
        .from('orders')
        .delete()
        .eq('id', order.id);
      
      return NextResponse.json({
        error: `Failed to create order items: ${itemsError.message}`
      }, { status: 500 });
    }

    // Update product stock quantities
    for (const item of items) {
      // Get current stock quantity first
      const { data: product } = await supabaseAdmin
        .from('products')
        .select('stock_quantity')
        .eq('id', item.product_id)
        .single();
      
      if (product) {
        const { error: stockError } = await supabaseAdmin
          .from('products')
          .update({
            stock_quantity: product.stock_quantity - item.quantity
          })
          .eq('id', item.product_id);

        if (stockError) {
          console.error('Error updating stock for product:', item.product_id, stockError);
        }
      }
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
