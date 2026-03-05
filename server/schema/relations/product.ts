import { relations } from 'drizzle-orm';
import { cartItems, orderItems, products } from '../models';
import { ratings } from '../models/ratings';

export const productRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
  orderItems: many(orderItems),
  ratings: many(ratings),
}));
