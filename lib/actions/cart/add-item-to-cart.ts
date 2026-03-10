'use server';

import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import {
  cartItemSchema,
  cartSchema,
  TCartItem,
} from '../../schemas/cart/cart-item.schema';
import { auth } from '../../auth';
import { calculatePrice } from '../../utils';
import { getMyCart } from './get-my-cart.action';
import { db } from '@/server/drizzle-client';
import { cartItems, carts, products } from '@/server';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { paths } from '@/lib/constants/paths';

export async function addItemToCart(payload: TCartItem): Promise<TryTuple<void>> {
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return fail('Cart not found!');

  const session = await auth();

  const userId = session?.user?.id ? session.user.id : undefined;

  const newItem = cartItemSchema.parse(payload);

  const product = await db.query.products.findFirst({
    where: eq(products.id, newItem.productId),
  });

  if (!product) return fail('Product not found!');
  const [cartErr, cart] = await getMyCart();

  if (cartErr) return fail(cartErr);

  if (!cart) {
    if (product.stock < newItem.quantity) return fail('Not enough stock');

    // TODO: fix broken failure flow by schema parser | parse or safeparse ?
    const newCart = cartSchema.safeParse({
      id: randomUUID().toString(),
      userId,
      sessionCartId,
      items: [newItem],
      ...calculatePrice([newItem]),
    });

    if (!newCart.success) {
      return fail(newCart.error.issues[0]?.message ?? 'Invalid payload');
    }

    const [insertCartErr, insertedCartRows] = await tryCatch(
      db
        .insert(carts)
        .values({
          sessionCartId,
          userId,
          itemsPrice: newCart.data.itemsPrice,
          shippingPrice: newCart.data.shippingPrice,
          taxPrice: newCart.data.taxPrice,
          totalPrice: newCart.data.totalPrice,
        })
        .returning(),
    );

    if (insertCartErr) return fail(insertCartErr);

    const [insertItemErr] = await tryCatch(
      db
        .insert(cartItems)
        .values({
          cartId: insertedCartRows![0].id,
          productId: newItem.productId,
          name: newItem.name,
          slug: newItem.slug,
          image: newItem.image,
          price: newItem.price,
          quantity: newItem.quantity,
        })
        .returning(),
    );

    if (insertItemErr) return fail(insertItemErr);

    revalidatePath(paths.productDetail(product.slug));

    return ok(undefined);
  } else {
    const existItem = cart.items.find((item) => item.productId === product.id);

    if (existItem) {
      const newQuantity = existItem.quantity + 1;

      if (product.stock < newQuantity) return fail('Not enough stock');

      existItem.quantity = newQuantity;

      const [updateErr] = await tryCatch(
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

      if (updateErr) return fail(updateErr);
    } else {
      if (product.stock < newItem.quantity) return fail('Not enough stock');

      cart.items.push(newItem);

      const [insertItemErr2] = await tryCatch(
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

      if (insertItemErr2) return fail(insertItemErr2);
    }

    const pricing = calculatePrice(cart.items);

    const [updateCartErr] = await tryCatch(
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

    if (updateCartErr) return fail(updateCartErr);

    revalidatePath(paths.productDetail(product.slug));

    return ok(undefined);
  }
}
