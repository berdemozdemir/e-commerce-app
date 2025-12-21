'use client';

import { FC } from 'react';
import { Button } from '../ui/Button';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { paths } from '@/lib/constants/paths';

type Props = {
  totalQuantity: number;
  totalPrice: number;
};

export const CartSubTotal: FC<Props> = ({ totalQuantity, totalPrice }) => {
  const router = useRouter();

  return (
    <div className="h-fit gap-4 rounded-md border p-4 shadow">
      <section className="mb-4 space-y-1 font-semibold">
        <h1>Subtotal ({totalQuantity} items)</h1>

        <p>Total: ${totalPrice.toFixed(2)}</p>
      </section>

      <Button onClick={() => router.push(paths.shippingAddress)}>
        Proceed to Checkout <MoveRight />
      </Button>
    </div>
  );
};
