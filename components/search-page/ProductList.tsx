'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { Badge } from '@/components/ui/Badge';
import { useProductFilters } from '@/lib/hooks/useProductFilters';
import { TProduct } from '@/lib/types/product';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const ProductList = ({ data }: { data: TProduct[] }) => {
  const { searchParams, createUrl, params } = useProductFilters();

  const query = searchParams.get('query');
  const category = searchParams.get('category');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const rating = searchParams.get('rating');

  const hasFilters =
    query || (category && category !== 'All') || minPrice || maxPrice || rating;

  const clearPriceUrl = () => {
    params.delete('minPrice');
    params.delete('maxPrice');
    return `/search?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {hasFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Filters:</span>

          {query && (
            <Badge variant="secondary" asChild>
              <Link href={createUrl('query', '')}>
                Query: {query} <X />
              </Link>
            </Badge>
          )}

          {category && category !== 'All' && (
            <Badge variant="secondary" asChild>
              <Link href={createUrl('category', '')}>
                Category: {category} <X />
              </Link>
            </Badge>
          )}

          {(minPrice || maxPrice) && (
            <Badge variant="secondary" asChild>
              <Link href={clearPriceUrl()}>
                Price: {minPrice || '0'} - {maxPrice || 'Any'} <X />
              </Link>
            </Badge>
          )}

          {rating && (
            <Badge variant="secondary" asChild>
              <Link href={createUrl('rating', '')}>
                Rating: {rating}+ <X />
              </Link>
            </Badge>
          )}

          <Link
            href="/search"
            className="text-sm text-blue-500 hover:underline"
          >
            Clear All
          </Link>
        </div>
      )}

      {data.length === 0 && (
        <p className="text-center text-gray-500">No products found.</p>
      )}

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {/* TODO: add sort functionality */}
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
