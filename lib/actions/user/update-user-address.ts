'use server';

import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import {
  shippingAddressSchema,
  ShippingAddressSchema,
} from '@/lib/schemas/shipping-address';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const updateUserAddress = async (
  payload: ShippingAddressSchema,
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

  const parsedAddress = shippingAddressSchema.parse(payload);

  const [err] = await tryCatch(
    db
      .update(users)
      .set({ address: parsedAddress })
      .where(eq(users.id, userId)),
  );

  if (err) return fail('Failed to update address');

  return ok(undefined);
};
