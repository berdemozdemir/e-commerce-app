import { AdminOrdersPage } from '@/components/admin/AdminOrdersPage';
import { getOrdersByAdmin } from '@/lib/actions/admin/get-orders';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

const OrdersPage = async () => {
  const result = await getOrdersByAdmin();

  if (isFailure(result)) {
    console.error('Failed to fetch orders:', result.error);
    redirect(paths.unauthorized);
  }

  return <AdminOrdersPage orders={result.data} />;
};

export default OrdersPage;
