import { createRatingSchema } from '@/lib/schemas/rating/create-rating';
import { z } from 'zod';

export type TCreateRatingSchema = z.infer<typeof createRatingSchema>;
