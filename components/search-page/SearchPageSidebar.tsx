'use client';

import { FC, useState } from 'react';
import { Filter } from 'lucide-react';
import { SearchPageCategory } from './SearchPageCategory';
import { SearchPagePrice } from './SearchPagePrice';
import { SearchPageRating } from './SearchPageRating';
import { SearchPageSortSection } from './SearchPageSortSection';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';
import { Button } from '@/components/ui/Button';

type Props = {
  categories: string[];
};

const SidebarContent = ({ categories }: { categories: string[] }) => (
  <div className="flex flex-col gap-8 pr-4">
    <SearchPageCategory categories={categories} />

    <SearchPagePrice />

    <SearchPageRating />

    <SearchPageSortSection />
  </div>
);

export const SearchPageSidebar: FC<Props> = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile View */}
      <div className="mb-4 md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex w-full gap-2">
              <Filter className="size-4" />
              Filters
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[300px] overflow-y-auto sm:w-[400px]"
          >
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>

              <SheetDescription>Refine your product search</SheetDescription>
            </SheetHeader>

            <div className="mt-4">
              <SidebarContent categories={categories} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <SidebarContent categories={categories} />
      </div>
    </>
  );
};
