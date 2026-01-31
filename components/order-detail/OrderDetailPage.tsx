import { TOrder } from '@/lib/types/order';
import { FC } from 'react';
import { PaymentMethodSection } from './PaymentMethodSection';
import { ShippingAddressSection } from './ShippingAddressSection';
import { PriceSummary } from './PriceSummary';
import { OrderedItemsTable } from './OrderedItemsTable';

type Props = {
  order: TOrder;
  isAdmin: boolean;
};

export const OrderDetailPage: FC<Props> = (props) => (
  <div>
    <section className="mb-4 flex flex-col items-start gap-1 md:flex-row">
      <h1>{props.order.user.name}</h1>{' '}
      <span className="hidden md:block">-</span>
      <h1>{props.order.id}</h1>
    </section>

    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-4">
      <div className="col-span-4 md:col-span-3">
        <PaymentMethodSection
          paymentMethod={props.order.paymentMethod}
          paidAt={props.order.paidAt}
          isPaid={props.order.isPaid}
        />

        <ShippingAddressSection
          userName={props.order.user.name}
          shippingAddress={props.order.shippingAddress}
          isDelivered={props.order.isDelivered}
          deliveredAt={props.order.deliveredAt}
        />

        <OrderedItemsTable items={props.order.orderItems} />
      </div>

      <div className="col-span-4 md:col-span-1">
        <PriceSummary
          orderId={props.order.id}
          isPaid={props.order.isPaid}
          isDelivered={props.order.isDelivered}
          itemsPrice={Number(props.order.itemsPrice)}
          taxPrice={Number(props.order.taxPrice)}
          shippingPrice={Number(props.order.shippingPrice)}
          totalPrice={Number(props.order.totalPrice)}
          isAdmin={props.isAdmin}
        />
      </div>
    </div>
  </div>
);
