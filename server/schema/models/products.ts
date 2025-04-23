import {
  pgTable,
  decimal,
  integer,
  boolean,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

export const products = pgTable('products', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  category: text('category').notNull(),
  images: text('images').array().notNull(),
  brand: text('brand').notNull(),
  description: text('description').notNull(),
  stock: integer('stock').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  rating: decimal('rating', { precision: 4, scale: 2 }).default('0'),
  numReviews: integer('num_reviews').default(0),
  isFeatured: boolean('is_featured').default(false).notNull(),
  banner: text('banner'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
