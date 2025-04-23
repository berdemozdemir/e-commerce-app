import { TProduct } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';

export type ProductCardProps = {
  product: TProduct;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="mx-auto w-full max-w-sm space-y-4 rounded-md border shadow-md">
      <div>
        <Link href={`/products/${product.slug}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={300}
            height={300}
          />
        </Link>
      </div>

      <div className="p-4">
        <Link href={`/products/${product.slug}`} className="block">
          <h2 className="line-clamp-2 text-lg font-semibold">{product.name}</h2>
        </Link>

        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">{product.rating}</span>
          <span className="text-lg font-bold">${product.price}</span>
        </div>
      </div>
    </div>
  );
};
