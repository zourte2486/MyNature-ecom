import { NextResponse } from 'next/server';
import { isVercelBlobConfigured } from '@/lib/vercel-blob';

export async function GET() {
  try {
    const isConfigured = isVercelBlobConfigured();
    
    const config = {
      blob_token: process.env.BLOB_READ_WRITE_TOKEN ? '✅ Set' : '❌ Missing',
      isConfigured
    };

    return NextResponse.json({
      message: 'Vercel Blob Configuration Test',
      config,
      instructions: isConfigured 
        ? 'Vercel Blob is properly configured! You can now upload images.'
        : 'Please check your .env.local file and ensure BLOB_READ_WRITE_TOKEN is set correctly.'
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to check Vercel Blob configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
