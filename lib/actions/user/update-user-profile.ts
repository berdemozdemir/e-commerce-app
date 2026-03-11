'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import {
  UpdateUserProfileSchema,
  updateUserProfileSchema,
} from '@/lib/schemas/update-user-profile';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const updateUserProfile = async (
  payload: UpdateUserProfileSchema,
): Promise<TryTuple<void>> => {
  const session = await auth();
  if (!session?.user) return fail('Unauthorized');

  const userId = session.user.id;
  if (!userId) return fail('Unauthorized');

  const parsedPayload = updateUserProfileSchema.safeParse(payload);
  if (!parsedPayload.success)
    return fail(
      parsedPayload.error.issues[0]?.message ?? 'Invalid payload',
    );

  const [err] = await tryCatch(
    db
      .update(users)
      .set({
        name: parsedPayload.data.name,
        email: parsedPayload.data.email,
        profileImageUrl: parsedPayload.data.profileImageUrl,
      })
      .where(eq(users.id, userId)),
  );

  if (err) return fail(err);

  return ok(undefined);
};
