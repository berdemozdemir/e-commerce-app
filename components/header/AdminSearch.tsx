import { debounce } from '@/lib/utils/debounce';
import { useEffect, useState } from 'react';
import { Input } from '../ui/Input';
import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const AdminSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const updateSearchQuery = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set('query', value) : params.delete('query');
      router.push(params ? `${pathname}?${params}` : pathname);
    }, 500),
    [router, pathname, searchParams],
  );

  useEffect(() => {
    setSearchValue(searchParams.get('query') ?? '');
  }, [searchParams]);

  const isAdminSearch =
    pathname.includes('admin/user') || pathname.includes('admin/product');

  return (
    <Input
      placeholder={
        isAdminSearch ? 'Search' : 'Search is disabled for this page'
      }
      className="mx-10 w-full max-w-xs"
      value={searchValue}
      disabled={!isAdminSearch}
      onChange={(e) => {
        setSearchValue(e.target.value);
        updateSearchQuery(e.target.value);
      }}
    />
  );
};
