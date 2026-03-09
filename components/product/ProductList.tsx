import { ProductCard } from './ProductCard';
import { TProduct } from '@/lib/types/product';
import { StaggerContainer, StaggerItem } from '@/components/motion/FadeIn';
import { FadeIn } from '@/components/motion/FadeIn';

type ProductListProps = {
  data: TProduct[];
  title?: string;
  limit?: number;
};

export const ProductList = ({ data, title, limit }: ProductListProps) => {
  const limitedProducts = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      {title && (
        <FadeIn>
          <h1 className="mb-4 text-center text-2xl font-bold sm:text-start">
            {title}
          </h1>
        </FadeIn>
      )}

      <StaggerContainer className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {limitedProducts.map((product: TProduct) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}

        {limitedProducts.length === 0 && (
          <div className="col-span-4 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </StaggerContainer>
    </div>
  );
};
