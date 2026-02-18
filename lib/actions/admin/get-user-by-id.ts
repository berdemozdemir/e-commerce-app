import { auth } from '@/lib/auth';
import { failure, ok, Result, tryCatch } from '@/lib/result';
import { Roles, TRole } from '@/lib/types/role';
import { TEditableUser, TUser } from '@/lib/types/user';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const getUserById = async (payload: {
  userId: string;
}): Promise<Result<TEditableUser>> => {
  const session = await auth();
  if (!session?.user) return failure('Unauthorized');

  if (session.user.role !== Roles.Admin) return failure('Forbidden');

  const userResponse = await tryCatch(
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, payload.userId)),
  );

  if (!userResponse.data || userResponse.data.length === 0)
    return failure('User not found');

  const currentUser = userResponse.data[0];

  const user: TEditableUser = {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name,
    role: currentUser.role as TRole,
  };

  return ok(user);
};
