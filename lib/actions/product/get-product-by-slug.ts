'use server';

import { eq } from 'drizzle-orm';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { TProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';

export const getProductBySlug = async (payload: {
  slug: string;
  isAdmin?: boolean;
}): Promise<TryTuple<TProduct>> => {
  const [err, rows] = await tryCatch(
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

  if (err) return fail(err);

  if (!rows?.[0]) return fail('Product not found');

  return ok(rows[0]);
};
