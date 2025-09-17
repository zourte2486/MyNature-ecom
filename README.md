# 🍯 MyNature - Morocco E-commerce Platform

A modern, fast, and beautiful e-commerce platform for natural Moroccan products built with Next.js 15, Supabase, and Vercel Blob.

## ✨ Features

### 🛍️ E-commerce Features

- **Product Catalog**: Browse natural honey, argan oil, herbs, and natural oils
- **Advanced Search**: Real-time search with filters and sorting
- **Shopping Cart**: Add products and manage quantities
- **Order Management**: Complete order processing system
- **Responsive Design**: Mobile-first, beautiful UI/UX

### 🔧 Admin Features

- **Product Management**: Add, edit, delete products with image uploads
- **Order Management**: View and manage customer orders
- **Category Management**: Organize products by categories
- **Dashboard**: Real-time statistics and analytics
- **Image Management**: Upload and manage product images with Vercel Blob

### 🚀 Technical Features

- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety
- **Supabase**: Database, authentication, and real-time features
- **Vercel Blob**: Fast image storage and CDN
- **Tailwind CSS**: Modern, responsive styling
- **Performance Optimized**: Fast loading, image optimization, caching

## 🏗️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Lucide React Icons
- **Database**: Supabase (PostgreSQL)
- **Storage**: Vercel Blob
- **Deployment**: Vercel
- **Forms**: React Hook Form, Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd morocco-ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy `.env.example` to `.env.local` and fill in your environment variables:

```bash
cp .env.example .env.local
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the `database.sql` file in your Supabase SQL Editor
3. This will create all necessary tables, indexes, and policies

### 5. Vercel Blob Setup

1. Install Vercel Blob: `npm install @vercel/blob`
2. Get your Vercel Blob token from Vercel dashboard
3. Add it to your environment variables

### 6. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── home/             # Home page components
│   ├── layout/           # Layout components
│   ├── products/         # Product-related components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions
│   ├── supabase/         # Supabase client and functions
│   └── types.ts          # TypeScript type definitions
└── public/               # Static assets
```

## 🗄️ Database Schema

### Tables

- **categories**: Product categories
- **products**: Product information with images
- **orders**: Customer orders
- **order_items**: Order line items
- **admin_users**: Admin user management

### Key Features

- **Row Level Security (RLS)**: Secure data access
- **Indexes**: Optimized for performance
- **Triggers**: Automatic timestamp updates
- **Foreign Keys**: Data integrity

## 🔧 Configuration

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Vercel Blob
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyNature
```

### Next.js Configuration

- **Image Optimization**: WebP/AVIF formats, responsive sizing
- **Performance**: CSS optimization, package imports optimization
- **Caching**: 1-year cache for static assets
- **Security**: Content Security Policy for images

## 🎨 UI/UX Features

### Design System

- **Colors**: Honey-themed color palette
- **Typography**: Arabic and English support
- **Components**: Reusable, accessible components
- **Animations**: Smooth transitions and hover effects

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm, md, lg, xl responsive breakpoints
- **Touch Friendly**: Large touch targets for mobile

## 🚀 Performance Optimizations

### Image Optimization

- **Next.js Image**: Automatic optimization
- **WebP/AVIF**: Modern image formats
- **Lazy Loading**: Images load as needed
- **Responsive Sizes**: Different sizes for different screens

### Code Optimization

- **Tree Shaking**: Remove unused code
- **Code Splitting**: Load code as needed
- **Bundle Analysis**: Optimize bundle size
- **Caching**: Aggressive caching strategy

## 🔒 Security Features

### Authentication

- **Supabase Auth**: Secure authentication
- **Row Level Security**: Database-level security
- **Admin Protection**: Admin-only routes

### Data Protection

- **Input Validation**: Zod schema validation
- **SQL Injection**: Parameterized queries
- **XSS Protection**: Content Security Policy

## 📱 Admin Dashboard

### Features

- **Product Management**: CRUD operations for products
- **Order Management**: View and update orders
- **Image Upload**: Drag-and-drop image uploads
- **Real-time Updates**: Live data updates
- **Responsive Design**: Works on all devices

### Access

- Navigate to `/admin` to access the dashboard
- Use admin credentials to log in
- All admin functions are protected by authentication

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

## 🚀 Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Environment Variables for Production

Set these in your Vercel dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `BLOB_READ_WRITE_TOKEN`

## 📊 Monitoring

### Performance

- **Core Web Vitals**: Optimized for Google's metrics
- **Lighthouse**: High performance scores
- **Bundle Size**: Optimized bundle size

### Analytics

- **Vercel Analytics**: Built-in analytics
- **Custom Events**: Track user interactions
- **Error Monitoring**: Catch and fix errors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email admin@mynature.com or create an issue in the repository.

## 🙏 Acknowledgments

- **Next.js Team**: For the amazing framework
- **Supabase Team**: For the backend infrastructure
- **Vercel Team**: For deployment and storage
- **Tailwind CSS Team**: For the utility-first CSS framework

---

**Built with ❤️ for Morocco's natural products** 🇲🇦
