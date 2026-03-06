import { useMutation, useQuery } from '@tanstack/react-query';
import { TCreateRatingSchema } from '../types/rating';
import { createRating } from '../actions/rating/create-rating';
import { okOrThrow } from '../result';
import { getProductRatings } from '../actions/rating/get-product-ratings';

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
