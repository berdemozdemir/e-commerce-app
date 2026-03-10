import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { Roles, TRole } from '@/lib/types/role';
import { TEditableUser } from '@/lib/types/user';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getUserById = async (payload: {
  userId: string;
}): Promise<TryTuple<TEditableUser>> => {
  const session = await auth();
  if (!session?.user) return fail('Unauthorized');

  if (session.user.role !== Roles.Admin) return fail('Forbidden');

  const [err, rows] = await tryCatch(
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

  if (err) return fail(err);
  if (!rows?.length) return fail('User not found');

  const currentUser = rows[0];

  const user: TEditableUser = {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name,
    role: currentUser.role as TRole,
  };

  return ok(user);
};
