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
  args: PaymentMethodsFormSchema,
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

  const parsedPayload = paymentMethodsFormSchema.safeParse(args);
  if (!parsedPayload.success)
    return fail(
      parsedPayload.error.issues[0]?.message ?? 'Invalid payload',
    );

  const [err] = await tryCatch(
    db
      .update(users)
      .set({ paymentMethod: parsedPayload.data.paymentMethod })
      .where(eq(users.id, userId)),
  );

  if (err) return fail('Failed to update payment methods');

  return ok(undefined);
};
