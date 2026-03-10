import { redirect } from 'next/navigation';
import UserProfileForm from '@/components/user/UserProfilePage';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';

const UserProfile = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    console.error('Unauthorized');
    redirect(paths.auth.login);
  }

  // TODO: it returns 'user not found' when role is admin. Fix it.
  const [err, userData] = await getUserById({ userId });
  if (err || !userData) {
    console.error(err);
    redirect(paths.auth.login);
  }

  return (
    <UserProfileForm
      email={userData?.email}
      name={userData.name}
      profileImageUrl={userData?.profileImageUrl}
    />
  );
};

export default UserProfile;
