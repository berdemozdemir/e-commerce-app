import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { MyOrders } from '@/lib/types/myOrders';
import { orders } from '@/server';
import { db } from '@/server/drizzle-client';

// TODO: add a pagination or infinite scroll to this data

export const getOrdersByAdmin = async (): Promise<TryTuple<MyOrders[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

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
      .from(orders),
  );

  if (err || !rows) return fail(err ?? 'Failed to fetch orders');

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
