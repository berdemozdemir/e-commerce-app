'use client';

import { TCart } from '@/lib/schemas/cart/cart-item.schema';
import { FC } from 'react';
import { CartTable } from './CartTable';
import { EmptyCart } from './EmptyCart';

type Props = {
  cart?: TCart;
};

export const CartDetailPage: FC<Props> = ({ cart }) => {
  return (
    <div>
      <h1 className="mb-6 text-2xl">Cart Details</h1>

      {cart && cart.items.length > 0 && <CartTable cart={cart} />}

      {(!cart || cart.items.length === 0) && <EmptyCart />}
    </div>
  );
};
