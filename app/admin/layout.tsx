import { ReactNode } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { Footer } from '@/components/Footer';

export default function Admin_Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <AdminHeader />

      <main className="w-full max-w-7xl flex-1 p-5 md:px-10 lg:mx-auto">
        {children}
      </main>

      <Footer />
    </div>
  );
}
