import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '../ui/Input';
import { debounce } from '@/lib/utils/debounce';

export const AdminSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState('');

  const updateSearchQuery = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set('query', value);
        } else {
          params.delete('query');
        }
        router.push(params.size ? `${pathname}?${params}` : pathname);
      }, 500),
    [router, pathname, searchParams],
  );

  useEffect(() => {
    setSearchValue(searchParams.get('query') ?? '');
  }, [searchParams]);

  const isAdminSearch =
    pathname.includes('admin/users') || pathname.includes('admin/products');

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
