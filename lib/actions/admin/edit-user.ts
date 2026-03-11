'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { editUserSchema, EditUserSchema } from '@/lib/schemas/edit-user';
import { Roles } from '@/lib/types/role';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const editUserById = async (args: {
  userId: string;
  data: EditUserSchema;
}): Promise<TryTuple<void>> => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return fail('Unauthorized');
  if (session?.user.role !== Roles.Admin) return fail('Forbidden');

  if (session.user.id === args.userId)
    return fail('You cannot edit yourself');

  const parsedData = editUserSchema.safeParse(args.data);

  if (!parsedData.success)
    return fail(parsedData.error.issues[0]?.message ?? 'Invalid payload');

  const [err] = await tryCatch(
    db
      .update(users)
      .set({
        name: args.data.name,
        role: args.data.role,
      })
      .where(eq(users.id, args.userId)),
  );

  if (err) return fail(err);

  revalidatePath(paths.admin.users.list);

  return ok(undefined);
};
