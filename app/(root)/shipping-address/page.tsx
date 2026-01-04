import { ShippingAddressForm } from '@/components/shipping-address/ShippingAddressForm';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { getUserById } from '@/lib/actions/user/get-user-by-id';
import { auth } from '@/lib/auth';
import { paths } from '@/lib/constants/paths';
import { isFailure } from '@/lib/result';
import { redirect } from 'next/navigation';

export async function generateMetadata() {
  return {
    title: 'Shipping Address',
    description: 'Enter your shipping address details.',
  };
}

async function ShippingAddressPage() {
  const cart = await getMyCart();
  if (isFailure(cart)) redirect(paths.cart);

  const session = await auth();
  // TODO: find the best way to handle this case and improve UX
  if (!session?.user?.id) redirect(paths.auth.login);

  const user = await getUserById({ userId: session.user.id });
  if (isFailure(user)) redirect(paths.auth.login);

  return (
    <div>
      <ShippingAddressForm {...user.data?.address} />
    </div>
  );
}

export default ShippingAddressPage;
