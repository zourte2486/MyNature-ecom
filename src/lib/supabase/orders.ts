import { supabase } from '../supabase';
import { Order, OrderFormData } from '../types';

// Create a new order
export async function createOrder(orderData: OrderFormData): Promise<Order> {
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      customer_address: orderData.customer_address,
      city: orderData.city,
      notes: orderData.notes,
      status: 'PENDING',
      total_amount: 0, // Will be calculated
    })
    .select()
    .single();

  if (orderError) {
    console.error('Error creating order:', orderError);
    throw orderError;
  }

  // Calculate total and create order items
  let totalAmount = 0;
  const orderItems = [];

  for (const item of orderData.items) {
    // Get product price
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('price')
      .eq('id', item.product_id)
      .single();

    if (productError) {
      console.error('Error fetching product:', productError);
      throw productError;
    }

    const itemTotal = product.price * item.quantity;
    totalAmount += itemTotal;

    orderItems.push({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  // Insert order items
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    throw itemsError;
  }

  // Update order with total amount
  const { data: updatedOrder, error: updateError } = await supabase
    .from('orders')
    .update({ total_amount: totalAmount })
    .eq('id', order.id)
    .select(`
      *,
      order_items(
        *,
        product:products(*)
      )
    `)
    .single();

  if (updateError) {
    console.error('Error updating order total:', updateError);
    throw updateError;
  }

  return updatedOrder;
}

// Get all orders (for admin)
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(
        *,
        product:products(*)
      )
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  return data || [];
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items(
        *,
        product:products(*)
      )
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching order:', error);
    return null;
  }

  return data;
}

// Update order status
export async function updateOrderStatus(id: string, status: string): Promise<Order> {
  const { data, error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', id)
    .select(`
      *,
      order_items(
        *,
        product:products(*)
      )
    `)
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    throw error;
  }

  return data;
}
