import { TOrder } from '@/lib/types/order';
import { FC } from 'react';
import { Badge } from '../ui/Badge';

type Props = {
  order: TOrder;
};

export const OrderPage: FC<Props> = (props) => {
  return (
    <div>
      <section className="mb-4 flex items-center gap-1">
        <h1>{props.order.user.name}</h1> - <h1>{props.order.id}</h1>
      </section>

      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="col-span-3">
          <section className="mb-8 flex flex-col gap-2 rounded-md border p-4">
            <h1>Payment Method</h1>

            <h1>{props.order.paymentMethod}</h1>

            <Badge variant={props.order.isPaid ? 'success' : 'destructive'}>
              {props.order.isPaid ? 'Paid' : 'Not Paid'}
            </Badge>
          </section>

          <section className="mb-8 flex flex-col gap-2 rounded-md border p-4">
            <h1>Shipping Address</h1>

            <div className="flex items-center gap-1">
              <h1>{props.order.user.name}</h1> -
              <h1>{props.order.shippingAddress.addressName}</h1>
            </div>

            <h1>{props.order.shippingAddress.address}</h1>

            <p className="mb-4">
              {props.order.shippingAddress.city},{' '}
              {props.order.shippingAddress.country}{' '}
              {props.order.shippingAddress.postalCode}
            </p>

            <Badge
              variant={props.order.isDelivered ? 'success' : 'destructive'}
            >
              {props.order.isDelivered ? 'Delivered' : 'Not Delivered'}
            </Badge>
          </section>
        </div>
      </div>
    </div>
  );
};
