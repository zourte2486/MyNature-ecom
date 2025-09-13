# Vercel Blob Storage Setup Instructions

## 1. Install Vercel Blob Package

```bash
npm install @vercel/blob
```

## 2. Get Vercel Blob Token

### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Get your blob token
vercel env pull .env.local
```

### Option B: Manual Setup

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Select your project**
3. **Go to Settings → Environment Variables**
4. **Add new variable:**
   - **Name:** `BLOB_READ_WRITE_TOKEN`
   - **Value:** Your blob token (starts with `vercel_blob_`)
   - **Environment:** All (Production, Preview, Development)

## 3. Update .env.local

Copy the template and fill in your actual values:

```bash
# Copy env-template.txt to .env.local
cp env-template.txt .env.local
```

Update `.env.local` with your Vercel Blob token:

```env
# Vercel Blob Storage Configuration
BLOB_READ_WRITE_TOKEN=vercel_blob_your_actual_token_here
```

## 4. Test Configuration

After setting up, test with:

```bash
npm run dev
```

Then go to `/admin` and try creating a product with images.

## 5. Vercel Blob Benefits

- ✅ **Fast CDN** - Images served from Vercel's global CDN
- ✅ **Automatic optimization** - Images are optimized automatically
- ✅ **Easy integration** - Works seamlessly with Next.js
- ✅ **Free tier** - 1GB storage, 100GB bandwidth per month
- ✅ **No configuration** - Just add the token and you're ready

## 6. Troubleshooting

If you see "Vercel Blob is not properly configured":

1. Check `.env.local` exists and has correct `BLOB_READ_WRITE_TOKEN`
2. Restart your development server (`npm run dev`)
3. Verify the token is correct in Vercel dashboard
4. Check browser console for detailed error messages

## 7. Free Tier Limits

- **1GB storage**
- **100GB bandwidth per month**
- **Perfect for small to medium e-commerce sites**

## 8. Production Deployment

When deploying to Vercel:

1. **Add environment variable in Vercel dashboard**
2. **Deploy your project**
3. **Images will be automatically stored in Vercel Blob**

## 9. Image URLs

Images will be stored at URLs like:

```
https://[your-blob-url].vercel-storage.com/morocco-ecommerce/image-name.jpg
```

These URLs are:

- **Publicly accessible**
- **CDN optimized**
- **Automatically cached**
