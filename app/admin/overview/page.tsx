import { AdminOverViewPage } from '@/components/admin/AdminOverviewPage';
import { getSummarizeOrdersByAdmin } from '@/lib/actions/admin/get-summarize-orders-by-admin';
import { paths } from '@/lib/constants/paths';
import { failure, isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

const OverviewPage = async () => {
  const result = await getSummarizeOrdersByAdmin();

  if (isFailure(result)) {
    console.error('Failed to fetch order summary:', result.error);
    redirect(paths.unauthorized);
  }

  return (
    <AdminOverViewPage
      totalCustomer={result.data.totalCustomer}
      totalProducts={result.data.totalProducts}
      totalRevenue={result.data.totalRevenue}
      totalSales={result.data.totalSales}
      recentOrders={result.data.recentOrders}
      monthlySales={result.data.monthlySales}
    />
  );
};

export default OverviewPage;
