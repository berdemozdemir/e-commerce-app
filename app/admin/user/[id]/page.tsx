import { redirect } from 'next/navigation';
import { EditUserForm } from '@/components/admin/EditUserForm';
import { getUserById } from '@/lib/actions/admin/get-user-by-id';
import { paths } from '@/lib/constants/paths';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const AdminEditUserPage = async ({ params }: Props) => {
  const { id } = await params;

  const [err, user] = await getUserById({ userId: id });

  if (err || !user) {
    console.error('Failed to fetch users:', err);
    redirect(paths.notFound);
  }

  return (
    <EditUserForm
      userId={user.id}
      email={user.email}
      name={user.name}
      role={user.role}
    />
  );
};

export default AdminEditUserPage;
