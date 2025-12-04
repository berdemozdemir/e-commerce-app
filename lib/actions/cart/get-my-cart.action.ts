'use server';

import { cookies } from 'next/headers';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { cartItems, carts } from '@/server';
import { auth } from '@/lib/auth';
import { TCart } from '@/lib/schemas/cart/cart-item.schema';
import { convertToPlainObject } from '@/lib/utils';

export async function getMyCart(): Promise<TCart | undefined> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;

  if (!sessionCartId) throw new Error('Cart not found!');

  const session = await auth();

  const userId = session?.user?.id ? session.user.id : undefined;

  const cart = await db.query.carts.findFirst({
    where: userId
      ? eq(carts.userId, userId)
      : eq(carts.sessionCartId, sessionCartId),
  });

  if (!cart) return undefined;

  const rawItems = await db.query.cartItems.findMany({
    where: eq(cartItems.cartId, cart.id),
  });

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

  return convertToPlainObject({
    ...cart,
    userId,
    items,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice,
  });
}
