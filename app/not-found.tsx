'use client';

import { Button } from '@/components/ui/Button';
import { APP_NAME } from '@/lib/constants';
import { paths } from '@/lib/constants/paths';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="mx-2 flex flex-col items-center justify-center gap-4 rounded-2xl p-5 text-center shadow-2xl">
      <Image
        src="/images/logo.svg"
        alt={`${APP_NAME} logo`}
        height={48}
        width={48}
        priority
      />

      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>

      <p className="text-lg">The page you are looking for does not exist.</p>

      <Button asChild variant="ghost" className="border">
        <Link href={paths.home}>Home Page</Link>
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
