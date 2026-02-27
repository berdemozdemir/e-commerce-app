'use client';

import { MenuIcon } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/Drawer';
import { useGetProductCategoriesQuery } from '@/lib/services/product';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const CategoriesDrawer = () => {
  const { data: categories } = useGetProductCategoriesQuery();

  return (
    <Drawer direction="left">
      <DrawerTrigger className="rounded-md border p-3">
        <MenuIcon />
      </DrawerTrigger>

      <DrawerContent className="p-2">
        <DrawerHeader>
          <DrawerTitle>Categories</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col p-1">
          {categories?.length === 0 && <div>No categories found</div>}

          {categories?.map((category) => (
            <Link
              href={`/search?category=${category.name}`}
              className="mb-2 ml-4 justify-start"
              key={category.name}
            >
              {category.name}

              <span className="text-muted-foreground text-sm">
                ({category.count})
              </span>
            </Link>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
