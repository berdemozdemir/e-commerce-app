'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import {
  TUpdateUserProfileSchema,
  updateUserProfileSchema,
} from '@/lib/schemas/update-user-profile';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const updateUserProfile = async (
  payload: TUpdateUserProfileSchema,
): Promise<Result<void>> => {
  const session = await auth();
  if (!session?.user) return failure('Unauthorized');

  const userId = session.user.id;
  if (!userId) return failure('Unauthorized');

  const parsedPayload = updateUserProfileSchema.parse(payload);

  const result = await tryCatch(
    db
      .update(users)
      .set({
        name: parsedPayload.name,
        email: parsedPayload.email,
      })
      .where(eq(users.id, userId)),
  );

  if (isFailure(result)) return failure(result.error);

  return ok(undefined);
};
