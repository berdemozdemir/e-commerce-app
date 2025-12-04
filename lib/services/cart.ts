import { useMutation } from '@tanstack/react-query';
import { addItemToCart } from '../actions/cart/add-item-to-cart';
import { removeItemFromCart } from '../actions/cart/remove-item-from-cart';

export const useAddToCartMutation = () =>
  useMutation({ mutationFn: addItemToCart });

export const useRemoveItemFromCartMutation = () =>
  useMutation({ mutationFn: removeItemFromCart });
