'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { orders, products, users } from '@/server';
import { db } from '@/server/drizzle-client';
import { desc, sql, eq } from 'drizzle-orm';

export const getSummarizeOrdersByAdmin = async (): Promise<
  Result<{
    totalRevenue: number;
    totalSales: number;
    totalCustomer: number;
    totalProducts: number;
    recentOrders: Array<{
      name: string;
      id: string;
      date: Date;
      totalPrice: string;
    }>;
  }>
> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');

  const result = await tryCatch(
    Promise.all([
      db
        .select({
          totalRevenue: sql`coalesce(sum(${orders.totalPrice}), 0)`,
        })
        .from(orders),

      db.$count(orders),

      db.$count(users),

      db.$count(products),

      db
        .select({
          name: users.name,
          id: users.id,
          date: orders.createdAt,
          totalPrice: orders.totalPrice,
        })
        .from(orders)
        .innerJoin(users, eq(orders.userId, users.id))
        .limit(10)
        .orderBy(desc(orders.createdAt)),
    ]),
  );

  if (isFailure(result)) return failure(result.error);

  const [
    totalRevenueRow,
    totalSales,
    totalCustomer,
    totalProducts,
    recentOrders,
  ] = result.data;

  return ok({
    totalRevenue: Number(totalRevenueRow[0].totalRevenue ?? 0),
    totalSales,
    totalCustomer,
    totalProducts,
    recentOrders,
  });
};
