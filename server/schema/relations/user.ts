import { relations } from 'drizzle-orm';
import { accounts, users } from '../models/user';

export const userRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));
