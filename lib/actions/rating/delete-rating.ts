'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { ratings } from '@/server';
import { db } from '@/server/drizzle-client';

export const deleteRating = async (args: {
  ratingId: string;
}): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');

  const [err, deleted] = await tryCatch(
    db.delete(ratings).where(eq(ratings.id, args.ratingId)).returning({
      productId: ratings.productId,
    }),
  );

  if (err) return fail(err);

  if (!deleted?.length) return fail('Rating not found');

  return ok(undefined);
};
