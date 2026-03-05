import { relations } from 'drizzle-orm';
import { users } from '../models/users';
import { products } from '../models/products';
import { ratings } from '../models/ratings';

export const ratingRelations = relations(ratings, ({ one }) => ({
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
  product: one(products, {
    fields: [ratings.productId],
    references: [products.id],
  }),
}));
