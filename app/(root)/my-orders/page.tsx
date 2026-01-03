import { MyOrdersPage } from '@/components/my-orders/MyOrdersPage';
import { getMyOrders } from '@/lib/actions/get-my-orders';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

// TOOD: create a skeleton for this page
export default async function MyOrders() {
  const result = await getMyOrders();

  if (isFailure(result)) {
    // TODO: Apply the same pattern to all instances and improve the styling of this error message throughout the application.
    console.error(result.error);
    return redirect(paths.home);
  }

  return <MyOrdersPage items={result.data} />;
}
