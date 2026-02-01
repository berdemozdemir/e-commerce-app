import {
  boolean,
  decimal,
  index,
  integer,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { paymentMethodsEnum, users } from './users';
import { products } from './products';

export const orders = pgTable('orders', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  shippingAddress: jsonb('shipping_address').notNull(),
  paymentMethod: paymentMethodsEnum('payment_method').notNull(),
  paymentResult: jsonb('payment_result'),
  itemsPrice: decimal('items_price', { precision: 10, scale: 2 }).notNull(),
  taxPrice: decimal('tax_price', { precision: 10, scale: 2 }).notNull(),
  shippingPrice: decimal('shipping_price', {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),
  isPaid: boolean('is_paid').default(false).notNull(),
  paidAt: timestamp('paid_at'),
  isDelivered: boolean('is_delivered').default(false).notNull(),
  deliveredAt: timestamp('delivered_at'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  //   TODO: create a trigger to update updatedAt on row update
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const orderItems = pgTable(
  'order_items',
  {
    orderId: uuid('order_id')
      .references(() => orders.id, { onDelete: 'cascade' })
      .notNull(),
    productId: uuid('product_id')
      .references(() => products.id, { onDelete: 'cascade' })
      .notNull(),

    name: text('name').notNull(),
    slug: text('slug').notNull(),
    quantity: integer('quantity').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    image: text('image').notNull(),

    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
  },
  (table) => [
    primaryKey({
      columns: [table.orderId, table.productId],
    }),
    index().on(table.orderId),
    index().on(table.productId),
  ],
);
