'use server';

import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TFeaturedProduct, TProduct } from '@/lib/types/product';
import { db } from '@/server/drizzle-client';
import { products } from '@/server/schema';
import { eq } from 'drizzle-orm';

export const getFeaturedProducts = async (): Promise<
  Result<TFeaturedProduct[]>
> => {
  const response = await tryCatch(
    db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        banner: products.banner,
      })
      .from(products)
      .where(eq(products.isFeatured, true)),
  );

  if (isFailure(response)) return failure(response.error);

  const featuredProducts: TFeaturedProduct[] = response.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    banner: item.banner,
  }));

  return ok(featuredProducts);
};
