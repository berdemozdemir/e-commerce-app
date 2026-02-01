import { useMutation } from '@tanstack/react-query';
import { deleteOrderById } from '../actions/admin/delete-order-by-id';
import { okOrThrow } from '../result';
import queryClient from '../queryClient';
import { markAsPaidOrder } from '../actions/admin/mark-as-paid-order';
import { markAsDeliveredOrder } from '../actions/admin/mark-as-delivered-order';
import { deleteProductById } from '../actions/admin/delete-product-by-id';

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

export const useMarkAsDeliveredOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      markAsDeliveredOrder(payload).then(okOrThrow),
  });

export const useDeleteProductByIdMutation = () =>
  useMutation({
    mutationFn: (payload: { productId: string }) =>
      deleteProductById(payload).then(okOrThrow),
  });
