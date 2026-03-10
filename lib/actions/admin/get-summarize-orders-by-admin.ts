'use server';

import { desc, sql, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { Roles } from '@/lib/types/role';
import { MonthlySalesRow } from '@/lib/types/admin/monthly-sales';
import { RecentOrder } from '@/lib/types/admin/recent-orders';
import { orders, products, users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getSummarizeOrdersByAdmin = async (): Promise<
  TryTuple<{
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

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const [err, raw] = await tryCatch(
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

  if (err || !raw) return fail(err ?? 'Failed to fetch summary');

  const [
    totalRevenueRow,
    totalSales,
    totalCustomer,
    totalProducts,
    recentOrders,
    monthlySalesRow,
  ] = raw;

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
