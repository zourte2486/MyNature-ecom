import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const inStockOnly = searchParams.get('inStockOnly') === 'true';
    const sortBy = searchParams.get('sortBy') || 'newest';
    
    // Pagination
    const limit = 12;
    const offset = (page - 1) * limit;
    
    // Build query
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true);
    
    // Search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,name_ar.ilike.%${search}%,description.ilike.%${search}%,description_ar.ilike.%${search}%`);
    }
    
    // Category filter
    if (categories.length > 0) {
      query = query.in('category_id', categories);
    }
    
    // Price range filter
    if (minPrice) {
      query = query.gte('price', parseFloat(minPrice));
    }
    if (maxPrice) {
      query = query.lte('price', parseFloat(maxPrice));
    }
    
    // Stock filter
    if (inStockOnly) {
      query = query.eq('in_stock', true);
    }
    
    // Sorting
    switch (sortBy) {
      case 'name':
        query = query.order('name_ar', { ascending: true });
        break;
      case 'price-low':
        query = query.order('price', { ascending: true });
        break;
      case 'price-high':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }
    
    // Get total count for pagination
    const { count } = await query;
    
    // Apply pagination
    query = query.range(offset, offset + limit - 1);
    
    const { data: products, error } = await query;
    
    if (error) {
      console.error('Error fetching products:', error);
      return NextResponse.json(
        { error: 'Failed to fetch products' },
        { status: 500 }
      );
    }
    
    const hasMore = (offset + limit) < (count || 0);
    
    return NextResponse.json({
      products: products || [],
      hasMore,
      total: count || 0,
      page,
      limit
    });
    
  } catch (error) {
    console.error('Error in products API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
