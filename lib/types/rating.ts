import { z } from 'zod';
import { createRatingSchema } from '../schemas/rating/create-rating';
import { updateRatingSchema } from '@/lib/schemas/rating/update-rating';

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
