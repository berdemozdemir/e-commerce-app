'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { ratings } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { paths } from '@/lib/constants/paths';

export const deleteRating = async (payload: {
  ratingId: string;
}): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');

  const response = await tryCatch(
    db.delete(ratings).where(eq(ratings.id, payload.ratingId)).returning({
      productId: ratings.productId,
    }),
  );

  if (isFailure(response)) return failure(response.error);

  if (response.data.length === 0) return failure('Rating not found');

  return ok(undefined);
};
