import { PlaceOrderPage } from '@/components/place-order/PlaceOrderPage';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Place Order',
    description: 'Review your order and confirm your purchase.',
  };
}

export const PlaceOrder = async () => {
  const cart = await getMyCart();
  if (isFailure(cart)) redirect(paths.cart);

  const session = await auth();
  if (!session?.user?.id) redirect(paths.auth.login);

  const user = await getUserById({ userId: session.user.id });
  if (isFailure(user)) redirect(paths.auth.login);

  if (!user.data?.address) redirect(paths.shippingAddress);

  if (!user.data?.paymentMethod) redirect(paths.paymentMethod);

  return (
    <div>
      <PlaceOrderPage
        address={user.data.address}
        paymentMethod={user.data.paymentMethod}
        // TODO: Handle possible undefined case
        cart={cart.data!}
      />
    </div>
  );
};

export default PlaceOrder;
