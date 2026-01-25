import { useMutation } from '@tanstack/react-query';
import { deleteOrderById } from '../actions/admin/delete-order-by-id';
import { okOrThrow } from '../result';
import queryClient from '../queryClient';

export const useDeleteOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      deleteOrderById(payload).then(okOrThrow),
  });
