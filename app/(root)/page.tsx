import { ProductList } from '@/components/product/ProductList';
import { getLatestProducts } from '@/lib/actions/product/get-latest-products';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants/product';
import { isFailure } from '@/lib/result';

export default async function Home() {
  const latestProducts = await getLatestProducts();

  if (isFailure(latestProducts)) {
    console.error('Failed to load latest products:', latestProducts.error);

    return <div>Error loading products</div>;
  }

  return (
    <ProductList
      data={latestProducts.data}
      title="Newest Ones"
      limit={LATEST_PRODUCTS_LIMIT}
    />
  );
}
