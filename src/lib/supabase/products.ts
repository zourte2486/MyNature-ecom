import { supabase } from '../supabase';
import { Product } from '../types';

// Get all products
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }

  return data || [];
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching product:', error);
    return null;
  }

  return data;
}

// Get products by category
export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }

  return data || [];
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      category:categories(*)
    `)
    .or(`name.ilike.%${query}%,name_ar.ilike.%${query}%`)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching products:', error);
    throw error;
  }

  return data || [];
}

// Get featured products (you can customize this logic)
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (error) {
      console.error('Error fetching featured products:', error);
      // Return empty array instead of throwing to prevent app crash
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Exception in getFeaturedProducts:', err);
    return [];
  }
}
