'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const deleteUserById = async (payload: {
  userId: string;
}): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');
  if (session.user.id === payload.userId)
    return fail('You cannot delete yourself');

  const [err] = await tryCatch(
    db.delete(users).where(eq(users.id, payload.userId)),
  );

  if (err) return fail(err);

  revalidatePath(paths.admin.users.list);

  return ok(undefined);
};
