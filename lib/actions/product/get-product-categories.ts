'use server';

import { count, desc } from 'drizzle-orm';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { db } from '@/server/drizzle-client';
import { products } from '@/server/schema';

export type TProductCategory = {
  name: string;
  count: number;
};

export const getProductCategories = async (): Promise<
  TryTuple<TProductCategory[]>
> => {
  const [err, data] = await tryCatch(
    db
      .select({ name: products.category, count: count() })
      .from(products)
      .groupBy(products.category)
      .orderBy(desc(products.category)),
  );

  if (err || !data) return fail(err ?? 'Failed to fetch categories');

  return ok(data);
};
