import { useMutation } from '@tanstack/react-query';
import { TCreateRatingSchema } from '../types/create-rating-schema';
import { createRating } from '../actions/rating/create-rating';
import { okOrThrow } from '../result';

export const useCreateRatingMutation = () =>
  useMutation({
    mutationFn: (payload: TCreateRatingSchema) =>
      createRating(payload).then(okOrThrow),
  });
