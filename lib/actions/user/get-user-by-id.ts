import { eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import { fail, ok, tryCatch, TryTuple } from '@/lib/result';
import { TUser } from '@/lib/types/user';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';

export const getUserById = async (payload: {
  userId: string;
}): Promise<TryTuple<TUser>> => {
  const session = await auth();
  if (!session?.user) return fail('Unauthorized');

  if (session.user.id !== payload.userId) return fail('Forbidden');

  const [err, rows] = await tryCatch(
    db
      .select({
        id: users.id,
        email: users.email,
        name: users.name,
        profileImageUrl: users.profileImageUrl,
        address: users.address,
        paymentMethod: users.paymentMethod,
      })
      .from(users)
      .where(eq(users.id, payload.userId)),
  );

  if (err) return fail(err);
  if (!rows?.length) return fail('User not found');

  const row = rows[0];
  const user: TUser = {
    id: row.id,
    email: row.email,
    name: row.name,
    profileImageUrl: row.profileImageUrl ?? undefined,
    address: row.address
      ? {
          addressName: row.address.addressName,
          address: row.address.address,
          city: row.address.city,
          postalCode: row.address.postalCode,
          country: row.address.country,
        }
      : undefined,

    paymentMethod: row.paymentMethod || undefined,
  };

  return ok(user);
};
