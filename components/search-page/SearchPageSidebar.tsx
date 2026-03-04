'use client';

import { FC } from 'react';
import { SearchPageCategory } from './SearchPageCategory';
import { SearchPagePrice } from './SearchPagePrice';
import { SearchPageRating } from './SearchPageRating';
import { SearchPageSortSection } from './SearchPageSortSection';

type Props = {
  categories: string[];
};

export const SearchPageSidebar: FC<Props> = ({ categories }) => (
  <div className="flex flex-col gap-8 pr-4">
    <SearchPageCategory categories={categories} />

    <SearchPagePrice />

    <SearchPageRating />

    <SearchPageSortSection />
  </div>
);
