import { ProductList } from '@/components/product/ProductList';
import { getLatestProducts } from '@/lib/actions/product.action';

export default async function Home() {
  const latestProducts = await getLatestProducts();

  return (
    <div>
      <ProductList data={latestProducts} title="Newest Ones" limit={6} />
    </div>
  );
}
