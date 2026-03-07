'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TCreateRatingSchema } from '@/lib/types/rating';
import { createRatingSchema } from '@/lib/schemas/rating/create-rating';
import { db } from '@/server/drizzle-client';
import { ratings } from '@/server';

// TODO: add a client side update mechanism for the product stats, revalidate path is not a good idea because it will be called on every rating creation.
export const createRating = async (
  payload: TCreateRatingSchema,
): Promise<Result<void>> => {
  const session = await auth();
  if (!session?.user)
    return failure('User account not found. Please log in again.s');

  const userId = session.user.id;
  if (!userId) return failure('User account not found. Please log in again.');

  const parsedPayload = createRatingSchema.safeParse(payload);

  if (!parsedPayload.success)
    return failure(parsedPayload.error.issues[0]?.message ?? 'Invalid payload');

  const response = await tryCatch(
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

  if (isFailure(response))
    return failure(response.error ?? 'Failed to create rating');

  if (response.data.length === 0) return failure('Failed to create rating');

  return ok(undefined);
};
