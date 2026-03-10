import { useMutation } from '@tanstack/react-query';
import { deleteOrderById } from '../actions/admin/delete-order-by-id';
import { unwrapAsync } from '../result';
import { markAsPaidOrder } from '../actions/admin/mark-as-paid-order';
import { markAsDeliveredOrder } from '../actions/admin/mark-as-delivered-order';
import { deleteProductById } from '../actions/admin/delete-product-by-id';
import { createProduct } from '../actions/admin/create-product';
import { TCreateProductSchema } from '../schemas/product/create-product.schema';
import { updateProductBySlug } from '../actions/admin/update-product-by-slug';
import { TUpdateProductSchema } from '../schemas/product/update-product.schema';
import { deleteUserById } from '../actions/admin/delete-user-by-id';
import { EditUserSchema } from '../schemas/edit-user';
import { editUserById } from '../actions/admin/edit-user';

export const useDeleteOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      unwrapAsync(deleteOrderById(payload)),
  });

export const useMarkAsPaidOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      unwrapAsync(markAsPaidOrder(payload)),
  });

export const useMarkAsDeliveredOrderMutation = () =>
  useMutation({
    mutationFn: (payload: { orderId: string }) =>
      unwrapAsync(markAsDeliveredOrder(payload)),
  });

export const useDeleteProductByIdMutation = () =>
  useMutation({
    mutationFn: (payload: { productId: string }) =>
      unwrapAsync(deleteProductById(payload)),
  });

export const useCreateProductMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateProductSchema) =>
      unwrapAsync(createProduct(payload)),
  });

export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: (payload: { slug: string; data: TUpdateProductSchema }) =>
      unwrapAsync(updateProductBySlug({
        slug: payload.slug,
        data: payload.data,
      })),
  });

export const useDeleteUserByIdMutation = () =>
  useMutation({
    mutationFn: (payload: { userId: string }) =>
      unwrapAsync(deleteUserById(payload)),
  });

export const useEditUserMutation = () =>
  useMutation({
    mutationFn: (payload: { userId: string; data: EditUserSchema }) =>
      unwrapAsync(editUserById(payload)),
  });
