'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import {
  shippingAddressSchema,
  TShippingAddressSchema,
} from '@/lib/schemas/shipping-address';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const updateUserAddress = async (
  payload: TShippingAddressSchema,
): Promise<Result<void>> => {
  const session = await auth();
  if (!session?.user) return failure('Unauthorized');

  const userId = session.user.id;

  if (!userId) return failure('Unauthorized');

  const currentUser = await tryCatch(
    db.query.users.findFirst({
      where: eq(users.id, userId),
    }),
  );

  if (isFailure(currentUser)) return failure('User not found');

  const parsedAddress = shippingAddressSchema.parse(payload);

  const result = await tryCatch(
    db
      .update(users)
      .set({ address: parsedAddress })
      .where(eq(users.id, userId)),
  );

  if (isFailure(result)) return failure('Failed to update address');

  return ok(undefined);
};
