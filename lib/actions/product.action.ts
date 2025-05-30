'use server';

import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { desc, eq } from 'drizzle-orm';
import { LATEST_PRODUCTS_LIMIT } from '../constants/product';

export async function getLatestProducts() {
  const data = await db.query.products.findMany({
    limit: LATEST_PRODUCTS_LIMIT,
    orderBy: desc(products.createdAt),
  });

  return data;
}

export async function getProductBySlug(slug: string) {
  const data = await db.query.products.findFirst({
    where: eq(products.slug, slug),
  });

  return data;
}
