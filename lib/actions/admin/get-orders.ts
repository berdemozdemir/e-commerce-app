import { auth } from '@/lib/auth';
import { Role } from '@/lib/types/role';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TMyOrders } from '@/lib/types/myOrders';
import { orders } from '@/server';
import { db } from '@/server/drizzle-client';

// TODO: add a pagination or infinite scroll to this data

export const getOrdersByAdmin = async (): Promise<Result<TMyOrders[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Role.Admin) return failure('Forbidden');

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
      .from(orders),
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
