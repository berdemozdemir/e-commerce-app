import { OrderPage } from '@/components/place-order/OrderPage';
import { getOrderById } from '@/lib/actions/order/get-order-by-id';
import { paths } from '@/lib/constants/paths';
import { redirect } from 'next/navigation';

type OrderDetailPageProps = {
  params: Promise<{ orderId: string }>;
};

export async function generateMetadata() {
  return {
    title: 'Order Details',
  };
}

export default async function OrderDetailPage(props: OrderDetailPageProps) {
  const orderId = (await props.params).orderId;

  const result = await getOrderById({ orderId });

  if (!result) return redirect(paths.home);

  if (!result?.data) return redirect(paths.home);

  return <OrderPage order={result.data} />;
}
