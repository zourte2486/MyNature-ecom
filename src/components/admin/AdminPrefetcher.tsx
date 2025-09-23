'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AdminPrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch admin routes for faster navigation
    const adminRoutes = [
      '/admin',
      '/admin/products',
      '/admin/orders',
      '/admin/reports',
      '/admin/settings'
    ];

    // Prefetch routes after a short delay to not block initial load
    const timer = setTimeout(() => {
      adminRoutes.forEach(route => {
        router.prefetch(route);
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return null; // This component doesn't render anything
}

