# 🍯 MyNature - Honey & Natural Products E-commerce

A complete Arabic-first e-commerce platform for Moroccan natural products (honey, argan oil, medicinal herbs, natural oils) built with Next.js 15, Supabase, and modern web technologies.

## ✨ Features

### Public Store

- **Arabic-first design** with RTL support
- **Honey-inspired theme** with warm, organic colors
- **Product catalog** with categories and filtering
- **Product detail pages** with order forms
- **Contact and about pages**
- **Responsive design** for all devices

### Admin Dashboard

- **Product management** (CRUD operations)
- **Order management** with status tracking
- **Revenue analytics** with charts
- **Admin authentication** (Supabase Auth)
- **Responsive admin interface**

### Technical Features

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Supabase** for backend (database, auth, storage)
- **React Hook Form + Zod** for form validation
- **Recharts** for analytics
- **Lucide React** for icons

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### 1. Install Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install react-hook-form @hookform/resolvers zod
npm install @radix-ui/react-dialog @radix-ui/react-toast @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-label @radix-ui/react-slot
npm install lucide-react recharts
npm install clsx class-variance-authority tailwind-merge
npm install @types/uuid uuid
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=MyNature
```

### 3. Set up Database

Run the SQL commands from `database-schema.sql` in your Supabase SQL editor to create the required tables and sample data.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product pages
│   ├── categories/        # Category pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── admin/            # Admin-specific components
│   ├── home/             # Homepage components
│   ├── layout/           # Layout components
│   └── products/         # Product components
├── lib/                  # Utility functions
│   ├── supabase.ts       # Supabase client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── globals.css           # Global styles
```

## 🎨 Design System

### Color Palette

- **Primary**: Honey Gold (#f59e0b)
- **Secondary**: Herbal Green (#059669)
- **Accent**: Honeycomb Beige (#fef3c7)
- **Background**: Warm Off-white (#fffdf8)
- **Surface**: Panel White (#ffffff)

### Typography

- **Arabic**: Cairo, Amiri, Noto Sans Arabic
- **English**: Inter, Poppins
- **Numbers**: Always ASCII numerals (1234567890)

### RTL Support

- Full right-to-left layout support
- Arabic text with proper font families
- RTL-aware spacing and positioning

## 🗄️ Database Schema

### Tables

- **categories**: Product categories
- **products**: Product information
- **orders**: Customer orders
- **order_items**: Order line items
- **admin_users**: Admin user information

### Key Features

- UUID primary keys
- Timestamps for created/updated
- Row Level Security (RLS) policies
- Foreign key relationships
- Indexes for performance

## 🔐 Authentication

### Admin Authentication

- Email/password login for admin users
- Protected admin routes
- Session management with Supabase Auth
- Middleware for route protection

### Public Access

- No authentication required for public pages
- Order forms work without user accounts
- Customer information collected per order

## 📱 Pages

### Public Pages

- `/` - Homepage with hero and featured products
- `/products` - Product catalog with filtering
- `/products/[id]` - Product detail with order form
- `/categories` - Browse by category
- `/about` - About the brand
- `/contact` - Contact form

### Admin Pages

- `/admin` - Dashboard with analytics
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/reports` - Revenue analytics
- `/admin/settings` - Store settings

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent naming conventions

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME=MyNature
```

## 📊 Performance

### Optimization Features

- Image optimization with Next.js Image
- Code splitting and lazy loading
- CDN delivery for static assets
- Database query optimization
- Caching strategies

### Performance Goals

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- Lighthouse score > 90

## 🌍 Localization

### Current Support

- **Primary Language**: Arabic (RTL)
- **Currency**: Moroccan Dirham (MAD)
- **Numbers**: ASCII numerals only
- **Dates**: Arabic locale formatting

### Future Enhancements

- French language support
- Multi-currency support
- Timezone handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support, email info@mynature.ma or create an issue in the repository.

---

Built with ❤️ for Moroccan natural products
