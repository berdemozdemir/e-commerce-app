'use client';

import { APP_NAME } from '@/lib/constants';
import { paths } from '@/lib/constants/paths';
import Image from 'next/image';
import Link from 'next/link';
import { AdminHeaderItems } from '../header/AdminHeaderItems';
import { AdminNavigation } from '../header/AdminNavigation';
import { AdminSearch } from '../header/AdminSearch';

export const AdminHeader = () => (
  <div className="w-full border-b">
    <div className="flex w-full max-w-7xl items-center justify-between p-5 md:px-10 lg:mx-auto">
      <div className="flex items-center justify-start">
        <Link
          href={paths.home}
          className="flex shrink-0 items-center justify-start gap-2"
        >
          <Image
            src="/images/logo.svg"
            alt={`${APP_NAME} logo`}
            height={48}
            width={48}
            priority
          />
        </Link>

        <AdminNavigation className="ml-4 hidden md:flex" />
      </div>

      <AdminSearch />

      <AdminHeaderItems />
    </div>
  </div>
);
