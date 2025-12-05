'use server';

import { cookies } from 'next/headers';
import { getMyCart } from './get-my-cart.action';
import { db } from '@/server/drizzle-client';
import { and, eq } from 'drizzle-orm';
import { cartItems, carts, products } from '@/server';
import { calculatePrice } from '@/lib/utils';
import { revalidatePath } from 'next/cache';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';

export async function removeItemFromCart(args: {
  productId: string;
}): Promise<Result<void>> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return failure('Cart not found!');

  const cart = await getMyCart();
  if (!cart) return failure('Cart not found!');

  const product = await db.query.products.findFirst({
    where: eq(products.id, args.productId),
  });
  if (!product) return failure('Product not found!');

  const existingItem = cart.items.find(
    (item) => item.productId === args.productId,
  );

  if (!existingItem) return failure('Item not found in cart!');

  if (existingItem?.quantity === 1) {
    const updatedItems = cart.items.filter(
      (item) => item.productId !== args.productId,
    );

    const pricing = calculatePrice(updatedItems);

    const updateCartResult = await tryCatch(
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

    if (isFailure(updateCartResult)) return failure(updateCartResult.error);

    const deleteItemResult = await tryCatch(
      db
        .delete(cartItems)
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, args.productId),
          ),
        ),
    );

    if (isFailure(deleteItemResult)) return failure(deleteItemResult.error);
  } else {
    const updatedItems = cart.items.map((item) =>
      item.productId === args.productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    const pricing = calculatePrice(updatedItems);

    const updateCartResult = await tryCatch(
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

    if (isFailure(updateCartResult)) return failure(updateCartResult.error);

    const updateItemResult = await tryCatch(
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

    if (isFailure(updateItemResult)) return failure(updateItemResult.error);
  }

  revalidatePath(`/products/${product?.slug}`);

  return ok(undefined);
}
