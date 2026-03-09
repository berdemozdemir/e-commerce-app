import { SideBarItem } from './SidebarItem';
import { useProductFilters } from '@/lib/hooks/useProductFilters';

export const SearchPageSortSection = () => {
  const { searchParams, createUrl } = useProductFilters();

  return (
    <section className="flex flex-col gap-2">
      <h1>Sort by</h1>

      {[
        'Newest',
        'Oldest',
        'Price: Low to High',
        'Price: High to Low',
        'Rating: Low to High',
        'Rating: High to Low',
      ].map((sort) => (
        <SideBarItem
          key={sort}
          name={sort}
          href={createUrl('sort', sort)}
          isActive={searchParams.get('sort') === sort}
        />
      ))}
    </section>
  );
};
