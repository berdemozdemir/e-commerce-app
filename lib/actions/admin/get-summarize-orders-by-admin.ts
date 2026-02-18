'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { Role } from '@/lib/types/role';
import { MonthlySalesRow } from '@/lib/types/admin/monthly-sales';
import { RecentOrder } from '@/lib/types/admin/recent-orders';
import { orders, products, users } from '@/server';
import { db } from '@/server/drizzle-client';
import { desc, sql, eq } from 'drizzle-orm';

export const getSummarizeOrdersByAdmin = async (): Promise<
  Result<{
    totalRevenue: number;
    totalSales: number;
    totalCustomer: number;
    totalProducts: number;
    recentOrders: RecentOrder[];
    monthlySales: MonthlySalesRow[];
  }>
> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Role.Admin) return failure('Forbidden');

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
          orderId: orders.id,
          date: orders.createdAt,
          totalPrice: orders.totalPrice,
        })
        .from(orders)
        .innerJoin(users, eq(orders.userId, users.id))
        .limit(10)
        .orderBy(desc(orders.createdAt)),

      db.execute<MonthlySalesRow>(sql`
            SELECT 
              to_char(created_at, 'MM/YY') as month,
              sum(total_price) as "totalSales"
            FROM orders
            GROUP BY to_char(created_at, 'MM/YY')
            ORDER BY min(created_at)
          `),
    ]),
  );

  if (isFailure(result)) return failure(result.error);

  const [
    totalRevenueRow,
    totalSales,
    totalCustomer,
    totalProducts,
    recentOrders,
    monthlySalesRow,
  ] = result.data;

  const monthlySales = monthlySalesRow.rows.map((item) => ({
    month: item.month,
    totalSales: item.totalSales,
  }));

  return ok({
    totalRevenue: Number(totalRevenueRow[0].totalRevenue ?? 0),
    totalSales,
    totalCustomer,
    totalProducts,
    recentOrders,
    monthlySales,
  });
};
