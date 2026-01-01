import { TShippingAddressSchema } from '@/lib/schemas/shipping-address';
import { FC } from 'react';
import { Badge } from '../ui/Badge';

type Props = {
  userName: string;
  shippingAddress: TShippingAddressSchema;
  isDelivered: boolean;
};

export const ShippingAddressSection: FC<Props> = ({
  userName,
  shippingAddress,
  isDelivered,
}) => (
  <section className="mb-8 flex flex-col gap-2 rounded-md border p-4">
    <h1>Shipping Address</h1>

    <div className="flex items-center gap-1">
      <h1>{userName}</h1> -<h1>{shippingAddress.addressName}</h1>
    </div>

    <h1>{shippingAddress.address}</h1>

    <p className="mb-4">
      {shippingAddress.city}, {shippingAddress.country}{' '}
      {shippingAddress.postalCode}
    </p>

    <Badge variant={isDelivered ? 'success' : 'destructive'}>
      {isDelivered ? 'Delivered' : 'Not Delivered'}
    </Badge>
  </section>
);
