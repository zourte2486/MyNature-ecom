import { supabase } from '../supabase';
import { supabaseAdmin } from '../supabase-admin';

// Upload image to Supabase Storage
export async function uploadToSupabaseStorage(
  file: File,
  folder: string = 'products'
): Promise<string> {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    // Convert File to ArrayBuffer for upload
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    console.log('Attempting to upload file:', fileName, 'to bucket: product-images');

    // Upload file to Supabase Storage using admin client (bypasses RLS)
    const { data, error } = await supabaseAdmin.storage
      .from('product-images')
      .upload(filePath, uint8Array, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) {
      console.error('Error uploading to Supabase Storage:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // If it's an RLS policy error, provide helpful message
      if (error.message.includes('row-level security policy')) {
        throw new Error('Storage permissions not configured. Please run the storage setup SQL in Supabase.');
      }
      
      throw new Error(`Failed to upload image: ${error.message}`);
    }

    console.log('Upload successful, data:', data);

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from('product-images')
      .getPublicUrl(filePath);

    console.log('Public URL generated:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Exception in uploadToSupabaseStorage:', error);
    throw error;
  }
}

// Upload multiple images to Supabase Storage
export async function uploadMultipleToSupabaseStorage(
  files: File[],
  folder: string = 'products'
): Promise<string[]> {
  try {
    const uploadPromises = files.map(file => uploadToSupabaseStorage(file, folder));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images to Supabase Storage:', error);
    throw error;
  }
}

// Delete image from Supabase Storage
export async function deleteFromSupabaseStorage(filePath: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting from Supabase Storage:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  } catch (error) {
    console.error('Exception in deleteFromSupabaseStorage:', error);
    throw error;
  }
}