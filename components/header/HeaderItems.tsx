'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { paths } from '@/lib/constants/paths';
import { MenuIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/Sheet';
import { UserButton } from './UserButton';

export const HeaderItems = () => {
  return (
    <>
      <div className="hidden items-center gap-2 md:flex">
        <ThemeToggle />

        <Button asChild variant={'ghost'}>
          <Link href={paths.cart}>
            <ShoppingCartIcon /> Cart
          </Link>
        </Button>

        <UserButton />
      </div>

      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <MenuIcon />
          </SheetTrigger>

          <SheetContent className="flex max-w-xs flex-col items-start gap-2 p-4">
            <SheetTitle>Menu</SheetTitle>

            <div className="mb-2 h-[1px] w-full bg-gray-300" />
            <ThemeToggle />

            {/* TODO: add number of items quantity on this icon */}
            <Button asChild variant={'ghost'}>
              <Link href={paths.cart}>
                <ShoppingCartIcon /> Cart
              </Link>
            </Button>

            <Button asChild>
              <Link href={paths.auth.login}>
                <UserIcon /> Login
              </Link>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};
