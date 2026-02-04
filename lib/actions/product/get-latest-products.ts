'use server';

import { auth } from '@/lib/auth';
import { LATEST_PRODUCTS_LIMIT } from '@/lib/constants/product';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { desc } from 'drizzle-orm';

export const getLatestProducts = async (): Promise<Result<TProduct[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');

  const response = await tryCatch(
    db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        description: products.description,
        price: products.price,
        category: products.category,
        stock: products.stock,
        rating: products.rating,
        numReviews: products.numReviews,
        createdAt: products.createdAt,
        brand: products.brand,
        images: products.images,
        isFeatured: products.isFeatured,
        banner: products.banner,
      })
      .from(products)
      .orderBy(desc(products.createdAt))
      .limit(LATEST_PRODUCTS_LIMIT),
  );

  if (isFailure(response)) return failure(response.error);

  return ok(response.data);
};
