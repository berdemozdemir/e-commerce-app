import { db } from '@/server/drizzle-client';
import { auth } from '../auth';
import { failure, isFailure, ok, Result, tryCatch } from '../result';
import { eq } from 'drizzle-orm';
import { orders } from '@/server';
import { TMyOrders } from '../types/myOrders';

// TODO: add a pagination or infinite scroll to this data

export const getMyOrders = async (): Promise<Result<TMyOrders[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  // TODO: is returning failure correct or should it throw custom error ?
  if (!userId) return failure('Unauthorized');

  const response = await tryCatch(
    db
      .select({
        id: orders.id,
        createdAt: orders.createdAt,
        isPaid: orders.isPaid,
        paidAt: orders.paidAt,
        isDelivered: orders.isDelivered,
        deliveredAt: orders.deliveredAt,
        totalPrice: orders.totalPrice,
      })
      .from(orders)
      .where(eq(orders.userId, userId)),
  );

  if (isFailure(response)) return failure(response.error);

  const myOrders: TMyOrders[] = response.data.map((item) => ({
    id: item.id,
    createdAt: item.createdAt.toString(),
    totalPrice: item.totalPrice,
    isPaid: item.isPaid,
    paidAt: item.paidAt?.toString() ?? undefined,
    isDelivered: item.isDelivered,
    deliveredAt: item.deliveredAt?.toString() ?? undefined,
  }));

  return ok(myOrders);
};
