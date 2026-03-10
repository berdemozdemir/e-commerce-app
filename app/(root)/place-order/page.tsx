import { redirect } from 'next/navigation';
import { PlaceOrderPage } from '@/components/place-order/PlaceOrderPage';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';

export async function generateMetadata() {
  return {
    title: 'Place Order',
    description: 'Review your order and confirm your purchase.',
  };
}

export const PlaceOrder = async () => {
  const [cartErr, cart] = await getMyCart();
  if (cartErr || !cart) redirect(paths.cart);

  const session = await auth();
  if (!session?.user?.id) redirect(paths.auth.login);

  const [userErr, userData] = await getUserById({ userId: session.user.id });
  if (userErr || !userData) redirect(paths.auth.login);

  if (!userData.address) redirect(paths.shippingAddress);

  if (!userData.paymentMethod) redirect(paths.paymentMethod);

  return (
    <div>
      <PlaceOrderPage
        address={userData.address}
        paymentMethod={userData.paymentMethod}
        cart={cart}
      />
    </div>
  );
};

export default PlaceOrder;
