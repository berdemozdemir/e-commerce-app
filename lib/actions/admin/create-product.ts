'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import {
  createProductSchema,
  TCreateProductSchema,
} from '@/lib/schemas/product/create-product.schema';
import { SlugHelper } from '@/lib/utils/slug';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const createProduct = async (
  payload: TCreateProductSchema,
): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== 'admin') return failure('Forbidden');

  // TODO: fix broken failure flow by schema parser | parse or safeparse ?
  // ```ts
  //       const parsed = createProductSchema().safeParse(payload);
  //       if (!parsed.success) return failure(parsed.error.issues[0]?.message ?? 'Invalid payload');
  //       const data = parsed.data;
  // ```
  const parsed = createProductSchema().parse(payload);

  const result = await tryCatch(
    db
      .insert(products)
      .values({
        name: parsed.name,
        slug: `temporary-slug-${Date.now()}`,
        category: parsed.category,
        brand: parsed.brand,
        description: parsed.description,
        stock: parsed.stock,
        rating: '0',
        images: parsed.images,
        isFeatured: parsed.isFeatured,
        banner: parsed.banner,
        numReviews: 0,
        price: parsed.price,
        createdAt: new Date(),
      })
      .returning({ id: products.id }),
  );

  if (isFailure(result)) return failure('Failed to create product');

  const resultSlug = await tryCatch(
    db
      .update(products)
      .set({
        slug: SlugHelper.generateUnique(parsed.name, result.data[0].id),
      })
      .where(eq(products.id, result.data[0].id)),
  );

  if (isFailure(resultSlug)) return failure('Failed to update product slug');

  return ok(undefined);
};
