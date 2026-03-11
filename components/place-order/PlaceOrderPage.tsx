import { FC } from 'react';
import { ShippingAddressSection } from './ShippingAddressSection';
import { PaymentMethodSection } from './PaymentMethodSection';
import { OrderedItems } from './OrderedItems';
import { PurchaseBox } from './PuchaseBox';
import { Cart } from '@/lib/types/cart';
import { PaymentMethod } from '@/lib/types/payment-methods';
import { Address } from '@/lib/types/address';

type Props = {
  address: Address;
  paymentMethod: PaymentMethod;
  cart: Cart;
};

// TODO: fix the responsiveness of this page
export const PlaceOrderPage: FC<Props> = (props) => {
  const totalQuantity = props.cart.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Place Order</h1>

      <div className="grid md:grid-cols-4 md:gap-6">
        <div className="col-span-3">
          <ShippingAddressSection address={props.address} />

          <PaymentMethodSection paymentMethod={props.paymentMethod} />

          <OrderedItems items={props.cart.items} />
        </div>

        <PurchaseBox
          itemsPrice={Number(props.cart.itemsPrice)}
          totalQuantity={totalQuantity}
          taxPrice={Number(props.cart.taxPrice)}
          shippingPrice={Number(props.cart.shippingPrice)}
          totalPrice={Number(props.cart.totalPrice)}
        />
      </div>
    </div>
  );
};
