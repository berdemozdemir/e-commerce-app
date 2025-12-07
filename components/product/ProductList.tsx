import { TProduct } from '@/lib/types/product';
import { ProductCard } from './ProductCard';

type ProductListProps = {
  data: TProduct[];
  title?: string;
  limit?: number;
};

export const ProductList = ({ data, title, limit }: ProductListProps) => {
  const limitedProducts = limit ? data.slice(0, limit) : data;

  // TODO: fix this page's responsive design
  return (
    <div className="my-10">
      <h1 className="mb-4 text-center text-2xl font-bold sm:text-start">
        {title}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {limitedProducts.map((product: TProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}

        {limitedProducts.length === 0 && (
          <div className="col-span-4 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
