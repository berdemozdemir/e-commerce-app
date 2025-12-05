import { useMutation } from '@tanstack/react-query';
import { addItemToCart } from '../actions/cart/add-item-to-cart';
import { removeItemFromCart } from '../actions/cart/remove-item-from-cart';
import { okOrThrow } from '../result';
import { TCartItem } from '../schemas/cart/cart-item.schema';

export const useAddToCartMutation = () =>
  useMutation({
    mutationFn: (payload: TCartItem) => addItemToCart(payload).then(okOrThrow),
  });

export const useRemoveItemFromCartMutation = () =>
  useMutation({
    mutationFn: ({ productId }: { productId: string }) =>
      removeItemFromCart({ productId }).then(okOrThrow),
  });
