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
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';

export async function addItemToCart(payload: TCartItem): Promise<Result<void>> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return failure('Cart not found!');

  const session = await auth();

  const userId = session?.user?.id ? session.user.id : undefined;

  const newItem = cartItemSchema.parse(payload);

  const product = await db.query.products.findFirst({
    where: eq(products.id, newItem.productId),
  });

  if (!product) return failure('Product not found!');
  const cart = await getMyCart();

  if (!cart) {
    if (product.stock < newItem.quantity) return failure('Not enough stock');

    const newCart = cartSchema.parse({
      userId,
      sessionCartId,
      items: [newItem],
      ...calculatePrice([newItem]),
    });

    const insertedCart = await tryCatch(
      db
        .insert(carts)
        .values({
          sessionCartId,
          userId,
          itemsPrice: newCart.itemsPrice,
          shippingPrice: newCart.shippingPrice,
          taxPrice: newCart.taxPrice,
          totalPrice: newCart.totalPrice,
        })
        .returning(),
    );

    if (isFailure(insertedCart)) {
      return failure(insertedCart.error);
    }

    const insertedCartItem = await tryCatch(
      db
        .insert(cartItems)
        .values({
          cartId: insertedCart.data[0].id,
          productId: newItem.productId,
          name: newItem.name,
          slug: newItem.slug,
          image: newItem.image,
          price: newItem.price,
          quantity: newItem.quantity,
        })
        .returning(),
    );

    if (isFailure(insertedCartItem)) {
      return failure(insertedCartItem.error);
    }

    revalidatePath(`/product/${product.slug}`);

    return ok(undefined);
  } else {
    const existItem = cart.items.find((item) => item.productId === product.id);

    if (existItem) {
      const newQuantity = existItem.quantity + 1;

      if (product.stock < newQuantity) return failure('Not enough stock');

      existItem.quantity = newQuantity;

      const updateResult = await tryCatch(
        db
          .update(cartItems)
          .set({ quantity: newQuantity })
          .where(
            and(
              eq(cartItems.cartId, cart.id),
              eq(cartItems.productId, product.id),
            ),
          )
          .returning(),
      );

      if (isFailure(updateResult)) {
        return failure(updateResult.error);
      }
    } else {
      if (product.stock < newItem.quantity) return failure('Not enough stock');

      cart.items.push(newItem);

      const insertedCartItem = await tryCatch(
        db.insert(cartItems).values({
          cartId: cart.id,
          productId: newItem.productId,
          name: newItem.name,
          slug: newItem.slug,
          image: newItem.image,
          price: newItem.price,
          quantity: newItem.quantity,
        }),
      );

      if (isFailure(insertedCartItem)) {
        return failure(insertedCartItem.error);
      }
    }

    const pricing = calculatePrice(cart.items);

    const updateResult = await tryCatch(
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

    if (isFailure(updateResult)) {
      return failure(updateResult.error);
    }

    revalidatePath(`/product/${product.slug}`);

    return ok(undefined);
  }
}
