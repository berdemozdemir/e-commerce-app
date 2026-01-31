import { TShippingAddressSchema } from '@/lib/schemas/shipping-address';
import { FC } from 'react';
import { Badge } from '../ui/Badge';
import { formatDate } from '@/lib/utils/date';

type Props = {
  userName: string;
  shippingAddress: TShippingAddressSchema;
  deliveredAt?: Date;
  isDelivered: boolean;
};

export const ShippingAddressSection: FC<Props> = (props) => (
  <section className="mb-8 flex flex-col gap-2 rounded-md border p-4">
    <h1>Shipping Address</h1>

    <div className="flex items-center gap-1">
      <h1>{props.userName}</h1> -<h1>{props.shippingAddress.addressName}</h1>
    </div>

    <h1>{props.shippingAddress.address}</h1>

    <p className="mb-4">
      {props.shippingAddress.city}, {props.shippingAddress.country}{' '}
      {props.shippingAddress.postalCode}
    </p>

    {props.isDelivered && props.deliveredAt && (
      <Badge variant="success">
        Delivered at:{formatDate(props.deliveredAt?.toString())}
      </Badge>
    )}

    {!props.isDelivered && <Badge variant="destructive">Not Delivered</Badge>}
  </section>
);
