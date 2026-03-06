import { z } from 'zod';

export const createRatingSchema = z.object({
  productId: z.string().uuid(),
  title: z.string().min(3).max(100),
  comment: z.string().min(3).max(1000).optional(),
  rating: z.coerce.number().int().min(1).max(5),
});
