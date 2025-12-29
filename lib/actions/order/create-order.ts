'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result } from '@/lib/result';
import { getMyCart } from '../cart/get-my-cart.action';
import { getUserById } from '../user/get-user-by-id';
import { orderSchema } from '@/lib/schemas/order';
import { db } from '@/server/drizzle-client';
import { cartItems, carts, orderItems, orders } from '@/server';
import { TCartItem } from '@/lib/schemas/cart/cart-item.schema';
import { and, eq } from 'drizzle-orm';

export const createOrder = async (): Promise<Result<string>> => {
  const session = await auth();
  if (!session?.user) return failure('Unauthorized');

  const userId = session.user.id;
  if (!userId) return failure('Unauthorized');

  const user = await getUserById({ userId });
  if (isFailure(user)) return failure('Failed to retrieve user');

  const cart = await getMyCart();

  if (isFailure(cart) || !cart.data || cart.data?.items.length === 0)
    return failure('Failed to retrieve cart');

  if (!user.data.address) return failure('User address is required');

  if (!user.data.paymentMethod) return failure('Payment method is required');

  const order = orderSchema.parse({
    userId,
    shippingAddress: user.data.address,
    paymentMethod: user.data.paymentMethod,
    itemsPrice: cart.data.itemsPrice,
    taxPrice: cart.data.taxPrice,
    shippingPrice: cart.data.shippingPrice,
    totalPrice: cart.data.totalPrice,
  });

  // TODO: use trycatch wrapper for following db operations
  const [insertedOrder] = await db
    .insert(orders)
    .values({
      ...order,
    })
    .returning({ id: orders.id });

  for (const item of cart.data?.items as TCartItem[]) {
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
    .where(and(eq(carts.userId, userId), eq(carts.id, cart.data!.id)));

  await db.delete(cartItems).where(eq(cartItems.cartId, cart.data!.id));

  return ok(insertedOrder.id);
};
