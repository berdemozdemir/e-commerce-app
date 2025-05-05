'use client';

import { UserIcon } from 'lucide-react';
import { Button } from '../ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { signIn, signOut, useSession } from 'next-auth/react';
import { getTwoLetterInitials } from '@/lib/utils';
import { useEffect } from 'react';

export const UserButton = () => {
  const { data: session, update } = useSession();

  useEffect(() => {
    update();
  }, [update]);

  if (!session) {
    return (
      <Button onClick={() => signIn()}>
        <UserIcon /> Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 cursor-pointer rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          {getTwoLetterInitials(session.user?.name ?? '')}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>
          <p className="text-sm font-medium">{session.user?.name}</p>
          <p className="text-xs opacity-60">{session.user?.email}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => signOut()}>Log Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
