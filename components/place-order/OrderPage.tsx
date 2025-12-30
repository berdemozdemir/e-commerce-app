import { TOrder } from '@/lib/types/order';
import { FC } from 'react';

type Props = {
  order: TOrder;
};

export const OrderPage: FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.order.id}</h1>
      <h1>{props.order.user.name}</h1>
    </div>
  );
};
