import { OrderItemSchema, OrderSchema } from '../schemas/order';

export type Order = OrderSchema & {
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
  orderItems: OrderItemSchema[];
};
