import UserProfilePage from '@/components/user/UserProfilePage';
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

  const user = await getUserById({ userId });
  if (isFailure(user)) {
    console.error('Unauthorized');
    redirect(paths.auth.login);
  }

  return <UserProfilePage email={user.data?.email} name={user.data.name} />;
};

export default UserProfile;
