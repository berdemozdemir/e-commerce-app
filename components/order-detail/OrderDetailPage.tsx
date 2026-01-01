import { TOrder } from '@/lib/types/order';
import { FC } from 'react';
import { Badge } from '../ui/Badge';
import { PaymentMethodSection } from './PaymentMethodSection';
import { ShippingAddressSection } from './ShippingAddressSection';

type Props = {
  order: TOrder;
};

export const OrderDetailPage: FC<Props> = (props) => {
  return (
    <div>
      <section className="mb-4 flex items-center gap-1">
        <h1>{props.order.user.name}</h1> - <h1>{props.order.id}</h1>
      </section>

      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="col-span-3">
          <PaymentMethodSection
            paymentMethod={props.order.paymentMethod}
            isPaid={props.order.isPaid}
          />

          <ShippingAddressSection
            userName={props.order.user.name}
            shippingAddress={props.order.shippingAddress}
            isDelivered={props.order.isDelivered}
          />
        </div>
      </div>
    </div>
  );
};
