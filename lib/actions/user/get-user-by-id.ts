import { auth } from '@/lib/auth';
import { failure, ok, Result, tryCatch } from '@/lib/result';
import { TUser } from '@/lib/types/user';
import { users } from '@/server';
import { db } from '@/server/drizzle-client';
import { eq } from 'drizzle-orm';

export const getUserById = async (payload: {
  userId: string;
}): Promise<Result<TUser>> => {
  const session = await auth();
  if (!session?.user) return failure('Unauthorized');

  if (session.user.id !== payload.userId) return failure('Forbidden');

  const userResponse = await tryCatch(
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

  if (!userResponse) return failure('User not found');
  if (!userResponse.data) return failure('User not found');
  if (userResponse.data.length === 0) return failure('User not found');

  const user: TUser = {
    id: userResponse.data[0].id,
    email: userResponse.data[0].email,
    name: userResponse.data[0].name,
    profileImageUrl: userResponse.data[0].profileImageUrl ?? undefined,
    address: userResponse.data[0].address
      ? {
          addressName: userResponse.data[0].address.addressName,
          address: userResponse.data[0].address.address,
          city: userResponse.data[0].address.city,
          postalCode: userResponse.data[0].address.postalCode,
          country: userResponse.data[0].address.country,
        }
      : undefined,

    paymentMethod: userResponse.data[0].paymentMethod || undefined,
  };

  return ok(user);
};
