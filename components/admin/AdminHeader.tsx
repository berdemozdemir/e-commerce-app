'use client';

import { APP_NAME } from '@/lib/constants';
import { paths } from '@/lib/constants/paths';
import Image from 'next/image';
import Link from 'next/link';
import { HeaderItems } from '../header/HeaderItems';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Overview', href: paths.admin.overview },
  { name: 'Products', href: paths.admin.product.list },
  { name: 'Orders', href: paths.admin.orders },
];

export const AdminHeader = () => {
  const pathname = usePathname();

  return (
    <div className="w-full border-b">
      <div className="flex w-full max-w-7xl items-center justify-between p-5 md:px-10 lg:mx-auto">
        <div className="flex items-center justify-start">
          <Link
            href={paths.home}
            className="flex items-center justify-start gap-2"
          >
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority
            />
          </Link>

          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'ml-4 font-medium text-gray-500 hover:text-gray-900',
                pathname.includes(item.href) && 'text-black',
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <HeaderItems />
      </div>
    </div>
  );
};
