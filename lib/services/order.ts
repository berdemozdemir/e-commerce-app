import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../actions/order/create-order';
import { okOrThrow } from '../result';

export const useCreateOrderMutation = () =>
  useMutation({ mutationFn: () => createOrder().then(okOrThrow) });
