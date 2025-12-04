'use server';

import { cookies } from 'next/headers';
import {
  cartItemSchema,
  cartSchema,
  TCartItem,
} from '../../schemas/cart/cart-item.schema';
import { auth } from '../../auth';
import { db } from '@/server/drizzle-client';
import { and, eq } from 'drizzle-orm';
import { cartItems, carts, products } from '@/server';
import { calculatePrice } from '../../utils';
import { revalidatePath } from 'next/cache';
import { getMyCart } from './get-my-cart.action';

export async function addItemToCart(payload: TCartItem) {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;

  if (!sessionCartId) throw new Error('Cart not found!');

  const session = await auth();

  const userId = session?.user?.id ? session.user.id : undefined;

  const newItem = cartItemSchema.parse(payload);

  const product = await db.query.products.findFirst({
    where: eq(products.id, newItem.productId),
  });

  if (!product) throw new Error('Product not found!');

  const cart = await getMyCart();

  if (!cart) {
    if (product.stock < newItem.quantity) throw new Error('Not enough stock');

    const newCart = cartSchema.parse({
      userId,
      sessionCartId,
      items: [newItem],
      ...calculatePrice([newItem]),
    });

    const [insertedCart] = await db
      .insert(carts)
      .values({
        sessionCartId,
        userId,
        itemsPrice: newCart.itemsPrice,
        shippingPrice: newCart.shippingPrice,
        taxPrice: newCart.taxPrice,
        totalPrice: newCart.totalPrice,
      })
      .returning();

    await db
      .insert(cartItems)
      .values({
        cartId: insertedCart.id,
        productId: newItem.productId,
        name: newItem.name,
        slug: newItem.slug,
        image: newItem.image,
        price: newItem.price,
        quantity: newItem.quantity,
      })
      .returning();

    revalidatePath(`/product/${product.slug}`);

    return { status: 'success', message: `${product.name} added to cart` };
  } else {
    const existItem = cart.items.find((item) => item.productId === product.id);

    if (existItem) {
      const newQuantity = existItem.quantity + 1;

      if (product.stock < newQuantity) {
        throw new Error('Not enough stock');
      }

      existItem.quantity = newQuantity;

      await db
        .update(cartItems)
        .set({ quantity: newQuantity })
        .where(
          and(
            eq(cartItems.cartId, cart.id),
            eq(cartItems.productId, product.id),
          ),
        );
    } else {
      if (product.stock < newItem.quantity) throw new Error('Not enough stock');

      cart.items.push(newItem);

      await db.insert(cartItems).values({
        cartId: cart.id,
        productId: newItem.productId,
        name: newItem.name,
        slug: newItem.slug,
        image: newItem.image,
        price: newItem.price,
        quantity: newItem.quantity,
      });
    }

    const pricing = calculatePrice(cart.items);

    await db
      .update(carts)
      .set({
        itemsPrice: pricing.itemsPrice,
        shippingPrice: pricing.shippingPrice,
        taxPrice: pricing.taxPrice,
        totalPrice: pricing.totalPrice,
      })
      .where(eq(carts.id, cart.id));

    revalidatePath(`/product/${product.slug}`);

    return { status: 'success', message: `${product.name} added to cart` };
  }
}
