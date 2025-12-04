'use client';

import { FC } from 'react';
import { ProductImages } from './ProductImages';
import { Badge } from '../ui/Badge';
import { TProduct } from '@/lib/types/product';
import { CartItemCounter } from './CartItemCounter';
import { AddToCart } from './AddToCart';

type Props = {
  product: TProduct;
  quantity?: number;
  isItemExist?: boolean;
};

export const ProductDetail: FC<Props> = ({
  product,
  quantity,
  isItemExist,
}) => {
  const [int, decimal = '00'] = product.price.split('.');

  return (
    <div className="grid-col-1 grid w-full md:grid-cols-5">
      <div className="col-span-5 lg:col-span-2">
        <ProductImages images={product.images} />
      </div>

      <div className="col-span-5 flex flex-col gap-6 p-5 lg:col-span-2">
        <p>
          {product.brand} | {product.category}
        </p>

        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p>
          {product.rating} of {product.numReviews} Reviews
        </p>

        <Badge variant={'success'} className="rounded-full px-8 py-6 text-lg">
          <span className="text-xl font-bold">
            <span className="align-top text-base">$</span>

            {int}

            <span className="align-top text-base">.{decimal}</span>
          </span>
        </Badge>

        <p className="-mb-4 font-semibold">Description</p>

        <p>{product.description}</p>
      </div>

      <div className="col-span-5 h-fit items-start space-y-3 rounded-lg border-2 p-4 lg:col-span-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-lg">Price</p>

          <span className="text-xl font-bold">
            <span className="align-top text-base">$</span>

            {int}

            <span className="align-top text-base">.{decimal}</span>
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <p className="text-lg">Status</p>

          <Badge variant={product.stock > 0 ? 'outline' : 'destructive'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

        {isItemExist ? (
          <CartItemCounter
            item={{
              productId: product.id,
              name: product.name,
              price: product.price,
              slug: product.slug,
              quantity: 1,
              image: product.images[0],
            }}
            quantity={quantity}
          />
        ) : (
          <AddToCart
            productId={product.id}
            name={product.name}
            price={product.price}
            slug={product.slug}
            quantity={1}
            image={product.images[0]}
          />
        )}
      </div>
    </div>
  );
};
