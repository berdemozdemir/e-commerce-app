'use server';

import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { db } from '@/server/drizzle-client';
import { products } from '@/server/schema';
import { count, desc } from 'drizzle-orm';

export type TProductCategory = {
  name: string;
  count: number;
};

export const getProductCategories = async (): Promise<
  Result<TProductCategory[]>
> => {
  const response = await tryCatch(
    db
      .select({ name: products.category, count: count() })
      .from(products)
      .groupBy(products.category)
      .orderBy(desc(products.category)),
  );

  if (isFailure(response)) return failure(response.error);

  return ok(response.data);
};
