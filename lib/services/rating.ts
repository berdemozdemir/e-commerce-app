import { useMutation, useQuery } from '@tanstack/react-query';
import { CreateRatingSchema, UpdateRatingSchema } from '../types/rating';
import { createRating } from '../actions/rating/create-rating';
import { unwrapAsync } from '../result';
import { getProductRatings } from '../actions/rating/get-product-ratings';
import { deleteRating } from '../actions/rating/delete-rating';
import { updateRating } from '../actions/rating/update-rating';

export const useCreateRatingMutation = () =>
  useMutation({
    mutationFn: (payload: CreateRatingSchema) =>
      unwrapAsync(createRating(payload)),
  });

export const useGetProductRatingsQuery = (productId: string) =>
  useQuery({
    queryKey: ['product-ratings', productId],
    queryFn: () => unwrapAsync(getProductRatings({ productId })),
  });

export const useDeleteRatingMutation = () =>
  useMutation({
    mutationFn: (payload: { ratingId: string }) =>
      unwrapAsync(deleteRating(payload)),
  });

export const useUpdateRatingMutation = () =>
  useMutation({
    mutationFn: (payload: UpdateRatingSchema) =>
      unwrapAsync(updateRating(payload)),
  });
