'use client';

import { MenuIcon } from 'lucide-react';
import { FC } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/Sheet';
import { ThemeToggle } from './ThemeToggle';
import { UserMenu } from './UserMenu';
import { AdminNavigation } from './AdminNavigation';
import { cn } from '@/lib/utils';

export const AdminHeaderItems = () => (
  <>
    <AdminHeaderDesktopItems className="hidden md:flex" />

    <AdminHeaderMobileItems className="md:hidden" />
  </>
);

const AdminHeaderDesktopItems: FC<{ className: string }> = ({ className }) => (
  <div className={cn('items-center gap-2', className)}>
    <ThemeToggle />

    <UserMenu />
  </div>
);

const AdminHeaderMobileItems: FC<{ className: string }> = ({ className }) => (
  <div className={className}>
    <Sheet>
      <SheetTrigger asChild>
        <MenuIcon />
      </SheetTrigger>

      <SheetContent className="flex max-w-xs flex-col items-start gap-2 p-4">
        <SheetTitle>Menu</SheetTitle>

        <div className="mb-2 h-px w-full bg-gray-300" />

        <AdminNavigation className="flex flex-col items-start md:hidden" />

        <ThemeToggle />
      </SheetContent>
    </Sheet>
  </div>
);
