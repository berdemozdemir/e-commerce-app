'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result } from '@/lib/result';
import { TUpdateRatingSchema } from '@/lib/types/rating';
import { tryCatch } from '@/lib/result';
import { db } from '@/server/drizzle-client';
import { ratings } from '@/server';

export const updateRating = async (
  payload: TUpdateRatingSchema,
): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');

  const response = await tryCatch(
    db
      .update(ratings)
      .set(payload)
      .where(eq(ratings.id, payload.ratingId))
      .returning({
        productId: ratings.productId,
      }),
  );

  if (isFailure(response))
    return failure(response.error ?? 'Failed to update rating');

  if (response.data.length === 0) return failure('Rating not found');

  return ok(undefined);
};
