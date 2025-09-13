import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    // Test if image_urls column exists and works
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('id, name_ar, image_urls')
      .limit(3);

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Database schema test failed',
        details: error.message,
        suggestion: 'Run the SQL: ALTER TABLE products ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT \'{}\';'
      }, { status: 500 });
    }

    // Test inserting a product with image_urls
    const testProduct = {
      name: 'Test Product',
      name_ar: 'منتج تجريبي',
      description: 'Test description',
      description_ar: 'وصف تجريبي',
      price: 100,
      category_id: 'test-category',
      stock_quantity: 10,
      image_urls: ['https://example.com/test1.jpg', 'https://example.com/test2.jpg'],
      is_active: true,
      in_stock: true
    };

    const { data: insertTest, error: insertError } = await supabaseAdmin
      .from('products')
      .insert(testProduct)
      .select()
      .single();

    if (insertError) {
      return NextResponse.json({
        success: false,
        error: 'Insert test failed',
        details: insertError.message,
        suggestion: 'The image_urls column might not exist. Run the SQL fix.'
      }, { status: 500 });
    }

    // Clean up test product
    await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', insertTest.id);

    return NextResponse.json({
      success: true,
      message: 'Database schema is working correctly!',
      data: {
        existingProducts: products,
        imageUrlsColumn: 'Working',
        insertTest: 'Passed'
      }
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Schema test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
