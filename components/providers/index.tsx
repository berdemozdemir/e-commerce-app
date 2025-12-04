'use client';

import queryClient from '@/lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider
    attribute="class" // provide <html class="light"
    defaultTheme="light"
    enableSystem // to reach user's system preference
    disableTransitionOnChange // to prevent flickering when switching themes
  >
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
  </ThemeProvider>
);
