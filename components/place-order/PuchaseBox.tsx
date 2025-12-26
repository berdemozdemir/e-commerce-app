'use client';

import { FC } from 'react';
import { Button } from '../ui/Button';
import { paths } from '@/lib/constants/paths';
import { MoveRight } from 'lucide-react';
import { useCreateOrderMutation } from '@/lib/services/order';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

type Props = {
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  totalQuantity: number;
};

export const PurchaseBox: FC<Props> = (props) => {
  const router = useRouter();

  const createOrderMutation = useCreateOrderMutation();

  const createOrder = async () => {
    try {
      const res = await createOrderMutation.mutateAsync();

      toast.success('Order was created successfully');
      router.push(paths.orderDetails(res));
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
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

      <Button onClick={createOrder} disabled={createOrderMutation.isPending}>
        Create Order
        <MoveRight />
      </Button>
    </div>
  );
};
