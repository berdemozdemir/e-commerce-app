import { Footer } from '@/components/Footer';
import { Header } from '@/components/header';
import { ReactNode } from 'react';

export default function Admin_Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />

      <main className="w-full max-w-7xl flex-1 p-5 md:px-10 lg:mx-auto">
        {children}
      </main>

      <Footer />
    </div>
  );
}
