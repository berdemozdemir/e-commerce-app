import { AdminOrdersPage } from '@/components/admin/AdminOrdersPage';
import { getOrdersByAdmin } from '@/lib/actions/admin/get-orders';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

const OrdersPage = async () => {
  const session = await auth();

  if (!session?.user) redirect(paths.auth.login);

  if (session.user.role !== 'admin') redirect(paths.unauthorized);

  const result = await getOrdersByAdmin();

  if (isFailure(result)) {
    console.error('Failed to fetch orders:', result.error);
    redirect(paths.unauthorized);
  }

  return <AdminOrdersPage orders={result.data} />;
};

export default OrdersPage;

/**
 TODO: for app/error.tsx 
 * Check out the below links for Next.js error handling and the extra digest property
 * @see https://nextjs.org/docs/app/building-your-application/routing/error-handling
 * @see https://www.linkedin.com/pulse/lessons-from-open-source-algorithm-used-compute-nextjs-ramu-narasinga-g6q2e#:~:text=This%20is%20what%20Next.,in%20server%2Dside%20logs%E2%80%9D.
 */
