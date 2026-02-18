'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { Roles } from '@/lib/types/role';
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
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  const parsed = createProductSchema.safeParse(payload);

  if (!parsed.success)
    return failure(parsed.error.issues[0]?.message ?? 'Invalid payload');

  const data = parsed.data;

  const result = await tryCatch(
    db
      .insert(products)
      .values({
        name: data.name,
        slug: `temporary-slug-${Date.now()}`,
        category: data.category,
        brand: data.brand,
        description: data.description,
        stock: data.stock,
        rating: '0',
        images: data.images,
        isFeatured: data.isFeatured,
        banner: data.banner,
        numReviews: 0,
        price: data.price,
        createdAt: new Date(),
      })
      .returning({ id: products.id }),
  );

  if (isFailure(result)) return failure('Failed to create product');

  const resultSlug = await tryCatch(
    db
      .update(products)
      .set({
        slug: SlugHelper.generateUnique(data.name, result.data[0].id),
      })
      .where(eq(products.id, result.data[0].id)),
  );

  if (isFailure(resultSlug)) return failure('Failed to update product slug');

  return ok(undefined);
};
