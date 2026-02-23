'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TUser } from '@/lib/types/admin/user';
import { Roles, TRole } from '@/lib/types/role';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { ilike } from 'drizzle-orm';

export const getAllUsers = async (args: {
  query?: string;
}): Promise<Result<TUser[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  const whereClause = args.query
    ? ilike(users.email || users.name, `%${args.query}%`)
    : undefined;

  const result = await tryCatch(
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

  if (isFailure(result)) return failure('Failed to fetch users');

  const response: TUser[] = result.data.map((item) => ({
    id: item.id,
    email: item.email,
    name: item.name,
    role: item.role as TRole,
  }));

  return ok(response);
};
