'use server';

import { ilike } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { TAdminProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';

// TODO: add a pagination or infinite scroll to this data
export const getProducts = async (args: {
  query?: string;
}): Promise<TryTuple<TAdminProduct[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const whereClause = args.query
    ? ilike(products.name, `%${args.query}%`)
    : undefined;

  const [err, rows] = await tryCatch(
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

  if (err || !rows) return fail(err ?? 'Failed to fetch products');

  const allProducts: TAdminProduct[] = rows.map((item) => ({
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
