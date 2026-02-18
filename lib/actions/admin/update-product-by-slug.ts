'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { Roles } from '@/lib/types/role';
import {
  TUpdateProductSchema,
  updateProductSchema,
} from '@/lib/schemas/product/update-product.schema';
import { TAdminProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const updateProductBySlug = async (args: {
  slug: string;
  data: TUpdateProductSchema;
}): Promise<Result<TAdminProduct>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  const parsedProduct = updateProductSchema.safeParse(args.data);

  if (!parsedProduct.success)
    return failure(parsedProduct.error.issues[0]?.message ?? 'Invalid payload');

  const result = await tryCatch(
    db
      .update(products)
      .set(parsedProduct.data)
      .where(eq(products.slug, args.slug))
      .returning(),
  );

  if (isFailure(result))
    return failure(result.error || 'Failed to update product');

  if (result.data.length === 0) return failure('Product not found');

  return ok(result.data[0]);
};
