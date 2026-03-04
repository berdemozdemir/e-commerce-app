'use server';

import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TProduct } from '@/lib/types/product';
import { products } from '@/server';
import { db } from '@/server/drizzle-client';
import { and, asc, desc, eq, gte, ilike, lte, SQL } from 'drizzle-orm';

export const getFilteredProducts = async (args: {
  query?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  rating?: string;
  sort?: string;
}): Promise<Result<TProduct[]>> => {
  const conditions: SQL[] = [];

  if (args.query) conditions.push(ilike(products.name, `%${args.query}%`));
  if (args.category) conditions.push(eq(products.category, args.category));
  if (args.minPrice) conditions.push(gte(products.price, args.minPrice));
  if (args.maxPrice) conditions.push(lte(products.price, args.maxPrice));
  if (args.rating) conditions.push(gte(products.rating, args.rating));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const sortOptions: Record<string, SQL> = {
    'Newest': desc(products.createdAt),
    'Oldest': asc(products.createdAt),
    'Price: Low to High': asc(products.price),
    'Price: High to Low': desc(products.price),
    'Rating: Low to High': asc(products.rating),
    'Rating: High to Low': desc(products.rating),
  };

  const orderByClause =
    (args.sort && sortOptions[args.sort]) || desc(products.createdAt);

  const response = await tryCatch(
    db
      .select({
        id: products.id,
        slug: products.slug,
        name: products.name,
        description: products.description,
        price: products.price,
        category: products.category,
        stock: products.stock,
        rating: products.rating,
        numReviews: products.numReviews,
        createdAt: products.createdAt,
        brand: products.brand,
        images: products.images,
        isFeatured: products.isFeatured,
        banner: products.banner,
      })
      .from(products)
      .where(whereClause)
      .orderBy(orderByClause),
  );

  if (isFailure(response)) return failure(response.error);

  const allProducts: TProduct[] = response.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    price: item.price,
    description: item.description,
    category: item.category,
    stock: item.stock,
    rating: item.rating,
    numReviews: item.numReviews,
    createdAt: item.createdAt,
    brand: item.brand,
    images: item.images,
    isFeatured: item.isFeatured,
    banner: item.banner,
  }));

  return ok(allProducts);
};
