import { ProductList } from '@/components/search-page/ProductList';
import { SearchPageSidebar } from '@/components/search-page/SearchPageSidebar';
import { getFilteredProducts } from '@/lib/actions/product/get-filtered-products';
import { getProductCategories } from '@/lib/actions/product/get-product-categories';
import { isFailure } from '@/lib/result';

type Props = {
  searchParams: Promise<{
    query: string;
    category: string;
    minPrice: string;
    maxPrice: string;
    rating: string;
  }>;
};

export default async function Page_Search({ searchParams }: Props) {
  const { query, category, minPrice, maxPrice, rating } = await searchParams;

  const products = await getFilteredProducts({
    query,
    category,
    minPrice,
    maxPrice,
    rating,
  });

  const categoriesResult = await getProductCategories();

  const data = products.data ?? [];
  const categoriesData =
    categoriesResult.data?.map((category) => category.name) ?? [];

  if (isFailure(products)) return <div>Error: {products.error}</div>;

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        {/* TODO: make this page responsive */}
        <SearchPageSidebar categories={categoriesData} />
      </div>

      <div className="col-span-4">
        <ProductList data={data} />
      </div>
    </div>
  );
}
