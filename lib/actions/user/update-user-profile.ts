'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import {
  TUpdateUserProfileSchema,
  updateUserProfileSchema,
} from '@/lib/schemas/update-user-profile';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const updateUserProfile = async (
  payload: TUpdateUserProfileSchema,
): Promise<TryTuple<void>> => {
  const session = await auth();
  if (!session?.user) return fail('Unauthorized');

  const userId = session.user.id;
  if (!userId) return fail('Unauthorized');

  const parsedPayload = updateUserProfileSchema.parse(payload);

  const [err] = await tryCatch(
    db
      .update(users)
      .set({
        name: parsedPayload.name,
        email: parsedPayload.email,
        profileImageUrl: parsedPayload.profileImageUrl,
      })
      .where(eq(users.id, userId)),
  );

  if (err) return fail(err);

  return ok(undefined);
};
