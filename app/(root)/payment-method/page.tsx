import { PaymentMethodForm } from '@/components/PaymentMethodForm';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Payment Method',
    description: 'Select your preferred payment method for the order.',
  };
}

export const PaymentMethodPage = async () => {
  const cart = await getMyCart();
  if (isFailure(cart)) redirect(paths.cart);

  const session = await auth();
  if (!session?.user?.id) redirect(paths.auth.login);

  const user = await getUserById({ userId: session.user.id });
  if (isFailure(user)) redirect(paths.auth.login);

  return (
    <div>
      <PaymentMethodForm paymentMethod={user.data.paymentMethod} />
    </div>
  );
};

export default PaymentMethodPage;
