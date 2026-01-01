import { FC } from 'react';
import { paths } from '@/lib/constants/paths';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { TPaymentMethod } from '@/lib/types/payment-methods';
import { Badge } from '../ui/Badge';

type Props = {
  paymentMethod: TPaymentMethod;
  isPaid: boolean;
};

export const PaymentMethodSection: FC<Props> = ({ paymentMethod, isPaid }) => (
  <section className="mb-8 flex flex-col gap-2 rounded-md border p-4">
    <h1 className="text-lg font-semibold">Payment Method</h1>

    <h1>{paymentMethod}</h1>

    <Badge variant={isPaid ? 'success' : 'destructive'}>
      {isPaid ? 'Paid' : 'Not Paid'}
    </Badge>
  </section>
);
