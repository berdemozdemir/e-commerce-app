import { relations } from 'drizzle-orm';
import { accounts, users } from '../models/users';

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  carts: many(accounts),
}));
