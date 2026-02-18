'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { TUser } from '@/lib/types/admin/user';
import { Role, TRole } from '@/lib/types/role';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getAllUsers = async (): Promise<Result<TUser[]>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Role.Admin) return failure('Forbidden');

  const result = await tryCatch(
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users),
  );

  if (isFailure(result)) return failure('Failed to fetch users');

  if (result.data.length === 0) return failure('No users found');

  const response: TUser[] = result.data.map((item) => ({
    id: item.id,
    email: item.email,
    name: item.name,
    role: item.role as TRole,
  }));

  return ok(response);
};
