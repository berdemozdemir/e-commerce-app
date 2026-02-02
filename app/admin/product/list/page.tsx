import { AdminProductListPage } from '@/components/admin/AdminProductList';
import { getProducts } from '@/lib/actions/admin/get-products';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin Products',
};

const AdminProductList = async () => {
  const productsResult = await getProducts();

  if (isFailure(productsResult)) {
    console.error('Failed to fetch order summary:', productsResult.error);
    redirect(paths.unauthorized);
  }

  return <AdminProductListPage products={productsResult.data} />;
};

export default AdminProductList;
