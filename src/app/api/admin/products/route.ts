import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { uploadMultipleToSupabaseStorage } from '@/lib/supabase/storage';

// GET - Fetch all products
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in GET /api/admin/products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
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

    // Validate required fields
    if (!productData.name || !productData.name_ar || !productData.price || !productData.category_id) {
      return NextResponse.json({ 
        error: 'Missing required fields: name, name_ar, price, and category_id are required' 
      }, { status: 400 });
    }

    // Handle image uploads
    let imageUrls: string[] = [];
    const imageFiles = formData.getAll('images') as File[];
    
    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      try {
        console.log('Uploading images:', imageFiles.length, 'files');
        imageUrls = await uploadMultipleToSupabaseStorage(imageFiles);
        console.log('Images uploaded successfully to Supabase Storage:', imageUrls);
      } catch (error) {
        console.error('Error uploading images to Supabase Storage:', error);
        return NextResponse.json({ 
          error: `Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}` 
        }, { status: 500 });
      }
    } else {
      // Use placeholder if no images
      imageUrls = ['/images/placeholder-honey.svg'];
    }

    console.log('Inserting product with data:', {
      name: productData.name,
      name_ar: productData.name_ar,
      price: productData.price,
      category_id: productData.category_id,
      stock_quantity: productData.stock_quantity,
      image_urls: imageUrls
    });

    const { data: product, error } = await supabaseAdmin
      .from('products')
      .insert({
        name: productData.name,
        name_ar: productData.name_ar,
        description: productData.description,
        description_ar: productData.description_ar,
        price: productData.price,
        category_id: productData.category_id,
        stock_quantity: productData.stock_quantity,
        image_urls: imageUrls,
        is_active: true,
      })
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json({ 
        error: `Failed to create product: ${error.message}` 
      }, { status: 500 });
    }

    console.log('Product created successfully:', product);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error in POST /api/admin/products:', error);
    return NextResponse.json({ 
      error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
    }, { status: 500 });
  }
}
