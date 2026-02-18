import UserProfileForm from '@/components/user/UserProfilePage';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

const UserProfile = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    console.error('Unauthorized');
    redirect(paths.auth.login);
  }

  // TODO: it returns 'user not found' when role is admin. Fix it.
  const user = await getUserById({ userId });
  if (isFailure(user)) {
    console.error(user.error);
    redirect(paths.auth.login);
  }

  return (
    <UserProfileForm
      email={user.data?.email}
      name={user.data.name}
      profileImageUrl={user.data?.profileImageUrl}
    />
  );
};

export default UserProfile;
