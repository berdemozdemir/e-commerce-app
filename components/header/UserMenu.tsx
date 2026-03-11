'use client';

import { UserIcon } from 'lucide-react';
import { signIn, signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { getTwoLetterInitials } from '@/lib/utils';
import { paths } from '@/lib/constants/paths';
import { useAuthQuery } from '@/lib/hooks/useAuthQuery';
import { Skeleton } from '@/components/ui/Skeleton';

export const UserMenu = () => {
  const { data: authData, isLoading } = useAuthQuery();

  const pathname = usePathname();

  const router = useRouter();

  const isAdmin = pathname.includes('/admin');

  if (authData?.user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            {getTwoLetterInitials(authData.user?.name ?? '')}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel>
            <p className="text-sm font-medium">{authData.user?.name}</p>
            <p className="text-xs opacity-60">{authData.user?.email}</p>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => router.push(paths.userProfile)}>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push(paths.myOrders)}>
            My Orders
          </DropdownMenuItem>

          {authData.isAdmin && !isAdmin && (
            <DropdownMenuItem onClick={() => router.push(paths.admin.overview)}>
              Admin
            </DropdownMenuItem>
          )}

          {authData.isAdmin && isAdmin && (
            <DropdownMenuItem onClick={() => router.push(paths.home)}>
              Back to User
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  if (isLoading) return <Skeleton className="h-8 w-20" />;

  if (!authData?.isLoggedIn)
    return (
      <Button onClick={() => signIn()}>
        <UserIcon /> Login
      </Button>
    );
};
