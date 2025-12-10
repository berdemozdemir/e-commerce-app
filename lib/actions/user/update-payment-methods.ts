'use server';

import { auth } from '@/lib/auth';
import { failure, isFailure, ok, Result, tryCatch } from '@/lib/result';
import {
  paymentMethodsSchema,
  TPaymentMethodsSchema,
} from '@/lib/schemas/payment-methods';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const updatePaymentMethods = async (
  payload: TPaymentMethodsSchema,
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

  const { paymentMethod } = paymentMethodsSchema.parse(payload);

  const result = await tryCatch(
    db.update(users).set({ paymentMethod }).where(eq(users.id, userId)),
  );

  if (isFailure(result)) return failure('Failed to update payment methods');

  return ok(undefined);
};
