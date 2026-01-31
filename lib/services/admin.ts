import { useMutation } from '@tanstack/react-query';
import { deleteOrderById } from '../actions/admin/delete-order-by-id';
import { okOrThrow } from '../result';
import queryClient from '../queryClient';
import { markAsPaidOrder } from '../actions/admin/mark-as-paid-order';

export const useDeleteOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      deleteOrderById(payload).then(okOrThrow),
  });

export const useMarkAsPaidOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      markAsPaidOrder(payload).then(okOrThrow),
  });
