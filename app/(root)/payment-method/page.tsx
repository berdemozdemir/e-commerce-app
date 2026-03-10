import { redirect } from 'next/navigation';
import { PaymentMethodForm } from '@/components/PaymentMethodForm';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';

export async function generateMetadata() {
  return {
    title: 'Payment Method',
    description: 'Select your preferred payment method for the order.',
  };
}

export const PaymentMethodPage = async () => {
  const [cartErr, cart] = await getMyCart();
  if (cartErr || !cart) redirect(paths.cart);

  const session = await auth();
  if (!session?.user?.id) redirect(paths.auth.login);

  const [userErr, userData] = await getUserById({ userId: session.user.id });
  if (userErr || !userData) redirect(paths.auth.login);

  return (
    <div>
      <PaymentMethodForm paymentMethod={userData.paymentMethod} />
    </div>
  );
};

export default PaymentMethodPage;
