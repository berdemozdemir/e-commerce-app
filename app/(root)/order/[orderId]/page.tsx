import { redirect } from 'next/navigation';
import { OrderDetailPage } from '@/components/order-detail/OrderDetailPage';
import { getOrderById } from '@/lib/actions/order/get-order-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { Roles } from '@/lib/types/role';

type OrderDetailProps = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Order Details',
  };
}

export default async function OrderDetail(props: OrderDetailProps) {
  const orderId = (await props.params).orderId;

  const session = await auth();

  const [err, order] = await getOrderById({ orderId });
  if (err || !order) {
    // TODO: Apply the same pattern to all instances and improve the styling of this error message throughout the application.
    console.error(err);
    return redirect(paths.notFound);
  }

  return (
    <OrderDetailPage
      order={order}
      isAdmin={session?.user.role === Roles.Admin}
    />
  );
}
