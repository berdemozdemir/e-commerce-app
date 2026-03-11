'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { Roles } from '@/lib/types/role';
import {
  createProductSchema,
  CreateProductSchema,
} from '@/lib/schemas/product/create-product.schema';
import { SlugHelper } from '@/lib/utils/slug';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';

export const createProduct = async (
  args: CreateProductSchema,
): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const parsed = createProductSchema.safeParse(args);

  if (!parsed.success)
    return fail(parsed.error.issues[0]?.message ?? 'Invalid payload');

  const data = parsed.data;

  const [insertErr, inserted] = await tryCatch(
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

  if (insertErr || !inserted?.length) return fail('Failed to create product');

  const [slugErr] = await tryCatch(
    db
      .update(products)
      .set({
        slug: SlugHelper.generateUnique(data.name, inserted[0].id),
      })
      .where(eq(products.id, inserted[0].id)),
  );

  if (slugErr) return fail('Failed to update product slug');

  return ok(undefined);
};
