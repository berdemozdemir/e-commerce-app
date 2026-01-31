import { FC } from 'react';
import { TPaymentMethod } from '@/lib/types/payment-methods';
import { Badge } from '../ui/Badge';
import { formatDate } from '@/lib/utils/date';

type Props = {
  paymentMethod: TPaymentMethod;
  paidAt?: Date;
  isPaid: boolean;
};

export const PaymentMethodSection: FC<Props> = (props) => (
  <section className="mb-8 flex flex-col gap-2 rounded-md border p-4">
    <h1 className="text-lg font-semibold">Payment Method</h1>

    <h1>{props.paymentMethod}</h1>

    {props.isPaid && props.paidAt && (
      <Badge variant="success">Paid at:{formatDate(props.paidAt?.toString())}</Badge>
    )}

    {!props.isPaid && <Badge variant="destructive">Not Paid</Badge>}
  </section>
);
