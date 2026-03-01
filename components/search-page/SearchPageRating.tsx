'use client';

import Link from 'next/link';
import { Star } from 'lucide-react';
import { FC } from 'react';
import { useProductFilters } from '@/lib/hooks/useProductFilters';

export const SearchPageRating: FC = () => {
  const { searchParams, createUrl } = useProductFilters();

  return (
    <section className="flex flex-col gap-2">
      <h1>Rating</h1>

      {[1, 2, 3, 4, 5].map((rating) => (
        <Link
          key={rating}
          href={createUrl('rating', rating.toString())}
          className="flex items-center gap-2"
        >
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                searchParams.get('rating') === rating.toString()
                  ? 'fill-primary text-primary'
                  : 'text-gray-500'
              }`}
            />
          ))}
        </Link>
      ))}
    </section>
  );
};
