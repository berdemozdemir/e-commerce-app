import { redirect } from 'next/navigation';
import { AdminOverViewPage } from '@/components/admin/AdminOverviewPage';
import { getSummarizeOrdersByAdmin } from '@/lib/actions/admin/get-summarize-orders-by-admin';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { Roles } from '@/lib/types/role';

const OverviewPage = async () => {
  const session = await auth();

  if (!session?.user) redirect(paths.auth.login);

  if (session.user.role !== Roles.Admin) redirect(paths.unauthorized);

  const [err, data] = await getSummarizeOrdersByAdmin();

  if (err || !data) {
    console.error('Failed to fetch order summary:', err);
    redirect(paths.unauthorized);
  }

  return (
    <AdminOverViewPage
      totalCustomer={data.totalCustomer}
      totalProducts={data.totalProducts}
      totalRevenue={data.totalRevenue}
      totalSales={data.totalSales}
      recentOrders={data.recentOrders}
      monthlySales={data.monthlySales}
    />
  );
};

export default OverviewPage;
