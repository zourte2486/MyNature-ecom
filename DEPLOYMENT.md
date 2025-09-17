# 🚀 Deployment Guide

This guide will help you deploy the MyNature e-commerce platform to Vercel.

## Prerequisites

- [Vercel account](https://vercel.com)
- [Supabase account](https://supabase.com)
- GitHub repository

## Step 1: Database Setup

1. **Create Supabase Project**

   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Run Database Schema**

   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `database.sql`
   - Execute the script to create all tables and policies

3. **Set up Admin User**
   - The database script includes a sample admin user
   - You can modify the admin user details in the SQL script

## Step 2: Vercel Blob Setup

1. **Install Vercel Blob**

   ```bash
   npm install @vercel/blob
   ```

2. **Get Blob Token**
   - Go to your Vercel dashboard
   - Navigate to Storage → Blob
   - Create a new store
   - Copy the `BLOB_READ_WRITE_TOKEN`

## Step 3: Environment Variables

Set these environment variables in your Vercel dashboard:

### Required Variables

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=MyNature
```

### Optional Variables

```
DATABASE_URL=your_database_connection_string
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## Step 4: Deploy to Vercel

1. **Connect Repository**

   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**

   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

3. **Set Environment Variables**

   - Add all the environment variables from Step 3
   - Make sure to set them for Production, Preview, and Development

4. **Deploy**
   - Click "Deploy"
   - Wait for the deployment to complete
   - Your site will be available at `https://your-project.vercel.app`

## Step 5: Post-Deployment

1. **Test the Application**

   - Visit your deployed URL
   - Test product browsing, search, and ordering
   - Test admin dashboard functionality

2. **Configure Custom Domain** (Optional)

   - Go to your project settings in Vercel
   - Add your custom domain
   - Update DNS records as instructed

3. **Set up Monitoring**
   - Enable Vercel Analytics
   - Set up error monitoring
   - Configure performance monitoring

## Troubleshooting

### Common Issues

1. **Database Connection Errors**

   - Check your Supabase URL and keys
   - Ensure RLS policies are set up correctly
   - Verify admin user exists

2. **Image Upload Issues**

   - Check Vercel Blob token
   - Verify blob store is created
   - Check image size limits

3. **Build Errors**
   - Check environment variables
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Performance Optimization

1. **Enable Vercel Analytics**

   - Monitor Core Web Vitals
   - Track user interactions
   - Identify performance bottlenecks

2. **Image Optimization**

   - Use Next.js Image component
   - Optimize image sizes
   - Enable WebP/AVIF formats

3. **Caching**
   - Configure proper cache headers
   - Use Vercel's edge caching
   - Optimize API responses

## Security Checklist

- [ ] Environment variables are set correctly
- [ ] RLS policies are enabled
- [ ] Admin authentication is working
- [ ] HTTPS is enabled
- [ ] Content Security Policy is configured
- [ ] API routes are protected

## Monitoring

1. **Vercel Dashboard**

   - Monitor deployments
   - Check function logs
   - View analytics

2. **Supabase Dashboard**

   - Monitor database performance
   - Check authentication logs
   - View API usage

3. **Custom Monitoring**
   - Set up error tracking
   - Monitor user behavior
   - Track conversion rates

## Maintenance

1. **Regular Updates**

   - Keep dependencies updated
   - Monitor security advisories
   - Update Next.js and other packages

2. **Database Maintenance**

   - Monitor database performance
   - Clean up old data
   - Optimize queries

3. **Backup Strategy**
   - Regular database backups
   - Code repository backups
   - Environment variable backups

## Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the logs in Vercel dashboard
3. Check Supabase logs
4. Create an issue in the repository

---

**Happy Deploying! 🚀**
