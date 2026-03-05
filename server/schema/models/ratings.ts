import { products } from './products';
import { users } from './users';
import { pgTable, uuid, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const ratings = pgTable('ratings', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  productId: uuid('product_id')
    .references(() => products.id, { onDelete: 'cascade' })
    .notNull(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
