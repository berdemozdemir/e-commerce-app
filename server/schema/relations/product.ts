import { relations } from 'drizzle-orm';
import { cartItems, orderItems, products } from '../models';

export const productRelations = relations(products, ({ many }) => ({
  cartItems: many(cartItems),
  orderItems: many(orderItems),
}));
