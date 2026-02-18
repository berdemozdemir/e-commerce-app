'use server';

import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { failure, tryCatch, isFailure, Result, ok } from '@/lib/result';
import { orders } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const markAsDeliveredOrder = async (payload: {
  orderId: string;
}): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  const result = await tryCatch(
    db
      .update(orders)
      .set({ isDelivered: true, deliveredAt: new Date() })
      .where(eq(orders.id, payload.orderId)),
  );

  if (isFailure(result)) return failure(result.error);

  revalidatePath(paths.orderDetails(payload.orderId));

  return ok(undefined);
};
