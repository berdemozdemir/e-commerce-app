import { AdminProductListPage } from '@/components/admin/AdminProductList';
import { getProducts } from '@/lib/actions/admin/get-products';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { Roles } from '@/lib/types/role';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Products',
};

type Props = {
  searchParams: Promise<{
    query?: string;
  }>;
};

const AdminProductList = async ({ searchParams }: Props) => {
  const { query } = await searchParams;

  const session = await auth();

  if (!session?.user) redirect(paths.auth.login);

  if (session.user.role !== Roles.Admin) redirect(paths.unauthorized);

  const productsResult = await getProducts({ query });

  if (isFailure(productsResult)) redirect(paths.unauthorized);

  return <AdminProductListPage products={productsResult.data} />;
};

export default AdminProductList;
