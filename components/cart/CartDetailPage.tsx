'use client';

import { TCart } from '@/lib/schemas/cart/cart-item.schema';
import { FC } from 'react';
import { CartTable } from './CartTable';
import { EmptyCart } from './EmptyCart';
import { CartSubTotal } from './CartSubTotal';

type Props = {
  cart?: TCart;
};

export const CartDetailPage: FC<Props> = ({ cart }) => {
  const totalQuantity =
    cart?.items.reduce((acc, item) => acc + item.quantity, 0) ?? 0;

  return (
    <div>
      <h1 className="mb-6 text-2xl">Cart Details</h1>

      {cart && cart.items.length > 0 && (
        <section className="grid md:grid-cols-4 md:gap-6">
          <div className="col-span-3">
            <CartTable items={cart.items} />
          </div>

          <CartSubTotal
            totalQuantity={totalQuantity}
            totalPrice={Number(cart?.itemsPrice)}
          />
        </section>
      )}

      {(!cart || cart.items.length === 0) && <EmptyCart />}
    </div>
  );
};
