import { CartItem } from '@/lib/types/cart';
import { roundTwo } from './number';

export const calculatePrice = (items: CartItem[]) => {
  const itemsPrice = roundTwo(
    items.reduce((acc, item) => acc + Number(item.price) * item.quantity, 0),
  );

  const taxPrice = roundTwo(itemsPrice * 0.15);
  const shippingPrice = roundTwo(itemsPrice > 100 ? 0 : 10);
  const totalPrice = roundTwo(itemsPrice + shippingPrice + taxPrice);

  return {
    taxPrice: taxPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    itemsPrice: itemsPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
