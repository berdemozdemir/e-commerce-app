'use server';

import { desc, eq } from 'drizzle-orm';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { Rating } from '@/lib/types/rating';
import { ratings, users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getProductRatings = async (args: {
  productId: string;
}): Promise<TryTuple<Rating[]>> => {
  const [err, rows] = await tryCatch(
    db
      .select({
        id: ratings.id,
        productId: ratings.productId,
        userId: ratings.userId,
        userName: users.name,
        title: ratings.title,
        rating: ratings.rating,
        comment: ratings.comment,
        createdAt: ratings.createdAt,
      })
      .from(ratings)
      .innerJoin(users, eq(ratings.userId, users.id))
      .where(eq(ratings.productId, args.productId))
      .orderBy(desc(ratings.createdAt)),
  );

  if (err || !rows) return fail(err ?? 'Failed to fetch ratings');

  const ratingsData: Rating[] = rows.map((rating) => ({
    id: rating.id,
    productId: rating.productId,
    userId: rating.userId,
    userName: rating.userName,
    title: rating.title,
    rating: rating.rating,
    comment: rating.comment ?? undefined,
    createdAt: rating.createdAt.toISOString(),
  }));

  return ok(ratingsData);
};
