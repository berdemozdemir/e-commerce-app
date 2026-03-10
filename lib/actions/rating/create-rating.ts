'use server';

import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { TCreateRatingSchema } from '@/lib/types/rating';
import { createRatingSchema } from '@/lib/schemas/rating/create-rating';
import { db } from '@/server/drizzle-client';
import { ratings } from '@/server';

// TODO: add a client side update mechanism for the product stats, revalidate path is not a good idea because it will be called on every rating creation.
export const createRating = async (
  payload: TCreateRatingSchema,
): Promise<TryTuple<void>> => {
  const session = await auth();
  if (!session?.user)
    return fail('User account not found. Please log in again.');

  const userId = session.user.id;
  if (!userId) return fail('User account not found. Please log in again.');

  const parsedPayload = createRatingSchema.safeParse(payload);

  if (!parsedPayload.success)
    return fail(parsedPayload.error.issues[0]?.message ?? 'Invalid payload');

  const [err, inserted] = await tryCatch(
    db
      .insert(ratings)
      .values({
        productId: parsedPayload.data.productId,
        title: parsedPayload.data.title,
        rating: parsedPayload.data.rating,
        comment: parsedPayload.data.comment,
        userId,
      })
      .returning({
        productId: ratings.productId,
      }),
  );

  if (err) return fail(err ?? 'Failed to create rating');

  if (!inserted?.length) return fail('Failed to create rating');

  return ok(undefined);
};
