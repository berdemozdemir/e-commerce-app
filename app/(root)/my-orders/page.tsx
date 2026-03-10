import { redirect } from 'next/navigation';
import { MyOrdersPage } from '@/components/my-orders/MyOrdersPage';
import { getMyOrders } from '@/lib/actions/get-my-orders';
import { paths } from '@/lib/constants/paths';

// TOOD: create a skeleton for this page
export default async function MyOrders() {
  const [err, items] = await getMyOrders();

  if (err) {
    // TODO: Apply the same pattern to all instances and improve the styling of this error message throughout the application.
    console.error(err);
    return redirect(paths.home);
  }

  return <MyOrdersPage items={items ?? []} />;
}
