'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { orders } from '@/server';
import { db } from '@/server/drizzle-client';

export const deleteOrderById = async (payload: {
  orderId: string;
}): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  const response = await tryCatch(
    db
      .delete(orders)
      .where(eq(orders.id, payload.orderId))
      .returning({ id: orders.id }),
  );

  if (isFailure(response)) return failure(response.error);

  if (response.data.length === 0) return failure('Order not found');

  revalidatePath(paths.admin.orders);

  return ok(undefined);
};
