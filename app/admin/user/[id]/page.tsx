import { EditUserForm } from '@/components/admin/EditUserForm';
import { getUserById } from '@/lib/actions/admin/get-user-by-id';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const AdminEditUserPage = async ({ params }: Props) => {
  const { id } = await params;

  const userResult = await getUserById({ userId: id });

  if (isFailure(userResult)) {
    console.error('Failed to fetch users:', userResult.error);
    redirect(paths.notFound);
  }

  return (
    <EditUserForm
      userId={userResult.data.id}
      email={userResult.data.email}
      name={userResult.data.name}
      role={userResult.data.role}
    />
  );
};

export default AdminEditUserPage;
