import Link from 'next/link';
import { FC } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  name: string;
  href: string;
  isActive?: boolean;
};

export const SideBarItem: FC<Props> = ({ name, href, isActive }) => (
  <Link
    href={href}
    className={cn(
      'hover:text-primary text-gray-500',
      isActive && 'text-primary font-bold',
    )}
  >
    {name}
  </Link>
);
