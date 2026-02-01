'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const deleteProductById = async (payload: {
  productId: string;
}): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== 'admin') return failure('Forbidden');

  const result = await tryCatch(
    db.delete(products).where(eq(products.id, payload.productId)),
  );

  if (isFailure(result)) return failure(result.error);

  return ok(undefined);
};
