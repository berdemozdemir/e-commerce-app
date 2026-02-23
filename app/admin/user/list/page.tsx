import { UsersList } from '@/components/admin/UsersList';
import { getAllUsers } from '@/lib/actions/admin/get-all-users';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { Roles } from '@/lib/types/role';
import { redirect } from 'next/dist/client/components/navigation';

export const metadata = {
  title: 'Admin - Users',
  description: 'Manage users in the admin panel.',
};

type Props = {
  searchParams: Promise<{
    query: string;
  }>;
};

const AdminUsersList = async ({ searchParams }: Props) => {
  const { query } = await searchParams;

  const session = await auth();

  if (!session?.user) redirect(paths.auth.login);

  if (session.user.role !== Roles.Admin) redirect(paths.unauthorized);

  const allUsers = await getAllUsers({ query });

  if (isFailure(allUsers)) {
    console.error('Failed to fetch users:', allUsers.error);
    redirect(paths.notFound);
  }

  return <UsersList users={allUsers.data} query={query} />;
};

export default AdminUsersList;
