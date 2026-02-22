'use server';

import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TAdminProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq, ilike } from 'drizzle-orm';

// TODO: add a pagination or infinite scroll to this data
export const getProducts = async (args: {
  query?: string;
}): Promise<Result<TAdminProduct[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  const whereClause = args.query
    ? ilike(products.name, `%${args.query}%`)
    : undefined;

  const response = await tryCatch(
    db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        price: products.price,
        category: products.category,
        stock: products.stock,
        rating: products.rating,
      })
      .from(products)
      .where(whereClause),
  );

  if (isFailure(response)) return failure(response.error);

  const allProducts: TAdminProduct[] = response.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    price: item.price,
    category: item.category,
    stock: item.stock,
    rating: item.rating,
  }));

  return ok(allProducts);
};
