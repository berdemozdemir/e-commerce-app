import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../actions/order/create-order';
import { unwrapAsync } from '../result';

export const useCreateOrderMutation = () =>
  useMutation({ mutationFn: () => unwrapAsync(createOrder()) });
