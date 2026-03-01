'use client';

import { FC } from 'react';
import { SearchPageCategory } from './SearchPageCategory';
import { SearchPagePrice } from './SearchPagePrice';
import { SearchPageRating } from './SearchPageRating';

type Props = {
  categories: string[];
};

export const SearchPageSidebar: FC<Props> = ({ categories }) => (
  <div className="pr-4">
    <SearchPageCategory categories={categories} />

    <SearchPagePrice />

    <SearchPageRating />
  </div>
);
