import { z } from 'zod';
import { updateRatingSchema } from '@/lib/schemas/rating/update-rating';
import { createRatingSchema } from '../schemas/rating/create-rating';

export type Rating = {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  title: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

export type TCreateRatingSchema = z.infer<typeof createRatingSchema>;

export type TUpdateRatingSchema = z.infer<typeof updateRatingSchema>;
