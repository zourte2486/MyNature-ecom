import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSkeleton } from '@/components/admin/AdminSkeleton';
import { AdminPrefetcher } from '@/components/admin/AdminPrefetcher';
import AuthGuard from '@/components/admin/AuthGuard';
import { Suspense } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
        <div className="min-h-screen bg-amber-50">
        <AdminPrefetcher />
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            <main className="flex-1 p-6">
              <Suspense fallback={<AdminSkeleton />}>
                {children}
              </Suspense>
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
