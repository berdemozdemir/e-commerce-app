'use server';

import { ilike } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { TUser } from '@/lib/types/admin/user';
import { Roles, TRole } from '@/lib/types/role';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getAllUsers = async (args: {
  query?: string;
}): Promise<TryTuple<TUser[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  const whereClause = args.query
    ? ilike(users.email || users.name, `%${args.query}%`)
    : undefined;

  const [err, rows] = await tryCatch(
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users)
      .where(whereClause),
  );

  if (err || !rows) return fail('Failed to fetch users');

  const response: TUser[] = rows.map((item) => ({
    id: item.id,
    email: item.email,
    name: item.name,
    role: item.role as TRole,
  }));

  return ok(response);
};
