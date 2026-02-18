import { CreateProductForm } from '@/components/admin/CreateProductForm';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { Roles } from '@/lib/types/role';
import { redirect } from 'next/navigation';

const AdminProductCreatePage = async () => {
  const session = await auth();

  if (!session?.user) redirect(paths.auth.login);

  if (session.user.role !== Roles.Admin) redirect(paths.unauthorized);

  return <CreateProductForm />;
};

export default AdminProductCreatePage;
