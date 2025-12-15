import {
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users';
import { products } from './products';

export const cartItems = pgTable('cart_items', {
  // TODO: this id column may not be necessary with composite primary key
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  productId: uuid('product_id')
    .references(() => products.id, {
      onDelete: 'cascade',
    })
    .notNull(),

  cartId: uuid('carts_id').references(() => carts.id, {
    onDelete: 'cascade',
  }),

  name: text('name').notNull(),
  slug: text('slug').notNull(),
  image: text('image').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  quantity: integer('quantity').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const carts = pgTable('carts', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  sessionCartId: uuid('session_cart_id').notNull(),

  itemsPrice: decimal('items_price', { precision: 10, scale: 2 }).notNull(),
  taxPrice: decimal('tax_price', { precision: 10, scale: 2 }).notNull(),
  shippingPrice: decimal('shipping_price', {
    precision: 10,
    scale: 2,
  }).notNull(),
  totalPrice: decimal('total_price', { precision: 10, scale: 2 }).notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
