import { Metadata } from 'next';
import { ProductList } from '@/components/search-page/ProductList';
import { SearchPageSidebar } from '@/components/search-page/SearchPageSidebar';
import { getFilteredProducts } from '@/lib/actions/product/get-filtered-products';
import { getProductCategories } from '@/lib/actions/product/get-product-categories';

type Props = {
  searchParams: Promise<{
    query: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
    sort: string;
  }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { query, category } = await props.searchParams;

  if (query) {
    return {
      title: `Search result for "${query}"`,
    };
  }

  if (category) {
    return {
      title: `Category: ${category}`,
    };
  }

  return {
    title: 'Search Products',
  };
}

export default async function Page_Search(props: Props) {
  const { query, category, minPrice, maxPrice, rating, sort } =
    await props.searchParams;

  const [productsErr, productsData] = await getFilteredProducts({
    query,
    category,
    minPrice,
    maxPrice,
    rating,
    sort,
  });

  const [_, categoriesData] = await getProductCategories();

  const data = productsErr ? [] : (productsData ?? []);
  const categoryNames = categoriesData?.map((c) => c.name) ?? [];

  if (productsErr) return <div>Error: {productsErr}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4">
      <div className="md:col-span-1">
        <SearchPageSidebar categories={categoryNames} />
      </div>

      <div className="p-4 md:col-span-4 md:p-0">
        <ProductList data={data} />
      </div>
    </div>
  );
}
