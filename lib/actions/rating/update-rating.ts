'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { UpdateRatingSchema } from '@/lib/types/rating';
import { db } from '@/server/drizzle-client';
import { ratings } from '@/server';

export const updateRating = async (
  args: UpdateRatingSchema,
): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');

  const [err, updated] = await tryCatch(
    db
      .update(ratings)
      .set(args)
      .where(eq(ratings.id, args.ratingId))
      .returning({
        productId: ratings.productId,
      }),
  );

  if (err) return fail(err ?? 'Failed to update rating');

  if (!updated?.length) return fail('Rating not found');

  return ok(undefined);
};
