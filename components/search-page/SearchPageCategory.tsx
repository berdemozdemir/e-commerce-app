'use client';

import { FC } from 'react';
import { SideBarItem } from './SidebarItem';
import { useProductFilters } from '@/lib/hooks/useProductFilters';

type Props = {
  categories: string[];
};

export const SearchPageCategory: FC<Props> = ({ categories }) => {
  const { searchParams, createUrl } = useProductFilters();

  return (
    <section className="flex flex-col gap-2">
      <h1>Categories</h1>

      <SideBarItem
        name="All"
        href={createUrl('category', 'All')}
        isActive={!searchParams.get('category')}
      />

      {categories.map((category) => (
        <SideBarItem
          key={category}
          name={category}
          href={createUrl('category', category)}
          isActive={searchParams.get('category') === category}
        />
      ))}
    </section>
  );
};
