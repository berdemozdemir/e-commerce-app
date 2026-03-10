'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { orders } from '@/server';
import { db } from '@/server/drizzle-client';

export const deleteOrderById = async (payload: {
  orderId: string;
}): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const [err, deleted] = await tryCatch(
    db
      .delete(orders)
      .where(eq(orders.id, payload.orderId))
      .returning({ id: orders.id }),
  );

  if (err) return fail(err);

  if (!deleted?.length) return fail('Order not found');

  revalidatePath(paths.admin.orders);

  return ok(undefined);
};
