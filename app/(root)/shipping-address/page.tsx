import { ShippingAddressForm } from '@/components/shipping-address/ShippingAddressForm';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
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

  return (
    <div>
      <ShippingAddressForm />
    </div>
  );
}

export default ShippingAddressPage;
