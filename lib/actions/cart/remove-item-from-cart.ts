'use server';

import { cookies } from 'next/headers';
import { getMyCart } from './get-my-cart.action';
import { db } from '@/server/drizzle-client';
import { and, eq } from 'drizzle-orm';
import { cartItems, carts, products } from '@/server';
import { calculatePrice } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function removeItemFromCart(args: { productId: string }) {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) throw new Error('Cart not found!');

  const cart = await getMyCart();
  if (!cart) throw new Error('Cart not found!');

  const product = await db.query.products.findFirst({
    where: eq(products.id, args.productId),
  });

  const existingItem = cart.items.find(
    (item) => item.productId === args.productId,
  );

  if (!existingItem) {
    throw new Error('Product not found in cart');
  }

  if (existingItem?.quantity === 1) {
    const updatedItems = cart.items.filter(
      (item) => item.productId !== args.productId,
    );

    const pricing = calculatePrice(updatedItems);

    await db
      .update(carts)
      .set({
        itemsPrice: pricing.itemsPrice,
        shippingPrice: pricing.shippingPrice,
        taxPrice: pricing.taxPrice,
        totalPrice: pricing.totalPrice,
      })
      .where(eq(carts.id, cart.id));

    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.cartId, cart.id),
          eq(cartItems.productId, args.productId),
        ),
      );
  } else {
    const updatedItems = cart.items.map((item) =>
      item.productId === args.productId
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    const pricing = calculatePrice(updatedItems);

    await db
      .update(carts)
      .set({
        itemsPrice: pricing.itemsPrice,
        shippingPrice: pricing.shippingPrice,
        taxPrice: pricing.taxPrice,
        totalPrice: pricing.totalPrice,
      })
      .where(eq(carts.id, cart.id));

    await db
      .update(cartItems)
      .set({ quantity: existingItem.quantity - 1 })
      .where(
        and(
          eq(cartItems.cartId, cart.id),
          eq(cartItems.productId, args.productId),
        ),
      );
  }

  revalidatePath(`/products/${product?.slug}`);

  return { success: true, message: `${product?.name} was removed from cart` };
}
