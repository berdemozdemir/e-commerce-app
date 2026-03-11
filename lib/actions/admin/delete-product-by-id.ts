'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';

export const deleteProductById = async (payload: {
  productId: string;
}): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const [err] = await tryCatch(
    db.delete(products).where(eq(products.id, payload.productId)),
  );

  if (err) return fail(err);

  revalidatePath(paths.admin.products.list);

  return ok(undefined);
};
