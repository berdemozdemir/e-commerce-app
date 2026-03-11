import { eq } from 'drizzle-orm';
import { auth } from '../auth';
import { fail, ok, tryCatch, TryTuple } from '../result';
import { MyOrders } from '../types/myOrders';
import { db } from '@/server/drizzle-client';
import { orders } from '@/server';

// TODO: add a pagination or infinite scroll to this data

export const getMyOrders = async (): Promise<TryTuple<MyOrders[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');

  const [err, rows] = await tryCatch(
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

  if (err || !rows) return fail(err ?? 'Unauthorized');

  const myOrders: MyOrders[] = rows.map((item) => ({
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
