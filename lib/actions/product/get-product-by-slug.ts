'use server';

import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const getProductBySlug = async (payload: {
  slug: string;
  isAdmin?: boolean;
}): Promise<Result<TProduct>> => {
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
      .where(eq(products.slug, payload.slug))
      .limit(1),
  );

  if (isFailure(response)) return failure(response.error);

  if (!response.data[0]) return failure('Product not found');

  return ok(response.data[0]);
};
