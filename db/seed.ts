import 'dotenv/config';
import {
  accounts,
  orderItems,
  orders,
  products,
  sessions,
  users,
  verificationTokens,
} from '../server';
import { db } from '../server/drizzle-client';
import sampleData from './sample-data';

const SHIPPING_RATE = 10;
const TAX_RATE = 0.15;

function calcOrderPrices(items: { price: number; quantity: number }[]) {
  const itemsPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const taxPrice = +(itemsPrice * TAX_RATE).toFixed(2);
  const shippingPrice = itemsPrice > 100 ? 0 : SHIPPING_RATE;
  const totalPrice = +(itemsPrice + taxPrice + shippingPrice).toFixed(2);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
}

export async function seed() {
  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(products);
  await db.delete(accounts);
  await db.delete(sessions);
  await db.delete(verificationTokens);
  await db.delete(users);

  const insertedUsers = await db
    .insert(users)
    .values(sampleData.users)
    .returning({ id: users.id, email: users.email });
  console.log(`Seeded ${insertedUsers.length} users ✅`);

  const fixedProducts = sampleData.products.map((p) => ({
    ...p,
    price: p.price.toString(),
    rating: p.rating.toString(),
  }));
  const insertedProducts = await db
    .insert(products)
    .values(fixedProducts)
    .returning({
      id: products.id,
      slug: products.slug,
      name: products.name,
      price: products.price,
      images: products.images,
    });
  console.log(`Seeded ${insertedProducts.length} products ✅`);

  const userByEmail = new Map(insertedUsers.map((u) => [u.email, u.id]));
  const productBySlug = new Map(
    insertedProducts.map((p) => [
      p.slug,
      { id: p.id, name: p.name, price: p.price, image: p.images[0] },
    ]),
  );

  let orderCount = 0;
  let itemCount = 0;

  for (const o of sampleData.orders) {
    const userId = userByEmail.get(o.userEmail);
    if (!userId) {
      console.warn(`Skipping order – user ${o.userEmail} not found`);
      continue;
    }

    const resolvedItems = o.items.map((item) => {
      const product = productBySlug.get(item.productSlug);
      if (!product) throw new Error(`Product not found: ${item.productSlug}`);
      return {
        ...product,
        quantity: item.quantity,
        price: Number(product.price),
      };
    });

    const prices = calcOrderPrices(resolvedItems);

    const [insertedOrder] = await db
      .insert(orders)
      .values({
        userId,
        shippingAddress: o.shippingAddress,
        paymentMethod: o.paymentMethod,
        isPaid: o.isPaid,
        paidAt: o.paidAt ?? null,
        isDelivered: o.isDelivered,
        deliveredAt: o.deliveredAt ?? null,
        createdAt: o.createdAt,
        ...prices,
      })
      .returning({ id: orders.id });

    const orderItemValues = resolvedItems.map((ri) => ({
      orderId: insertedOrder.id,
      productId: ri.id,
      name: ri.name,
      slug: o.items.find((i) => productBySlug.get(i.productSlug)?.id === ri.id)!
        .productSlug,
      quantity: ri.quantity,
      price: ri.price.toFixed(2),
      image: ri.image,
    }));

    await db.insert(orderItems).values(orderItemValues);
    orderCount++;
    itemCount += orderItemValues.length;
  }

  console.log(
    `Seeded ${orderCount} orders with ${itemCount} order items ✅`,
  );
}

seed()
  .then(() => {
    console.log('Seeding completed successfully ✅');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
    console.error('Error seeding data ❌');
  });
