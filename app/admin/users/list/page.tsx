import { redirect } from 'next/navigation';
import { UsersList } from '@/components/admin/UsersList';
import { getAllUsers } from '@/lib/actions/admin/get-all-users';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { Roles } from '@/lib/types/role';

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

  const [err, users] = await getAllUsers({ query });

  if (err) {
    console.error('Failed to fetch users:', err);
    redirect(paths.notFound);
  }

  return <UsersList users={users ?? []} query={query} />;
};

export default AdminUsersList;
