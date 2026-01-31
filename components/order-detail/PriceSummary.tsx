'use client';

import { FC } from 'react';
import { Button } from '../ui/Button';
import {
  useMarkAsDeliveredOrderMutation,
  useMarkAsPaidOrderMutation,
} from '@/lib/services/admin';
import { toast } from 'react-toastify';
import { LoadingSpinner } from '../LoadingSpinner';

type Props = {
  orderId: string;
  isPaid: boolean;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isAdmin: boolean;
  isDelivered: boolean;
};

export const PriceSummary: FC<Props> = (props) => {
  const markAsPaidOrderMutation = useMarkAsPaidOrderMutation();
  const markAsDeliveredOrderMutation = useMarkAsDeliveredOrderMutation();

  const markAsPaid = async () => {
    if (markAsPaidOrderMutation.isPending) return;

    try {
      await markAsPaidOrderMutation.mutateAsync({
        orderId: props.orderId,
      });

      toast.success('Order marked as paid');
    } catch (error) {
      console.error('Failed to mark order as paid:', error);
      toast.error('Failed to mark order as paid');
    }
  };

  const markAsDelivered = async () => {
    if (markAsDeliveredOrderMutation.isPending) return;

    try {
      await markAsDeliveredOrderMutation.mutateAsync({
        orderId: props.orderId,
      });

      toast.success('Order marked as delivered');
    } catch (error) {
      console.error('Failed to mark order as delivered:', error);
      toast.error('Failed to mark order as delivered');
    }
  };

  return (
    <section className="mb-4 h-fit space-y-1 rounded-md border p-4 font-semibold">
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

      <div className="mb-4 flex justify-between">
        <h1>Total:</h1>

        <span>${props.totalPrice.toFixed(2)}</span>
      </div>

      {props.isAdmin && (
        <div className="flex flex-col gap-2">
          <Button onClick={markAsPaid} disabled={props.isPaid}>
            Mark as Paid{' '}
            {markAsPaidOrderMutation.isPending && <LoadingSpinner />}
          </Button>

          <Button onClick={markAsDelivered} disabled={props.isDelivered}>
            Mark as Delivered{' '}
            {markAsDeliveredOrderMutation.isPending && <LoadingSpinner />}
          </Button>
        </div>
      )}
    </section>
  );
};
