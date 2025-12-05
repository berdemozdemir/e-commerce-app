'use server';

import { cookies } from 'next/headers';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { cartItems, carts } from '@/server';
import { auth } from '@/lib/auth';
import { TCart } from '@/lib/schemas/cart/cart-item.schema';
import { convertToPlainObject } from '@/lib/utils';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';

export async function getMyCart(): Promise<Result<TCart | undefined>> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;

  if (!sessionCartId) return failure('Cart not found!');

  const session = await auth();

  const userId = session?.user?.id ? session.user.id : undefined;

  const cartResult = await tryCatch(
    db.query.carts.findFirst({
      where: userId
        ? eq(carts.userId, userId)
        : eq(carts.sessionCartId, sessionCartId),
    }),
  );

  if (isFailure(cartResult)) {
    return failure(cartResult.error);
  }

  const cart = cartResult.data;

  if (!cart) return ok(undefined);

  const itemsResult = await tryCatch(
    db.query.cartItems.findMany({
      where: eq(cartItems.cartId, cart.id),
    }),
  );

  if (isFailure(itemsResult)) return failure(itemsResult.error);

  const rawItems = itemsResult.data;

  const items = rawItems
    .filter((item) => item.productId !== null)
    .map((item) => ({
      name: item.name,
      productId: item.productId,
      price: item.price,
      slug: item.slug,
      quantity: item.quantity,
      image: item.image,
    }));

  const result = convertToPlainObject({
    ...cart,
    userId,
    items,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
  });

  return ok(result);
}
