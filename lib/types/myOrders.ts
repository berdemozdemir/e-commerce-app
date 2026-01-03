export type TMyOrders = {
  id: string;
  createdAt: string;
  totalPrice: string;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
};
