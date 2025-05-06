import { relations } from 'drizzle-orm';
import { cartItems, carts, users } from '../models';

export const cartRelations = relations(carts, ({ one, many }) => ({
  cartItems: many(cartItems),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

export const cartItemRelations = relations(cartItems, ({ one }) => ({
  cart: one(carts, {
    fields: [cartItems.cartId],
    references: [carts.id],
  }),
}));
