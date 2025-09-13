# MyNature - Honey & Natural Products Shop

## 🚀 Quick Start

### 1. Environment Setup

Your `.env` file is already configured with:

- Supabase URL and keys
- App configuration
- Vercel Blob Storage (with Supabase Storage fallback)

### 2. Database Setup

Run the SQL scripts in your Supabase dashboard:

1. **Main Schema**: `database-schema.sql`
2. **Storage Setup**: `setup-storage.sql`

### 3. Start Development Server

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/            # Admin components
│   ├── home/             # Homepage components
│   ├── products/         # Product components
│   └── ui/               # UI components
├── lib/                  # Utilities and services
│   ├── supabase/         # Supabase functions
│   └── types.ts          # TypeScript types
└── public/               # Static assets
    └── images/           # Images and placeholders
```

## 🔧 Features

### ✅ Completed

- [x] **Frontend**: Next.js 15 with App Router
- [x] **Styling**: Tailwind CSS with honey theme
- [x] **Database**: Supabase with PostgreSQL
- [x] **Authentication**: Admin-only access
- [x] **Image Storage**: Vercel Blob (with Supabase Storage fallback)
- [x] **Forms**: React Hook Form + Zod validation
- [x] **UI Components**: shadcn/ui + Radix UI
- [x] **Toast Notifications**: Arabic notifications
- [x] **RTL Support**: Right-to-left layout
- [x] **Product Management**: CRUD operations
- [x] **Order Management**: Customer orders
- [x] **Responsive Design**: Mobile-friendly

### 🎯 Admin Features

- **Product Management**: Add, edit, delete products
- **Image Upload**: Multiple images per product
- **Order Management**: View and manage orders
- **Analytics**: Revenue charts and statistics
- **Search & Filter**: Find products quickly

### 🛍️ Store Features

- **Product Catalog**: Browse all products
- **Product Details**: Detailed product pages
- **Categories**: Browse by category
- **Order Form**: Customer order placement
- **Responsive Design**: Works on all devices

## 🗄️ Database Schema

### Tables

- `categories` - Product categories
- `products` - Product information
- `orders` - Customer orders
- `order_items` - Order line items
- `admin_users` - Admin user data

### Storage

- `product-images` - Product image storage bucket

## 🎨 Design System

### Colors

- **Primary**: #F59E0B (Honey Gold)
- **Secondary**: #92400E (Dark Honey)
- **Accent**: #FEF3C7 (Light Honey)
- **Background**: #FFFBEB (Cream)

### Typography

- **Font**: Cairo (Arabic support)
- **RTL**: Right-to-left layout
- **Responsive**: Mobile-first design

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Backend (Supabase)

1. Database is already configured
2. Storage bucket is ready
3. RLS policies are set

## 🔒 Security

- **Row Level Security**: Enabled on all tables
- **Admin Authentication**: Required for admin access
- **Public Access**: Products and categories are public
- **Image Security**: Public read, authenticated write

## 📱 Mobile Support

- **Responsive Design**: Works on all screen sizes
- **Touch Friendly**: Optimized for mobile interaction
- **Fast Loading**: Optimized images and code

## 🌐 Internationalization

- **Arabic First**: Primary language
- **RTL Support**: Right-to-left layout
- **Bilingual**: English and Arabic content
- **Cultural Design**: Moroccan-inspired theme

## 🧪 Testing

### Manual Testing

1. **Homepage**: Check featured products load
2. **Products**: Browse product catalog
3. **Admin**: Test product management
4. **Orders**: Test order placement
5. **Images**: Test image uploads

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check Supabase Storage bucket
2. **Database errors**: Verify RLS policies
3. **Build errors**: Check environment variables
4. **Upload failures**: Check storage permissions

### Debug Mode

- Check browser console for errors
- Check server logs for API errors
- Verify Supabase connection

## 📞 Support

For issues or questions:

1. Check this documentation
2. Review error logs
3. Test in different browsers
4. Verify environment setup

---

**MyNature** - Pure Moroccan Honey & Natural Products 🍯
