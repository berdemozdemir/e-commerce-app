import { createRatingSchema } from '@/lib/schemas/rating/create-rating';
import { z } from 'zod';

export type Rating = {
  id: string;
  productId: string;
  userName: string;
  title: string;
  rating: number;
  comment?: string;
  createdAt: string;
};

export type TCreateRatingSchema = z.infer<typeof createRatingSchema>;
