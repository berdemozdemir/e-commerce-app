'use server';

import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { failure, tryCatch, isFailure, Result, ok } from '@/lib/result';
import { editUserSchema, EditUserSchema } from '@/lib/schemas/edit-user';
import { Roles } from '@/lib/types/role';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const editUserById = async (payload: {
  userId: string;
  data: EditUserSchema;
}): Promise<Result<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return failure('Unauthorized');
  if (session?.user.role !== Roles.Admin) return failure('Forbidden');

  if (session.user.id === payload.userId)
    return failure('You cannot edit yourself');

  const parsedData = editUserSchema.safeParse(payload.data);

  if (!parsedData.success)
    return failure(parsedData.error.issues[0]?.message ?? 'Invalid payload');

  const result = await tryCatch(
    db
      .update(users)
      .set({
        name: payload.data.name,
        role: payload.data.role,
      })
      .where(eq(users.id, payload.userId)),
  );

  if (isFailure(result)) return failure(result.error);

  revalidatePath(paths.admin.users.list);

  return ok(undefined);
};
