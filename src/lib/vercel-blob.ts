import { put, del, list } from '@vercel/blob';

// Check if Vercel Blob is properly configured
export function isVercelBlobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

// Upload a single image to Vercel Blob
export async function uploadToVercelBlob(file: File, folder: string = 'morocco-ecommerce'): Promise<string> {
  try {
    // Check if Vercel Blob is configured
    if (!isVercelBlobConfigured()) {
      throw new Error('Vercel Blob is not properly configured. Please check your BLOB_READ_WRITE_TOKEN environment variable.');
    }

    console.log('Uploading to Vercel Blob:', file.name, 'to folder:', folder);

    const blob = await put(`${folder}/${file.name}`, file, {
      access: 'public',
    });

    console.log('Vercel Blob upload successful:', blob.url);
    return blob.url;
  } catch (error) {
    console.error('Error uploading to Vercel Blob:', error);
    throw new Error(`Failed to upload image to Vercel Blob: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Upload multiple images to Vercel Blob
export async function uploadMultipleToVercelBlob(files: File[], folder: string = 'morocco-ecommerce'): Promise<string[]> {
  try {
    console.log('Uploading multiple images to Vercel Blob:', files.length, 'files');
    
    const uploadPromises = files.map(file => uploadToVercelBlob(file, folder));
    const urls = await Promise.all(uploadPromises);
    
    console.log('All images uploaded successfully to Vercel Blob:', urls);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images to Vercel Blob:', error);
    throw error;
  }
}

// Delete an image from Vercel Blob
export async function deleteFromVercelBlob(url: string): Promise<void> {
  try {
    console.log('Deleting from Vercel Blob:', url);
    
    await del(url);
    
    console.log('Image deleted successfully from Vercel Blob');
  } catch (error) {
    console.error('Error deleting from Vercel Blob:', error);
    throw new Error(`Failed to delete image from Vercel Blob: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// List images in a folder
export async function listVercelBlobImages(folder: string = 'morocco-ecommerce'): Promise<Array<{ url: string; pathname: string; size: number; uploadedAt: Date }>> {
  try {
    console.log('Listing images in Vercel Blob folder:', folder);
    
    const { blobs } = await list({
      prefix: folder,
    });
    
    console.log('Found images in Vercel Blob:', blobs.length);
    return blobs;
  } catch (error) {
    console.error('Error listing images from Vercel Blob:', error);
    throw new Error(`Failed to list images from Vercel Blob: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
