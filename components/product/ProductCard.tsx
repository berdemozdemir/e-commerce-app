import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types/product';
import { paths } from '@/lib/constants/paths';

export type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => (
  <Link
    href={paths.productDetail(product.slug)}
    className="group flex h-full w-full flex-col overflow-hidden rounded-md border bg-white shadow-md transition-all hover:shadow-lg"
  >
    <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
      <Image
        src={product.images[0]}
        alt={product.name}
        fill
        className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      />
    </div>

    <div className="flex flex-1 flex-col justify-between p-4">
      <div className="space-y-2">
        <h2 className="line-clamp-2 text-sm font-semibold md:text-base dark:text-black">
          {product.name}
        </h2>

        <p className="line-clamp-2 text-xs text-gray-500 md:text-sm">
          {product.description}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => {
            const ratingValue = Number(product.rating);
            const isFull = ratingValue >= star;
            const isEmpty = ratingValue < star - 1;
            const partialFill = isFull
              ? 100
              : isEmpty
                ? 0
                : (ratingValue - (star - 1)) * 100;

            return (
              <div key={star} className="relative">
                {/* Background Star (Gray/Empty) */}
                <Star className="size-3 fill-gray-200 text-gray-200 md:size-4" />

                {/* Foreground Star (Yellow/Filled) - Partial fill */}
                <div
                  className="absolute top-0 left-0 h-full overflow-hidden"
                  style={{ width: `${partialFill}%` }}
                >
                  <Star className="size-3 fill-yellow-500 text-yellow-500 md:size-4" />
                </div>
              </div>
            );
          })}

          <span className="ml-1 text-xs text-gray-600">({product.rating})</span>
        </div>

        <span className="text-sm font-bold md:text-lg dark:text-black">
          ${product.price}
        </span>
      </div>
    </div>
  </Link>
);
