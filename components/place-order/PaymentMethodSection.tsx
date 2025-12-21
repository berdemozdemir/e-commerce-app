import { paths } from '@/lib/constants/paths';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { TPaymentMethod } from '@/lib/types/payment-methods';
import { FC } from 'react';

type Props = {
  paymentMethod: TPaymentMethod;
};

export const PaymentMethodSection: FC<Props> = ({ paymentMethod }) => (
  <section className="mb-8 rounded-md border p-4">
    <h1 className="text-lg font-semibold">Payment Method</h1>

    <h1 className="mb-4">{paymentMethod}</h1>

    <Link href={paths.paymentMethod}>
      <Button>Edit</Button>
    </Link>
  </section>
);
