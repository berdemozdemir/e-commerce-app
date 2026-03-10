'use server';

import { cookies } from 'next/headers';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/server/drizzle-client';
import { cartItems, carts } from '@/server';
import { auth } from '@/lib/auth';
import { TCart } from '@/lib/schemas/cart/cart-item.schema';
import { convertToPlainObject } from '@/lib/utils';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';

export async function getMyCart(): Promise<TryTuple<TCart | undefined>> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;

  if (!sessionCartId) return fail('Cart not found!');

  const session = await auth();

  const userId = session?.user?.id ? session.user.id : undefined;

  const [cartErr, cart] = await tryCatch(
    db.query.carts.findFirst({
      where: userId
        ? eq(carts.userId, userId)
        : eq(carts.sessionCartId, sessionCartId),
    }),
  );

  if (cartErr) return fail(cartErr);

  if (!cart) return ok(undefined);

  const [itemsErr, rawItems] = await tryCatch(
    db.query.cartItems.findMany({
      where: eq(cartItems.cartId, cart.id),
      orderBy: [desc(cartItems.createdAt)],
    }),
  );

  if (itemsErr || !rawItems)
    return fail(itemsErr ?? 'Failed to fetch cart items');

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
