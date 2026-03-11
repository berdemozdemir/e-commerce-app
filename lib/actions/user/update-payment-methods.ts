'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import {
  paymentMethodsFormSchema,
  PaymentMethodsFormSchema,
} from '@/lib/schemas/payment-methods';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const updatePaymentMethods = async (
  payload: PaymentMethodsFormSchema,
): Promise<TryTuple<void>> => {
  const session = await auth();
  if (!session?.user) return fail('Unauthorized');

  const userId = session.user.id;
  if (!userId) return fail('Unauthorized');

  const [userErr] = await tryCatch(
    db.query.users.findFirst({
      where: eq(users.id, userId),
    }),
  );

  if (userErr) return fail('User not found');

  const { paymentMethod } = paymentMethodsFormSchema.parse(payload);

  const [err] = await tryCatch(
    db.update(users).set({ paymentMethod }).where(eq(users.id, userId)),
  );

  if (err) return fail('Failed to update payment methods');

  return ok(undefined);
};
