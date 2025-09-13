import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    // Test admin users table
    const { data: adminUsers, error: adminError } = await supabaseAdmin
      .from('admin_users')
      .select('*');

    if (adminError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch admin users',
        details: adminError
      }, { status: 500 });
    }

    // Test products table
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('*')
      .limit(5);

    if (productsError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to fetch products',
        details: productsError
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Admin setup test successful',
      data: {
        adminUsers: adminUsers || [],
        productsCount: products?.length || 0,
        sampleProducts: products || []
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
