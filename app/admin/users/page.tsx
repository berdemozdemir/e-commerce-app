import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { redirect } from 'next/dist/client/components/navigation';

export const metadata = {
  title: 'Admin - Users',
  description: 'Manage users in the admin panel.',
};

const AdminUsersPage = async () => {
  const session = await auth();

  if (!session?.user) redirect(paths.auth.login);

  if (session.user.role !== 'admin') redirect(paths.unauthorized);

  return <div>Admin Users Page</div>;
};

export default AdminUsersPage;
