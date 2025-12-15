import { TOrderItemSchema, TOrderSchema } from '../schemas/order';

export type TOrder = TOrderSchema & {
  id: string;
  user: {
    name: string;
    email: string;
  };
  createdAt: string;
  isPaid: boolean;
  paidAt: string | null;
  isDelivered: boolean;
  deliveredAt: string | null;
  orderItems: TOrderItemSchema[];
};
