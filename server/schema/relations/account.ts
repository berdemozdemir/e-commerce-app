import { relations } from 'drizzle-orm';
import { accounts, users } from '../models/users';

export const accountRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));
