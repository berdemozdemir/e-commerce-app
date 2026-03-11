'use server';

import { eq, sql } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { ShippingAddressSchema } from '@/lib/schemas/shipping-address';
import { Order } from '@/lib/types/order';
import { orderItems, orders, users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getOrderById = async (payload: {
  orderId: string;
}): Promise<TryTuple<Order>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');

  const [orderErr, orderRows] = await tryCatch(
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

  if (orderErr) return fail(orderErr);

  const orderResult = orderRows?.[0];
  if (!orderResult) return fail('Order could not be found!');

  const result: Order = {
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
    shippingAddress: orderResult.shippingAddress as ShippingAddressSchema,
    orderItems: orderResult.orderItems,
  };

  return ok(result);
};
