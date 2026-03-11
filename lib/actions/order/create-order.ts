'use server';

import { and, eq } from 'drizzle-orm';
import { getMyCart } from '../cart/get-my-cart.action';
import { getUserById } from '../user/get-user-by-id';
import { auth } from '@/lib/auth';
import { fail, ok, TryTuple } from '@/lib/result';
import { orderSchema } from '@/lib/schemas/order';
import { db } from '@/server/drizzle-client';
import { cartItems, carts, orderItems, orders } from '@/server';
import { TCartItem } from '@/lib/types/cart';

// TODO: products stock should be decreased when an order is created or paid
export const createOrder = async (): Promise<TryTuple<string>> => {
  const session = await auth();
  if (!session?.user) return fail('Unauthorized');

  const userId = session.user.id;
  if (!userId) return fail('Unauthorized');

  const [userErr, userData] = await getUserById({ userId });
  if (userErr || !userData) return fail('Failed to retrieve user');

  const [cartErr, cartData] = await getMyCart();

  if (cartErr || !cartData?.items?.length) return fail('Failed to retrieve cart');

  if (!userData.address) return fail('User address is required');

  if (!userData.paymentMethod) return fail('Payment method is required');

  const order = orderSchema.parse({
    userId,
    shippingAddress: userData.address,
    paymentMethod: userData.paymentMethod,
    itemsPrice: cartData.itemsPrice,
    taxPrice: cartData.taxPrice,
    shippingPrice: cartData.shippingPrice,
    totalPrice: cartData.totalPrice,
  });

  // TODO: use trycatch wrapper for following db operations
  const [insertedOrder] = await db
    .insert(orders)
    .values({
      ...order,
    })
    .returning({ id: orders.id });

  for (const item of cartData.items as TCartItem[]) {
    await db.insert(orderItems).values({
      orderId: insertedOrder.id,
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    });
  }

  await db
    .update(carts)
    .set({
      itemsPrice: '0.00',
      taxPrice: '0.00',
      shippingPrice: '0.00',
      totalPrice: '0.00',
    })
    .where(and(eq(carts.userId, userId), eq(carts.id, cartData.id)));

  await db.delete(cartItems).where(eq(cartItems.cartId, cartData.id));

  return ok(insertedOrder.id);
};
