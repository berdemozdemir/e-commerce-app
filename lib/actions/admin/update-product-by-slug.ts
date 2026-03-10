'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { Roles } from '@/lib/types/role';
import {
  TUpdateProductSchema,
  updateProductSchema,
} from '@/lib/schemas/product/update-product.schema';
import { TAdminProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';

export const updateProductBySlug = async (args: {
  slug: string;
  data: TUpdateProductSchema;
}): Promise<TryTuple<TAdminProduct>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const parsedProduct = updateProductSchema.safeParse(args.data);

  if (!parsedProduct.success)
    return fail(parsedProduct.error.issues[0]?.message ?? 'Invalid payload');

  const [err, updated] = await tryCatch(
    db
      .update(products)
      .set(parsedProduct.data)
      .where(eq(products.slug, args.slug))
      .returning(),
  );

  if (err) return fail(err || 'Failed to update product');

  if (!updated?.length) return fail('Product not found');

  return ok(updated[0]);
};
