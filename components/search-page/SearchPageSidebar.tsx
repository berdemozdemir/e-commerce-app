'use client';

import Link from 'next/link';
import { Input } from '../ui/Input';
import { Star } from 'lucide-react';
import { FC, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type Props = {
  categories: string[];
};

export const SearchPageSidebar: FC<Props> = ({ categories }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const createUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === '' || value === 'All') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    return `/search?${params.toString()}`;
  };

  const handlePriceChange = (key: string, value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const newUrl = createUrl(key, value);
      router.push(newUrl);
    }, 400);
  };

  return (
    <div className="pr-4">
      {/* Categories */}
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

      {/* Price  */}
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

      {/* Customer Rating */}
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
    </div>
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
}) => {
  return (
    <Link
      href={href}
      className={`${isActive ? 'text-primary font-bold' : 'text-gray-500'}`}
    >
      {name}
    </Link>
  );
};
