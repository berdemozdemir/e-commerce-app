'use client';

import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/DropdownMenu';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        {theme === 'dark' || (theme === 'system' && systemTheme === 'dark') ? (
          <MoonIcon />
        ) : (
          <SunIcon />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuCheckboxItem>

        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
