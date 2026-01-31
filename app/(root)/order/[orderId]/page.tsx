import { OrderDetailPage } from '@/components/order-detail/OrderDetailPage';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getOrderById } from '@/lib/actions/order/get-order-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

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

  const result = await getOrderById({ orderId });
  if (isFailure(result)) {
    // TODO: Apply the same pattern to all instances and improve the styling of this error message throughout the application.
    console.error(result.error);
    return redirect(paths.notFound);
  }

  return (
    <OrderDetailPage
      order={result.data}
      isAdmin={session?.user.role === 'admin'}
    />
  );
}
