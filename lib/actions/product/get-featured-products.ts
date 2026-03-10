'use server';

import { eq } from 'drizzle-orm';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { TFeaturedProduct } from '@/lib/types/product';
import { db } from '@/server/drizzle-client';
import { products } from '@/server/schema';

export const getFeaturedProducts = async (): Promise<
  TryTuple<TFeaturedProduct[]>
> => {
  const [err, rows] = await tryCatch(
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

  if (err || !rows) return fail(err ?? 'Failed to fetch products');

  const featuredProducts: TFeaturedProduct[] = rows.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    banner: item.banner,
  }));

  return ok(featuredProducts);
};
