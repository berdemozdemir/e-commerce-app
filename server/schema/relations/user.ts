import { relations } from 'drizzle-orm';
import { accounts, users } from '../models/users';
import { orders } from '../models/orders';
import { carts } from '../models';

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  carts: many(carts),
  orders: many(orders),
}));
