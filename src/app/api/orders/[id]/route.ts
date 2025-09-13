import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

// GET - Fetch single order
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          *,
          product:products(
            id,
            name_ar,
            price,
            image_urls
          )
        )
      `)
      .eq('id', params.id)
      .single();

    if (error) {
      console.error('Error fetching order:', error);
      return NextResponse.json({
        error: `Failed to fetch order: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in GET /api/orders/[id]:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// PUT - Update order status
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status, notes } = await request.json();

    if (!status) {
      return NextResponse.json({
        error: 'Status is required'
      }, { status: 400 });
    }

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update({
        status,
        notes: notes || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json({
        error: `Failed to update order: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in PUT /api/orders/[id]:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// DELETE - Delete order
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // First, restore stock quantities
    const { data: orderItems } = await supabaseAdmin
      .from('order_items')
      .select('product_id, quantity')
      .eq('order_id', params.id);

    if (orderItems) {
      for (const item of orderItems) {
        await supabaseAdmin
          .from('products')
          .update({
            stock_quantity: supabaseAdmin.raw(`stock_quantity + ${item.quantity}`)
          })
          .eq('id', item.product_id);
      }
    }

    // Delete order items first
    await supabaseAdmin
      .from('order_items')
      .delete()
      .eq('order_id', params.id);

    // Delete order
    const { error } = await supabaseAdmin
      .from('orders')
      .delete()
      .eq('id', params.id);

    if (error) {
      console.error('Error deleting order:', error);
      return NextResponse.json({
        error: `Failed to delete order: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/orders/[id]:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}
