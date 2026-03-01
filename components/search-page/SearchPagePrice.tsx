'use client';

import { Input } from '@/components/ui/Input';
import { useProductFilters } from '@/lib/hooks/useProductFilters';
import { FC } from 'react';

export const SearchPagePrice: FC = () => {
  const { searchParams, handlePriceChange } = useProductFilters();

  return (
    <section className="mb-8">
      <h1 className="mb-2">Price</h1>

      <div className="flex gap-2">
        <div className="group relative">
          <Input
            className="peer h-12 border px-3 pt-5"
            type="number"
            placeholder=" "
            defaultValue={searchParams.get('minPrice') || ''}
            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
          />

          <p
            className={`absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-[#62748E] transition-all duration-200 ease-out group-focus-within:top-2 group-focus-within:translate-y-0 group-focus-within:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs`}
          >
            min
          </p>
        </div>

        <div className="group bgre relative">
          <Input
            className="peer h-12 border px-3 pt-5"
            type="number"
            placeholder=" "
            defaultValue={searchParams.get('maxPrice') || ''}
            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
          />

          <p
            className={`absolute top-1/2 left-3 -translate-y-1/2 transform text-sm text-[#62748E] transition-all duration-200 ease-out group-focus-within:top-2 group-focus-within:translate-y-0 group-focus-within:text-xs peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs`}
          >
            max
          </p>
        </div>
      </div>
    </section>
  );
};
