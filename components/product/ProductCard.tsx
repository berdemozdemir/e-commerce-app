import { paths } from '@/lib/constants/paths';
import { TProduct } from '@/lib/types/product';
import Image from 'next/image';
import Link from 'next/link';

export type ProductCardProps = {
  product: TProduct;
};

export const ProductCard = ({ product }: ProductCardProps) => (
  <Link
    href={paths.productDetail(product.slug)}
    className="mx-auto h-full w-full max-w-sm space-y-4 overflow-hidden rounded-md border shadow-md"
  >
    <div>
      {/* TODO: make this image responsive */}
      <Image
        src={product.images[0]}
        alt={product.name}
        width={300}
        height={300}
      />
    </div>

    <div className="flex h-full max-h-40 flex-col justify-between p-4">
      <div>
        <h2 className="line-clamp-2 text-lg font-semibold">{product.name}</h2>

        <p className="line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">{product.rating}</span>
        <span className="text-lg font-bold">${product.price}</span>
      </div>
    </div>
  </Link>
);
