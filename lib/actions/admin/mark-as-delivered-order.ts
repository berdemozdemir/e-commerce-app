'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { orders } from '@/server';
import { db } from '@/server/drizzle-client';

export const markAsDeliveredOrder = async (args: {
  orderId: string;
}): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const [err] = await tryCatch(
    db
      .update(orders)
      .set({ isDelivered: true, deliveredAt: new Date() })
      .where(eq(orders.id, args.orderId)),
  );

  if (err) return fail(err);

  revalidatePath(paths.orderDetails(args.orderId));

  return ok(undefined);
};
