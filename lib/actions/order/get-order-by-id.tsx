'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TShippingAddressSchema } from '@/lib/schemas/shipping-address';
import { TOrder } from '@/lib/types/order';
import { orderItems, orders, users } from '@/server';
import { db } from '@/server/drizzle-client';
import { and, eq, sql } from 'drizzle-orm';

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

        userId: orders.userId,
        itemsPrice: orders.itemsPrice,
        taxPrice: orders.taxPrice,
        shippingPrice: orders.shippingPrice,
        totalPrice: orders.totalPrice,
        paymentMethod: orders.paymentMethod,
        shippingAddress: orders.shippingAddress,

        userName: users.name,
        userEmail: users.email,

        orderItems: sql<
          Array<{
            productId: string;
            name: string;
            slug: string;
            image: string;
            quantity: number;
            price: string;
          }>
        >`
              coalesce(
                  jsonb_agg(
                    jsonb_build_object(
                    'productId',${orderItems.productId},
                    'name',${orderItems.name},
                    'slug',${orderItems.slug},
                    'image',${orderItems.image},
                    'quantity',${orderItems.quantity},
                    'price',${orderItems.price}
                  ) order by ${orderItems.createdAt} asc
              ) filter (where ${orderItems.productId} is not null),
              '[]'::jsonb
              )
        `.as('orderItems'),
      })

      .from(orders)
      .where(eq(orders.id, payload.orderId))
      .innerJoin(users, eq(orders.userId, users.id))
      .leftJoin(orderItems, eq(orderItems.orderId, orders.id))
      .groupBy(orders.id, users.id),
  );

  if (isFailure(orderResponse)) return failure(orderResponse.error);

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
    orderItems: orderResult.orderItems,
  };

  return ok(result);
};
