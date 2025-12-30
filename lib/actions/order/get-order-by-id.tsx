'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TShippingAddressSchema } from '@/lib/schemas/shipping-address';
import { TOrder } from '@/lib/types/order';
import { orderItems, orders, users } from '@/server';
import { db } from '@/server/drizzle-client';
import { and, eq } from 'drizzle-orm';

export const getOrderById = async (payload: {
  orderId: string;
}): Promise<Result<TOrder>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');

  const orderResponse = await tryCatch(
    db
      .select({
        id: orders.id,
        createdAt: orders.createdAt,
        isPaid: orders.isPaid,
        paidAt: orders.paidAt,
        isDelivered: orders.isDelivered,
        deliveredAt: orders.deliveredAt,

        userId: orders.id,
        itemsPrice: orders.itemsPrice,
        taxPrice: orders.taxPrice,
        shippingPrice: orders.shippingPrice,
        totalPrice: orders.totalPrice,
        paymentMethod: orders.paymentMethod,
        shippingAddress: orders.shippingAddress,

        userName: users.name,
        userEmail: users.email,
      })

      .from(orders)
      .where(and(eq(orders.id, payload.orderId), eq(orders.userId, userId)))
      .innerJoin(users, eq(orders.userId, users.id))
      .limit(1),
  );

  if (isFailure(orderResponse)) return failure(orderResponse.error);

  const orderItemsResponse = await tryCatch(
    db
      .select({
        productId: orderItems.productId,
        name: orderItems.name,
        slug: orderItems.slug,
        quantity: orderItems.quantity,
        price: orderItems.price,
        image: orderItems.image,
      })
      .from(orderItems)
      .where(eq(orderItems.orderId, payload.orderId)),
  );

  if (isFailure(orderItemsResponse)) return failure(orderItemsResponse.error);

  const orderResult = orderResponse.data[0];
  if (!orderResult) return failure('Order could not be found!');

  const result: TOrder = {
    id: orderResult.id,
    userId,
    createdAt: orderResult.createdAt,
    isPaid: orderResult.isPaid,
    paidAt: orderResult.paidAt ?? undefined,
    isDelivered: orderResult.isDelivered,
    deliveredAt: orderResult.deliveredAt ?? undefined,
    user: {
      email: orderResult.userEmail,
      name: orderResult.userName,
    },
    itemsPrice: orderResult.itemsPrice,
    taxPrice: orderResult.taxPrice,
    shippingPrice: orderResult.shippingPrice,
    totalPrice: orderResult.totalPrice,
    paymentMethod: orderResult.paymentMethod,
    shippingAddress: orderResult.shippingAddress as TShippingAddressSchema,

    orderItems: orderItemsResponse.data.map((item) => ({
      productId: item.productId,
      name: item.name,
      slug: item.slug,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    })),
  };

  return ok(result);
};
