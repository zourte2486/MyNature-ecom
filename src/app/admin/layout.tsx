import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminHeader } from '@/components/admin/AdminHeader';
import AuthGuard from '@/components/admin/AuthGuard';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
        <div className="min-h-screen bg-amber-50">
        <div className="flex">
          <AdminSidebar />
          <div className="flex-1 flex flex-col">
            <AdminHeader />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
