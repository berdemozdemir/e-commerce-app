import { ProductList } from '@/components/product/ProductList';
import { getLatestProducts } from '@/lib/actions/product/get-latest-products';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants/product';
import { isFailure } from '@/lib/result';
import { ImagesCarousel } from '@/components/ImagesCarousel';
import { getFeaturedProducts } from '@/lib/actions/product/get-featured-products';

export default async function Home() {
  const latestProducts = await getLatestProducts();
  const featuredProducts = await getFeaturedProducts();

  if (isFailure(latestProducts)) {
    console.error('Failed to load latest products:', latestProducts.error);

    return <div>Error loading products</div>;
  }

  return (
    <>
      {featuredProducts.data && featuredProducts.data.length > 0 && (
        <ImagesCarousel products={featuredProducts.data} />
      )}

      <ProductList
        data={latestProducts.data}
        title="Newest Ones"
        limit={LATEST_PRODUCTS_LIMIT}
      />
    </>
  );
}
