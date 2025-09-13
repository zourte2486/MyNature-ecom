import { NextResponse } from 'next/server';

export async function GET() {
  const envCheck = {
    supabase: {
      url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    },
    vercelBlob: {
      token: !!process.env.BLOB_READ_WRITE_TOKEN,
    }
  };

  return NextResponse.json({
    message: 'Environment variables check',
    config: envCheck,
    vercelBlobConfigured: envCheck.vercelBlob.token,
    supabaseConfigured: envCheck.supabase.url && envCheck.supabase.anonKey && envCheck.supabase.serviceKey
  });
}
