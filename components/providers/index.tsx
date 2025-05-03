'use client';

import queryClient from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <SessionProvider>
      {children}

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        newestOnTop
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable={false}
        theme="light"
      />
    </SessionProvider>
  </QueryClientProvider>
);
