import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TAdminProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';

// TODO: add a pagination or infinite scroll to this data

export const getProducts = async (): Promise<Result<TAdminProduct[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== 'admin') return failure('Forbidden');

  const response = await tryCatch(
    db
      .select({
        id: products.id,
        name: products.name,
        price: products.price,
        category: products.category,
        stock: products.stock,
        rating: products.rating,
      })
      .from(products),
  );

  if (isFailure(response)) return failure(response.error);

  const allProducts: TAdminProduct[] = response.data.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category,
    stock: item.stock,
    rating: item.rating,
  }));

  return ok(allProducts);
};
