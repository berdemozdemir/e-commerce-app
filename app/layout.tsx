import type { Metadata } from 'next';
import './globals.css';
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: {
    template: `%s | My E-Commerce Store`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
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
        <ThemeProvider
          attribute="class" // provide <html class="light"
          defaultTheme="light"
          enableSystem // to reach user's system preference
          disableTransitionOnChange // to prevent flickering when switching themes
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
