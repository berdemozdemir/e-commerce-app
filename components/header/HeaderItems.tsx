'use client';

import Link from 'next/link';
import { Button } from '../ui/Button';
import { ThemeToggle } from './ThemeToggle';
import { paths } from '@/lib/constants/paths';
import { MenuIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/Sheet';
import { UserMenu } from './UserMenu';

export const HeaderItems = () => (
  <>
    <div className="hidden items-center gap-2 md:flex">
      <ThemeToggle />

      <Button asChild variant={'ghost'}>
        <Link href={paths.cart}>
          <ShoppingCartIcon /> Cart
        </Link>
      </Button>

      <UserMenu />
    </div>

    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>

        <SheetContent className="flex max-w-xs flex-col items-start gap-2 p-4">
          <SheetTitle>Menu</SheetTitle>

          <div className="mb-2 h-px w-full bg-gray-300" />
          <ThemeToggle />

          {/* TODO: add number of items quantity on this icon */}
          <Button asChild variant={'ghost'}>
            <Link href={paths.cart}>
              <ShoppingCartIcon /> Cart
            </Link>
          </Button>

          <div className="flex w-full flex-col gap-4">
            <Button asChild>
              <Link href={paths.auth.login}>
                <UserIcon /> Login
              </Link>
            </Button>

            <Button variant="outline" asChild>
              <Link href={paths.auth.signup}>
                <UserIcon /> Sign Up
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </>
);
