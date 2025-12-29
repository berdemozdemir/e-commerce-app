import { TOrderItemSchema, TOrderSchema } from '../schemas/order';

export type TOrder = TOrderSchema & {
  id: string;
  user: {
    name: string;
    email: string;
  };
  createdAt?: Date;
  isPaid: boolean;
  paidAt: Date | undefined;
  isDelivered: boolean;
  deliveredAt: Date | undefined;
  orderItems: TOrderItemSchema[];
};
