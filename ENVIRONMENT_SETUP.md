# Environment Setup Instructions

## Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

### Supabase Configuration

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Vercel Blob Storage Configuration

```env
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

## How to Get These Values

### Supabase

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the Project URL and anon/public key
5. Copy the service_role key (keep this secret!)

### Vercel Blob Storage

1. Go to [vercel.com](https://vercel.com)
2. Sign up for a free account
3. Create a new project or select existing one
4. Go to Settings > Environment Variables
5. Add `BLOB_READ_WRITE_TOKEN` with your blob token

## Fallback System

The application now has a fallback system:

1. **First**: Tries to upload images to Vercel Blob
2. **If Vercel Blob fails**: Automatically falls back to Supabase Storage
3. **If both fail**: Shows a clear error message

This means your app will work even if Vercel Blob is not configured!

## Testing

After setting up your environment variables:

1. Restart your development server: `npm run dev`
2. Try creating a product with images
3. Check the console logs to see which storage system is being used
