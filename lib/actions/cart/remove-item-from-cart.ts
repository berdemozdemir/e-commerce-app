'use server';

import { cookies } from 'next/headers';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { getMyCart } from './get-my-cart.action';
import { db } from '@/server/drizzle-client';
import { cartItems, carts, products } from '@/server';
import { calculatePrice } from '@/lib/utils';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';

export async function removeItemFromCart(args: {
  productId: string;
}): Promise<TryTuple<void>> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return fail('Cart not found!');

  const [cartErr, cart] = await getMyCart();
  if (cartErr || !cart) return fail('Cart not found!');

  const product = await db.query.products.findFirst({
    where: eq(products.id, args.productId),
  });
  if (!product) return fail('Product not found!');

  const existingItem = cart.items.find(
    (item) => item.productId === args.productId,
  );

  if (!existingItem) return fail('Item not found in cart!');

  if (existingItem?.quantity === 1) {
    const updatedItems = cart.items.filter(
      (item) => item.productId !== args.productId,
    );

    const pricing = calculatePrice(updatedItems);

    const [updateErr] = await tryCatch(
      db
        .update(carts)
        .set({
          itemsPrice: pricing.itemsPrice,
          shippingPrice: pricing.shippingPrice,
          taxPrice: pricing.taxPrice,
          totalPrice: pricing.totalPrice,
        })
        .where(eq(carts.id, cart.id)),
    );

    if (updateErr) return fail(updateErr);

    const [deleteErr] = await tryCatch(
      db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, args.productId),
          ),
        ),
    );

    if (deleteErr) return fail(deleteErr);
  } else {
    const updatedItems = cart.items.map((item) =>
      item.productId === args.productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    const pricing = calculatePrice(updatedItems);

    const [updateErr2] = await tryCatch(
      db
        .update(carts)
        .set({
          itemsPrice: pricing.itemsPrice,
          shippingPrice: pricing.shippingPrice,
          taxPrice: pricing.taxPrice,
          totalPrice: pricing.totalPrice,
        })
        .where(eq(carts.id, cart.id)),
    );

    if (updateErr2) return fail(updateErr2);

    const [updateItemErr] = await tryCatch(
      db
        .update(cartItems)
        .set({ quantity: existingItem.quantity - 1 })
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, args.productId),
          ),
        ),
    );

    if (updateItemErr) return fail(updateItemErr);
  }

  revalidatePath(`/products/${product?.slug}`);

  return ok(undefined);
}
