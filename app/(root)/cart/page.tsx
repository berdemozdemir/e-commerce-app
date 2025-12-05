import { CartDetailPage } from '@/components/cart/CartDetailPage';
import { getMyCart } from '@/lib/actions/cart/get-my-cart.action';

const CartPage = async () => {
  const cart = await getMyCart();

  return <CartDetailPage cart={cart.data} />;
};

export default CartPage;
