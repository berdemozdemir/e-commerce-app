'use client';

import Link from 'next/link';
import { FC } from 'react';
import { useProductFilters } from '@/lib/hooks/useProductFilters';

type Props = {
  categories: string[];
};

export const SearchPageCategory: FC<Props> = ({ categories }) => {
  const { searchParams, createUrl } = useProductFilters();

  return (
    <section className="mb-8 flex flex-col gap-2">
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

const SideBarItem = ({
  name,
  href,
  isActive,
}: {
  name: string;
  href: string;
  isActive?: boolean;
}) => (
  <Link
    href={href}
    className={`${isActive ? 'text-primary font-bold' : 'text-gray-500'}`}
  >
    {name}
  </Link>
);
