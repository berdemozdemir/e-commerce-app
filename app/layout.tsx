import type { Metadata } from 'next';
import './globals.css';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: {
    template: `%s | My E-Commerce Store`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  icons: {
    icon: '/images/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning // to prevent hydration errors
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
