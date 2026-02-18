'use server';

import { auth } from '@/lib/auth';
import { Roles } from '@/lib/types/role';
import { paths } from '@/lib/constants/paths';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import { products, users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const deleteUserById = async (payload: {
  userId: string;
}): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');
  if (session.user.id === payload.userId)
    return failure('You cannot delete yourself');

  const result = await tryCatch(
    db.delete(users).where(eq(users.id, payload.userId)),
  );

  if (isFailure(result)) return failure(result.error);

  revalidatePath(paths.admin.users.list);

  return ok(undefined);
};
