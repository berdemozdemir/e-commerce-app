import { useMutation, useQuery } from '@tanstack/react-query';
import { TCreateRatingSchema, TUpdateRatingSchema } from '../types/rating';
import { createRating } from '../actions/rating/create-rating';
import { okOrThrow } from '../result';
import { getProductRatings } from '../actions/rating/get-product-ratings';
import { deleteRating } from '../actions/rating/delete-rating';
import { updateRating } from '../actions/rating/update-rating';

export const useCreateRatingMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateRatingSchema) =>
      createRating(payload).then(okOrThrow),
  });

export const useGetProductRatingsQuery = (productId: string) =>
  useQuery({
    queryKey: ['product-ratings', productId],
    queryFn: () => getProductRatings({ productId }).then(okOrThrow),
  });

export const useDeleteRatingMutation = () =>
  useMutation({
    mutationFn: (payload: { ratingId: string }) =>
      deleteRating(payload).then(okOrThrow),
  });

export const useUpdateRatingMutation = () =>
  useMutation({
    mutationFn: (payload: TUpdateRatingSchema) =>
      updateRating(payload).then(okOrThrow),
  });
