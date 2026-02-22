import { paths } from '@/lib/constants/paths';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

const navigation = [
  { name: 'Overview', href: paths.admin.overview },
  { name: 'Products', href: paths.admin.product.list },
  { name: 'Orders', href: paths.admin.orders },
  { name: 'Users', href: paths.admin.users.list },
];

export const AdminNavigation: FC<{ className?: string }> = ({ className }) => {
  const pathname = usePathname();

  return (
    <div className={cn('gap-4', className)}>
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            'font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white',
            pathname.includes(item.href) && 'text-black dark:text-white',
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
