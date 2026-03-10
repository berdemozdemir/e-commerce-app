import { redirect } from 'next/navigation';
import { CartDetailPage } from '@/components/cart/CartDetailPage';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';
import { paths } from '@/lib/constants/paths';

const CartPage = async () => {
  const [err, cart] = await getMyCart();

  if (err) redirect(paths.home);

  return <CartDetailPage cart={cart ?? undefined} />;
};

export default CartPage;
