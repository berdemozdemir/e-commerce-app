import { auth } from '@/lib/auth';
import { failure, ok, Result } from '@/lib/result';
import { TUser } from '@/lib/types/user';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const getUserById = async (payload: {
  userId: string;
}): Promise<Result<TUser>> => {
  const session = await auth();
  if (!session?.user) return failure('Unauthorized');

  if (session.user.id !== payload.userId) {
    return failure('Forbidden');
  }

  const currentUser = await db.query.users.findFirst({
    where: eq(users.id, payload.userId),
  });

  if (!currentUser) {
    return failure('User not found');
  }

  const user: TUser = {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name,
    address: currentUser.address
      ? {
          addressName: currentUser.address.addressName,
          address: currentUser.address.address,
          city: currentUser.address.city,
          postalCode: currentUser.address.postalCode,
          country: currentUser.address.country,
        }
      : undefined,
    image: currentUser.image || undefined,
    paymentMethod: currentUser.paymentMethod || undefined,
  };

  return ok(user);
};
