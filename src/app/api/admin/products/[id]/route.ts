import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { uploadMultipleToVercelBlob } from '@/lib/vercel-blob';

// GET - Fetch single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data: product, error } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching product:', error);
      return NextResponse.json({
        error: `Failed to fetch product: ${error.message}`
      }, { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in GET /api/admin/products/[id]:', error);
    return NextResponse.json({
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}`
    }, { status: 500 });
  }
}

// PUT - Update a product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    // Extract product data
    const productData = {
      name: formData.get('name') as string,
      name_ar: formData.get('name_ar') as string,
      description: formData.get('description') as string,
      description_ar: formData.get('description_ar') as string,
      price: parseFloat(formData.get('price') as string),
      category_id: formData.get('category_id') as string,
      stock_quantity: parseInt(formData.get('stock_quantity') as string),
    };

    // Handle image uploads
    let imageUrls: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      try {
        console.log('Uploading images to Vercel Blob for update:', imageFiles.length, 'files');
        imageUrls = await uploadMultipleToVercelBlob(imageFiles, 'products');
        console.log('Images uploaded successfully to Vercel Blob for update:', imageUrls);
      } catch (error) {
        console.error('Error uploading images to Vercel Blob:', error);
        throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } else {
      // Keep existing images or use placeholder
      const existingProduct = await supabaseAdmin
        .from('products')
        .select('image_urls')
        .eq('id', id)
        .single();
      
      if (existingProduct.data?.image_urls) {
        imageUrls = existingProduct.data.image_urls;
      } else {
        imageUrls = ['/images/placeholder-honey.svg'];
      }
    }

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update({
        name: productData.name,
        name_ar: productData.name_ar,
        description: productData.description,
        description_ar: productData.description_ar,
        price: productData.price,
        category_id: productData.category_id,
        stock_quantity: productData.stock_quantity,
        image_urls: imageUrls,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      console.error('Error updating product:', error);
      return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in PUT /api/admin/products/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting product:', error);
      return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/products/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH - Toggle product status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { isActive } = await request.json();

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .update({ 
        is_active: isActive,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      console.error('Error toggling product status:', error);
      return NextResponse.json({ error: 'Failed to update product status' }, { status: 500 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in PATCH /api/admin/products/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}