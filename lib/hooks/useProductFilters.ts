import { useRouter, useSearchParams } from 'next/navigation';
import { useRef } from 'react';

export const useProductFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const params = new URLSearchParams(searchParams.toString());

  const createUrl = (key: string, value: string) => {
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

  return {
    searchParams,
    params,
    createUrl,
    handlePriceChange,
  };
};
