import { FC } from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { paths } from '@/lib/constants/paths';
import { MoveRight } from 'lucide-react';

type Props = {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  totalQuantity: number;
};

export const PurchaseBox: FC<Props> = (props) => (
  <div className="h-fit gap-4 rounded-md border p-4 shadow">
    <section className="mb-4 space-y-1 font-semibold">
      <div>
        <h1>Subtotal ({props.totalQuantity} items)</h1>
      </div>

      <div className="flex justify-between">
        <h1>items:</h1>

        <span>${props.itemsPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <h1>Tax: </h1>

        <span>${props.taxPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <h1>Shipping:</h1>

        <span> ${props.shippingPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <h1>Total:</h1>

        <span>${props.totalPrice.toFixed(2)}</span>
      </div>
    </section>

    <Link href={paths.shippingAddress}>
      <Button>
        Purchase
        <MoveRight />
      </Button>
    </Link>
  </div>
);
