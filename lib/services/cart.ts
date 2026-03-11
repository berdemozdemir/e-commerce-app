import { useMutation } from '@tanstack/react-query';
import { addItemToCart } from '../actions/cart/add-item-to-cart';
import { removeItemFromCart } from '../actions/cart/remove-item-from-cart';
import { unwrapAsync } from '../result';
import { CartItem } from '../types/cart';

export const useAddToCartMutation = () =>
  useMutation({
    mutationFn: (payload: CartItem) => unwrapAsync(addItemToCart(payload)),
  });

export const useRemoveItemFromCartMutation = () =>
  useMutation({
    mutationFn: ({ productId }: { productId: string }) =>
      unwrapAsync(removeItemFromCart({ productId })),
  });
